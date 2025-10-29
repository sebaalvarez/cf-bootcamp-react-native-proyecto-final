import { ButtonStack, ContainerApp } from "@/src/components/ui";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

interface Props {
  lightColor?: string;
  darkColor?: string;
}
export default function AdminActScreen({ lightColor, darkColor }: Props) {
  const router = useRouter();
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const handleNavigateToConfig = () => {
    router.push("./(config)");
  };

  const handleNavigateToActStockPlatos = () => {
    router.push("./actStockPlato");
  };

  const handleNavigateToActPrecioPlatos = () => {
    router.push("./actInfoPlato");
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
        name="Configuración Global"
        icon="configGlobal"
        onPress={handleNavigateToConfig}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Actualizar Stock Plato"
        icon="actStockPlatos"
        onPress={handleNavigateToActStockPlatos}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Actualizar Información Plato"
        icon="actInfoPlatos"
        onPress={handleNavigateToActPrecioPlatos}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
