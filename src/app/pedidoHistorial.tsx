import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import CardPedidoHistorico from "../components/CardPedidoHistorico";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { useThemeColor } from "../hooks/useThemeColor";
import { getData } from "../services/local/storage";
import { IPedido } from "../types";

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export default function PedidoDetalleScreen({ lightColor, darkColor }: Props) {
  const [pedidosHist, setPedidosHist] = useState<IPedido[] | null>(null);

  const backgroundColorTitle = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundTitle"
  );

  useEffect(() => {
    async function getPedido() {
      const ped = await getData("pedidoHistorial");
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
          backgroundColor: backgroundColorTitle,
        }}
      >
        Pedidos Historicos
      </ThemedText>

      {pedidosHist?.length ? (
        <FlatList
          data={pedidosHist}
          keyExtractor={(item, index) => `plato-${item.id}-${index}`}
          renderItem={({ item }) => <CardPedidoHistorico item={item} />}
        />
      ) : (
        <ThemedView style={styles.containerVacio}>
          <ThemedText type="title" align="center">
            No se encuentran pedidos historicos
          </ThemedText>
        </ThemedView>
      )}

      {/* <FlatList
        data={pedidosHist}
        keyExtractor={(item, index) => `plato-${item.id}-${index}`}
        renderItem={({ item }) => <CardPedidoHistorico item={item} />}
      /> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerVacio: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "90%",
    padding: 20,
  },
  linea: {
    flexDirection: "row",
  },
});
