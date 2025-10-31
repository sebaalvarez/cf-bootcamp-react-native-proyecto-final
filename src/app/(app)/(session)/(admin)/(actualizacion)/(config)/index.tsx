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

  const handleNavigateToCambioEstado = () => {
    router.push("./actEstadoCocina");
  };

  const handleNavigateToActTelefono = () => {
    router.push("./actTelefono");
  };

  const handleNavigateToActHorario = () => {
    router.push("./actHorario");
  };

  const handleNavigateToActStockInicial = () => {
    router.push("./actStockInicialMasivo");
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
        name="Estado Cocina"
        icon="actEstadoCocina"
        onPress={handleNavigateToCambioEstado}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Teléfono WhatsApp"
        icon="actTelefono"
        onPress={handleNavigateToActTelefono}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Horario de Atención"
        icon="actHorarioAtencion"
        onPress={handleNavigateToActHorario}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Cargar Stock Inicial"
        icon="actStockPlatos"
        onPress={handleNavigateToActStockInicial}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
