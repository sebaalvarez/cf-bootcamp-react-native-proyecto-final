import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, useColorScheme } from "react-native";
import ButtonCustom from "../components/ButtonCustom";
import CartCardDetalle from "../components/CartCardDetalle";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { getData } from "../services/local/storage";
import { IPedido } from "../types";
import { generarMensajeWhatsApp } from "../utils/armarMensajeWhatsApp";
import calculaTotalPedido from "../utils/calculaTotalPedido";
import { compartirPorWhatsApp } from "../utils/mandarMensajeWhatsApp";

export default function PedidoDetalleScreen() {
  const [pedido, setPedido] = useState<IPedido | null>(null);

  const theme = useColorScheme() ?? "light";
  const colorBack = theme === "dark" ? "#47607dff" : "#caeea5ff";

  useEffect(() => {
    async function getPedido() {
      const ped = await getData("pedido");
      setPedido(ped);
    }
    getPedido();
  }, []);

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
    <ThemedView style={styles.container}>
      <ThemedText
        type="subtitle"
        align="center"
        style={{
          backgroundColor: colorBack,
        }}
      >
        Datos del Pedido
      </ThemedText>
      <ThemedView style={styles.linea}>
        <ThemedText type="defaultSemiBold">Fecha: </ThemedText>
        <ThemedText>{pedido?.fecha}</ThemedText>
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
        <ThemedText>{sumarTotal} </ThemedText>
      </ThemedView>

      <ThemedText
        type="subtitle"
        align="center"
        style={{ backgroundColor: colorBack }}
      >
        Detalle
      </ThemedText>
      <FlatList
        data={pedido?.detalle}
        keyExtractor={(item, index) => `plato-${item.id}-${index}`}
        renderItem={({ item }) => <CartCardDetalle item={item} />}
      />
      <ButtonCustom name={"Mandar por WhatsApp"} onPress={handlePress} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    padding: 20,
  },
  linea: {
    flexDirection: "row",
  },
});
