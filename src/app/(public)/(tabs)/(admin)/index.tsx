import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { ButtonStack, ContainerApp } from "../../../../components/ui";
import { useThemeColor } from "../../../../hooks/useThemeColor";

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

  const handleNavigateToCambioEstado = () => {
    router.push("/actEstadoCocina");
  };

  const handleNavigateToActStockPlatos = () => {
    router.push("/actStockPlato");
  };

  const handleNavigateToEstadoPedidos = () => {
    router.push("/actEstadoPedido");
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
        name="Actualizar Estado Cocina"
        onPress={handleNavigateToCambioEstado}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Actualizar Stock Plato"
        onPress={handleNavigateToActStockPlatos}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Actualizar Estado Pedidos"
        onPress={handleNavigateToEstadoPedidos}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
