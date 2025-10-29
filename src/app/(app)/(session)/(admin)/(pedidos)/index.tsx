import { ButtonStack, ContainerApp } from "@/src/components/ui";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

interface Props {
  lightColor?: string;
  darkColor?: string;
}
export default function PerfilScreen({ lightColor, darkColor }: Props) {
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

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: background,
      height: 80,
      borderBottomWidth: 0.5,
      borderWidth: 0,
    },
  });

  return (
    <ContainerApp scroll>
      <ButtonStack
        name="Listado de Pedidos Solicitados"
        icon="pedidosSolicitados"
        onPress={handleNavigateToPedSolicitados}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Listado de Pedidos Recibidos"
        icon="pedidosRecibidos"
        onPress={handleNavigateToPedRecibidos}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
