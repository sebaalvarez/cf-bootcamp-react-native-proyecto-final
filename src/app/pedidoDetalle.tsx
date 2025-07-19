import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getData } from "../services/local/storage";
import { IPedido } from "../types";

export default function PedidoDetalleScreen() {
  const [pedido, setPedido] = useState<IPedido | null>(null);

  useEffect(() => {
    async function getPedido() {
      const ped = await getData("pedido");
      setPedido(ped);
    }
    getPedido();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Pedido</Text>
      <Text>{pedido?.fecha} </Text>
      <Text>{pedido?.datosEnvio.apellido} </Text>
      <Text>{pedido?.datosEnvio.nombre} </Text>
      <Text>{pedido?.datosEnvio.telefono} </Text>
      <Text>{pedido?.datosEnvio.domicilio} </Text>
      <Text>{pedido?.detalle.length} </Text>
      <Text>{pedido?.detalle[0].id} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
