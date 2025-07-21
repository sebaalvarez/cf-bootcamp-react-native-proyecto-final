import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useColorScheme } from "react-native";
import CardPedidoHistorico from "../components/CardPedidoHistorico";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { getData } from "../services/local/storage";
import { IPedidosHistoricos } from "../types";

export default function PedidoDetalleScreen() {
  const [pedidosHist, setPedidosHist] = useState<IPedidosHistoricos[] | null>(
    null
  );

  const theme = useColorScheme() ?? "light";
  const colorBack = theme === "dark" ? "#47607dff" : "#caeea5ff";

  useEffect(() => {
    async function getPedido() {
      const ped: IPedidosHistoricos[] | null = await getData("pedidoHistorial");
      const perInv = ped ? ped.reverse() : null;
      setPedidosHist(perInv);
    }
    getPedido();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        type="subtitle"
        align="center"
        style={{
          backgroundColor: colorBack,
        }}
      >
        Pedidos Historicos
      </ThemedText>

      <FlatList
        data={pedidosHist}
        keyExtractor={(item, index) => `plato-${item.id}-${index}`}
        renderItem={({ item }) => <CardPedidoHistorico item={item} />}
      />
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
