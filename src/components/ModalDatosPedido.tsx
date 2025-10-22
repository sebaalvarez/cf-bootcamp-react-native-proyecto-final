import { useCarrito } from "@/src/hooks/useCarrito";
import { getConfig } from "@/src/services/api/supabase/configuracion";
import { createPedido } from "@/src/services/api/supabase/pedidos";
import { createPedidoDetalle } from "@/src/services/api/supabase/pedidosDetalle";
import {
  selectOnePlato,
  updateStockPlato,
} from "@/src/services/api/supabase/platos";
import { getData, storeData } from "@/src/services/local/storage";
import { IDatosEnvio, IPedido, IPedidoSupabase } from "@/src/types";
import { calculaTotalPedido } from "@/src/utils/calculaTotalPedido";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import ProfileForm from "./forms/views/ProfileForm";
import { ThemedText, ThemedView } from "./ui";

interface Props {
  onPress?: () => void;
}

export default function ModalDatosPedido({ onPress }: Props) {
  const { state, dispatch } = useCarrito();
  const [isProcessing, setIsProcessing] = useState(false);
  const [abierto, setAbierto] = useState(true);

  const getEstado = async () => {
    const estado = await getConfig("cocina_abierta");
    setAbierto(!!estado);
  };

  getEstado();

  if (!abierto) {
    Alert.alert("Lo sentimos", "Los pedidos están cerrados en este momento.");
  }

  const handlePedido = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const datosCliente: IDatosEnvio = await getData("usuario");
      const detalle = state.carrito;
      const montoPedido = calculaTotalPedido(state.carrito);

      if (!datosCliente || !Array.isArray(detalle)) {
        Alert.alert("Error", "Datos inválidos para crear el pedido");
        setIsProcessing(false);
        onPress?.();
        return;
      }

      let msjErrores = "";
      let checkObs = 0;

      // Verificar si existe el plato seleccionado en la DB y el stock disponible de acuerdo a los solicitado
      // Hace modificaciones del carrito de acuerdo al stock disponible en la DB
      for (const plato of detalle) {
        const platoData = await selectOnePlato(Number(plato.id));

        if (!platoData) {
          msjErrores =
            msjErrores + `El plato ${plato.nombre} fue quitado del sistema\n`;
          checkObs = 1;
        } else {
          if (platoData.stock < (plato.cantidad ?? 0)) {
            msjErrores =
              msjErrores +
              `${plato.nombre} \nPedido: ${plato.cantidad} ||| Disponible: ${platoData.stock}\n\n`;
            checkObs = 1;
            // si ya no hay stock quita el plato del carrito
            if (platoData.stock === 0) {
              dispatch({
                type: "QUITAR_PLATO",
                payload: { id: plato.id },
              });
            } else {
              // si hay menor cantidad en el stock ajusta la cantidad del carrito a lo que hay
              dispatch({
                type: "MODIFICAR_CANTIDAD",
                payload: {
                  id: plato.id,
                  cantidad: platoData.stock,
                },
              });
            }
          }
        }
      }

      // si en la verificación anterior hay inconvenientes para la ejecución y avisa al cliente
      if (checkObs > 0) {
        msjErrores =
          msjErrores +
          `\nSe actualizó el pedido con las cantidades disponibles. \n\nVolver a confirmarlo por favor.`;
        Alert.alert("Ups!", msjErrores);
        setIsProcessing(false);
        onPress?.();
        return;
      }

      const jsonPedidoLocal: IPedido = {
        fecha: new Date().toLocaleString(),
        estado: "Solicitado",
        montoTotal: montoPedido,
        datosEnvio: datosCliente,
        detalle,
      };

      const jsonPedidoSupa: IPedidoSupabase = {
        fecha: new Date().toLocaleString(),
        estado: "Solicitado",
        montoTotal: montoPedido,
        nombre: datosCliente.nombre,
        apellido: datosCliente.apellido,
        telefono: datosCliente.telefono,
        domicilio: datosCliente.domicilio,
        cantidadPlatos: detalle.length,
      };

      // Inicia actualizaciones en la DB
      // Registrar el pedido en Supabase
      const pedidoCargado: IPedidoSupabase = await createPedido(jsonPedidoSupa);

      if (pedidoCargado.id) {
        for (const platoCarrito of detalle) {
          // Registra el detalle del pedido en Supabase
          await createPedidoDetalle(
            pedidoCargado.id,
            Number(platoCarrito.id),
            platoCarrito.cantidad ?? 0,
            platoCarrito.precio
          );
          // Actualizar el stock de los platos en Supabase
          const platoData = await selectOnePlato(Number(platoCarrito.id));
          const nuevoStock =
            (platoData?.stock ?? 0) - (platoCarrito.cantidad ?? 0);
          await updateStockPlato(Number(platoCarrito.id), nuevoStock);
        }
      }
      // Fin actualizaciones con la DB

      // Inicio actualizaciones en Storage local
      // Guardar el historial actualizado en AsyncStorage
      await storeData(
        "pedido",
        JSON.stringify({ id: pedidoCargado.id, ...jsonPedidoLocal })
      );

      // Leer el historial de pedidos existente
      const historialPedidos = await getData("pedidoHistorial");

      const pedidosActualizados = Array.isArray(historialPedidos)
        ? [...historialPedidos, { id: pedidoCargado.id, ...jsonPedidoLocal }]
        : [{ id: pedidoCargado.id, ...jsonPedidoLocal }];

      // Guardar el historial actualizado en AsyncStorage
      await storeData("pedidoHistorial", JSON.stringify(pedidosActualizados));
      // Fin actualizaciones en Storage local

      dispatch({
        type: "VACIAR_CARRITO",
      });

      Alert.alert(
        "Tu pedido fue enviado",
        "Pronto disfrutaras de nuestra comida."
      );

      onPress?.();
    } catch (error) {
      console.error("Error al procesar el pedido:", error);

      Alert.alert(
        "Error",
        "Ocurrió un problema al procesar tu pedido. Inténtalo nuevamente."
      );
      onPress?.();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ThemedView style={styles.containerModal}>
      {isProcessing ? (
        <ThemedView style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <ThemedText>Enviando pedido...</ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.containerDet}>
          <ThemedText type="subtitle">Datos para el envío</ThemedText>
          <ProfileForm
            onPress={handlePedido}
            disabledBtn={!abierto}
            nameButton="Enviar"
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    height: "auto",
    borderRadius: 20,
  },
  containerDet: {
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
