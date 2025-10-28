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
        name="Actualizar Teléfono WhatsApp"
        onPress={handleNavigateToActTelefono}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Actualizar Horario de Atención"
        onPress={handleNavigateToActHorario}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
