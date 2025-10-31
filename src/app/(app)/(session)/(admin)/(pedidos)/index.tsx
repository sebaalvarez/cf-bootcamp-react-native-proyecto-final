import { ButtonStack, ContainerApp } from "@/src/components/ui";
import { supabase } from "@/src/config/supabase";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { selectAllPedidosPorEstado } from "@/src/services/api/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

interface Props {
  lightColor?: string;
  darkColor?: string;
}
export default function PedidoAdminScreen({ lightColor, darkColor }: Props) {
  const router = useRouter();
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const handleNavigateToPedSolicitados = () => {
    router.push("./PedidosSolicitados");
  };

  const handleNavigateToPedRecibidos = () => {
    router.push("./PedidosRecibidos");
  };

  const handleNavigateToPedEntregados = () => {
    router.push("./PedidosEntregados");
  };

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: background,
      height: 80,
      borderBottomWidth: 0.5,
      borderWidth: 0,
    },
  });

  const [cantPedSolicitados, setCantPedSolicitados] = useState(0);
  const [cantPedRecibidos, setCantPedRecibidos] = useState(0);
  const [cantPedEntregados, setCantPedEntregados] = useState(0);

  useEffect(() => {
    // Función para actualizar los contadores
    const fetchPedidos = async () => {
      const pedidosSolicitados = await selectAllPedidosPorEstado("Solicitado");
      setCantPedSolicitados(pedidosSolicitados ? pedidosSolicitados.length : 0);

      const pedidosRecibidos = await selectAllPedidosPorEstado("Recibido");
      setCantPedRecibidos(pedidosRecibidos ? pedidosRecibidos.length : 0);

      const pedidosEntregados = await selectAllPedidosPorEstado("Entregado");
      setCantPedEntregados(pedidosEntregados ? pedidosEntregados.length : 0);
    };

    fetchPedidos();

    // Suscripción en tiempo real
    const subscription = supabase
      .channel("pedidos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pedidos" },
        () => {
          fetchPedidos();
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <ContainerApp scroll>
      <ButtonStack
        name="Pedidos Solicitados"
        icon="pedidosSolicitados"
        badge={cantPedSolicitados}
        onPress={handleNavigateToPedSolicitados}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Pedidos Recibidos"
        icon="pedidosRecibidos"
        badge={cantPedRecibidos}
        onPress={handleNavigateToPedRecibidos}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Pedidos Entregados"
        icon="pedidosEntregados"
        badge={cantPedEntregados}
        onPress={handleNavigateToPedEntregados}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
