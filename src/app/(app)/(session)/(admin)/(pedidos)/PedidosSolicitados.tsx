import CardPedidoIngresado from "@/src/components/CardPedidoIngresado";
import {
  ContainerApp,
  EsperaCarga,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import { EstadosPedido } from "@/src/constants/EstadosPedido";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { selectAllPedidosSolicitados } from "@/src/services/api/supabase/pedidos";
import { IPedidoSupabase } from "@/src/types";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export default function PedidosSolicitados({ lightColor, darkColor }: Props) {
  const [pedidos, setPedidos] = useState<IPedidoSupabase[] | null>(null);
  const [actEstado, setActEstado] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const backgroundColorTitle = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundTitle"
  );

  async function getPedido() {
    setLoading(true);
    const ped = await selectAllPedidosSolicitados();
    setPedidos(ped);
    setLoading(false);
  }
  useEffect(() => {
    getPedido();
  }, [actEstado]);

  if (isLoading) {
    return (
      <ThemedView style={{ marginTop: 40, gap: 30 }}>
        <EsperaCarga />
        <ThemedText type="defaultSemiBold" align="center">
          Cargando Listado...
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
        Pedidos Solicitados
      </ThemedText>

      <FlatList
        data={pedidos}
        keyExtractor={(item, index) => `plato-${item.id}-${index}`}
        renderItem={({ item }) => (
          <CardPedidoIngresado
            item={item}
            actEstado={actEstado}
            refresca={setActEstado}
            nuevoEstado={EstadosPedido.RECIBIDO}
          />
        )}
      />
    </ContainerApp>
  );
}
