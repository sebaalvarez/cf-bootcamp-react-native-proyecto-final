import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useCarrito } from "../hooks/useCarrito";
import { getData, storeData } from "../services/local/storage";
import { IPedido } from "../types";
import ProfileForm from "./forms/views/ProfileForm";
import { ThemedText, ThemedView } from "./ui";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebaseConfig";
import { useConfiguracion } from "../hooks/useEstadoAtencion";
import { calculaTotalPedido } from "../utils/calculaTotalPedido";

interface Props {
  onPress?: () => void;
}

export default function ModalDatosPedido({ onPress }: Props) {
  const { state, dispatch } = useCarrito();
  const [isProcessing, setIsProcessing] = useState(false);

  const configuracion = useConfiguracion();

  if (!configuracion) {
    return (
      <ThemedView>
        <ThemedText>Cargando configuración...</ThemedText>
      </ThemedView>
    );
  }

  const { pedidos_habilitados } = configuracion;

  if (!pedidos_habilitados) {
    Alert.alert("Lo sentimos", "Los pedidos están cerrados en este momento.");
  }

  const handlePedido = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const datosEnvio = await getData("usuario");
      const detalle = state.carrito;
      const montoPedido = calculaTotalPedido(state.carrito);

      if (!datosEnvio || !Array.isArray(detalle)) {
        Alert.alert("Error", "Datos inválidos para crear el pedido");
        setIsProcessing(false);
        onPress?.();
        return;
      }

      let msjErrores = "";
      let checkObs = 0;

      // Verificar si existe el plato seleccionado en la DB y el stock disponible
      for (const plato of detalle) {
        const platoRef = doc(db, "platos", plato.id);
        const platoSnapshot = await getDoc(platoRef);

        if (!platoSnapshot.exists()) {
          msjErrores =
            msjErrores + `El plato ${plato.nombre} fue quitado del sistema\n`;
          checkObs = 1;
        } else {
          const platoData = platoSnapshot.data();
          if (platoData.stock < plato.cantidad) {
            msjErrores =
              msjErrores +
              `${plato.nombre} \nPedido: ${plato.cantidad} ||| Disponible: ${platoData.stock}\n\n`;
            checkObs = 1;

            if (platoData.stock === 0) {
              dispatch({
                type: "QUITAR_PLATO",
                payload: { id: plato.id },
              });
            } else {
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

      if (checkObs > 0) {
        msjErrores =
          msjErrores +
          `\nSe actualizó el pedido con las cantidades disponibles. \n\nVolver a confirmarlo por favor.`;
        Alert.alert("Ups!", msjErrores);
        setIsProcessing(false);
        onPress?.();
        return;
      }

      const jsonPedido: IPedido = {
        fecha: new Date().toLocaleString(),
        estado: "Solicitado",
        montoTotal: montoPedido,
        datosEnvio,
        detalle,
      };

      // Registrar el pedido en la colección "pedidos"
      const pedidoRef = await addDoc(collection(db, "pedidos"), jsonPedido);
      const pedidoId = pedidoRef.id; // Obtén el ID del pedido

      // Guardar el historial actualizado en AsyncStorage
      await storeData(
        "pedido",
        JSON.stringify({ id: pedidoId, ...jsonPedido })
      );

      // Leer el historial de pedidos existente
      const historialPedidos = await getData("pedidoHistorial");

      const pedidosActualizados = Array.isArray(historialPedidos)
        ? [...historialPedidos, { id: pedidoId, ...jsonPedido }]
        : [{ id: pedidoId, ...jsonPedido }];

      // Guardar el historial actualizado en AsyncStorage
      await storeData("pedidoHistorial", JSON.stringify(pedidosActualizados));

      const batch = writeBatch(db);
      for (const plato of detalle) {
        const platoRef = doc(db, "platos", plato.id);
        const platoSnapshot = await getDoc(platoRef);

        if (platoSnapshot.exists()) {
          const platoData = platoSnapshot.data();
          const nuevoStock = platoData.stock - plato.cantidad;

          batch.update(platoRef, { stock: nuevoStock });
        }
      }

      await batch.commit();

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
            disabledBtn={!pedidos_habilitados}
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
