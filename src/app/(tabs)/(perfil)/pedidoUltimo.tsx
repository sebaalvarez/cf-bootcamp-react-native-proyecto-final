import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import CartCardDetalle from "../../../components/CartCardDetalle";
import {
  ButtonCustom,
  ContainerApp,
  ThemedText,
  ThemedView,
} from "../../../components/ui";
import { useConfiguracion } from "../../../hooks/useEstadoAtencion";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { getEstadoPedido } from "../../../services/api/getEstadoPedidoService";
import { getData } from "../../../services/local/storage";
import { IPedido } from "../../../types";
import { generarMensajeWhatsApp } from "../../../utils/armarMensajeWhatsApp";
import { calculaTotalPedido } from "../../../utils/calculaTotalPedido";
import compartirPorWhatsApp from "../../../utils/mandarMensajeWhatsApp";

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export default function PedidoDetalleScreen({ lightColor, darkColor }: Props) {
  const [pedido, setPedido] = useState<IPedido | null>(null);
  const [estadoAct, setEstadoAct] = useState("");
  const configuracion = useConfiguracion();
  const backgroundColorTitle = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundTitle"
  );

  async function getPedido() {
    const ped = await getData("pedido");
    const estAct = ped?.id ? await getEstadoPedido(ped.id) : "";
    setPedido(ped);
    setEstadoAct(estAct);
  }

  useEffect(() => {
    getPedido();
  }, []);

  if (!configuracion) {
    return (
      <ThemedView>
        <ThemedText>Cargando configuración...</ThemedText>
      </ThemedView>
    );
  }

  const { pedidos_habilitados } = configuracion;

  const mensaje = pedido
    ? generarMensajeWhatsApp(pedido)
    : "pedido no disponible";

  const handlePress = () => {
    if (!pedido) {
      Alert.alert("No se encontró el pedido");
      return;
    }
    compartirPorWhatsApp(mensaje);
  };

  const sumarTotal = pedido?.montoTotal
    ? pedido.montoTotal.toLocaleString("es-AR")
    : calculaTotalPedido(pedido?.detalle).toLocaleString("es-AR");

  return (
    <ContainerApp>
      <ThemedView style={styles.container}>
        <ThemedText
          type="subtitle"
          align="center"
          style={{
            backgroundColor: backgroundColorTitle,
          }}
        >
          Datos del Pedido
        </ThemedText>

        <>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Fecha: </ThemedText>
            <ThemedText>{pedido?.fecha}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Estado: </ThemedText>
            <ThemedText>{estadoAct}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Nombre: </ThemedText>
            <ThemedText>
              {pedido?.datosEnvio.apellido}, {pedido?.datosEnvio.nombre}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Teléfono: </ThemedText>
            <ThemedText>{pedido?.datosEnvio.telefono} </ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Dir. entrega: </ThemedText>
            <ThemedText>{pedido?.datosEnvio.domicilio}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Total: $</ThemedText>
            <ThemedText>{sumarTotal}</ThemedText>
          </ThemedView>

          <ThemedText
            type="subtitle"
            align="center"
            style={{ backgroundColor: backgroundColorTitle }}
          >
            Detalle
          </ThemedText>
          <FlatList
            data={pedido?.detalle}
            keyExtractor={(item, index) => `plato-${item.id}-${index}`}
            renderItem={({ item }) => <CartCardDetalle item={item} />}
          />
          <ButtonCustom
            name={"Mandar por WhatsApp"}
            onPress={handlePress}
            props={{
              disabled: !pedidos_habilitados || !pedido,
              style: { marginTop: 10 },
            }}
          />
        </>
      </ThemedView>
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  container: { height: "94%" },
  linea: {
    flexDirection: "row",
  },
  lineaGral: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
