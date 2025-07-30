import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CardPedidoIngresado from "../../../components/CardPedidoIngresado";
import {
  ContainerApp,
  EsperaCarga,
  ThemedText,
  ThemedView,
} from "../../../components/ui";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { selectAllPedidoSolicitado } from "../../../services/api/supabase/pedidos";
import { IPedidoSupabase } from "../../../types";

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export default function ActEstadoPedido({ lightColor, darkColor }: Props) {
  const [pedidos, setPedidos] = useState<IPedidoSupabase[] | null>(null);
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const backgroundColorTitle = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundTitle"
  );

  async function getPedido() {
    setLoading(true);
    const ped = await selectAllPedidoSolicitado();
    setPedidos(ped);
    setLoading(false);
  }
  useEffect(() => {
    getPedido();
  }, [refresh]);

  if (isLoading) {
    return (
      <ThemedView style={{ marginTop: 40, gap: 30 }}>
        <EsperaCarga />
        <ThemedText type="defaultSemiBold" align="center">
          Cargando Historial...
        </ThemedText>
      </ThemedView>
    );
  }
  return (
    <ContainerApp>
      <ThemedText
        type="subtitle"
        align="center"
        style={{
          backgroundColor: backgroundColorTitle,
        }}
      >
        Pedidos Ingresados
      </ThemedText>

      <FlatList
        data={pedidos}
        keyExtractor={(item, index) => `plato-${item.id}-${index}`}
        renderItem={({ item }) => (
          <CardPedidoIngresado
            item={item}
            estado={refresh}
            refresca={setRefresh}
          />
        )}
      />
    </ContainerApp>
  );
}
