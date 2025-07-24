import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CardPedidoHistorico from "../../../components/CardPedidoHistorico";
import { ContainerApp, ThemedText } from "../../../components/ui";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { getData } from "../../../services/local/storage";
import { IPedido } from "../../../types";

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
    <ContainerApp>
      <ThemedText
        type="subtitle"
        align="center"
        style={{
          backgroundColor: backgroundColorTitle,
        }}
      >
        Pedidos Historicos
      </ThemedText>

      <FlatList
        data={pedidosHist}
        keyExtractor={(item, index) => `plato-${item.id}-${index}`}
        renderItem={({ item }) => <CardPedidoHistorico item={item} />}
      />
    </ContainerApp>
  );
}
