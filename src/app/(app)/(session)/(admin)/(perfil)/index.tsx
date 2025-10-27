import { ButtonStack, ContainerApp } from "@/src/components/ui";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { signOut } from "@/src/services/api/supabase";
import { useRouter } from "expo-router";
import { Alert, StyleSheet } from "react-native";

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

  const handleCerrarSesion = async () => {
    Alert.alert(
      "⚠️ Confirmar acción ⚠️",
      "¿Estás seguro que querés desloguearte?",
      [
        {
          text: "Cancelar",
          // onPress: () => console.log("Acción cancelada"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              console.error("Error al cerrar sesión:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleNavigateToCambioPass = () => {
    router.push("/cambioPass");
  };

  const handleNavigateToProfileForm = () => {
    router.push("/profileForm");
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
        name="Editar Datos Personales"
        onPress={handleNavigateToProfileForm}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Cambio Contraseña"
        onPress={handleNavigateToCambioPass}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Cerrar Sesion"
        onPress={handleCerrarSesion}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
