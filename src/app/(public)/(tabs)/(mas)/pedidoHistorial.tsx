import CardPedidoHistorico from "@/src/components/CardPedidoHistorico";
import { ContainerApp, ThemedText } from "@/src/components/ui";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { getData } from "@/src/services/local/storage";
import { IPedido } from "@/src/types";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

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
