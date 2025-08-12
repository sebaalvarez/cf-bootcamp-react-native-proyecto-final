import { useRouter } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { ButtonStack, ContainerApp } from "../../../../../components/ui";
import { supabase } from "../../../../../config/supabase";
import { useThemeColor } from "../../../../../hooks/useThemeColor";

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

  const handleNavigateToProfileForm = () => {
    router.push("/profileForm");
  };

  const handleNavigateToCambioPass = () => {
    router.push("/cambioPass");
  };

  const handleNavigateToEliminarCuenta = async () => {
    Alert.alert(
      "¿Estás seguro que querés eliminar tu cuenta?",
      "🚨 Se borraran todos tus datos 🚨",
      [
        {
          text: "Cancelar",
          // onPress: () => console.log("Acción cancelada"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              // Llama a la función RPC para eliminar la cuenta
              const { error } = await supabase.rpc("delete_user_account");

              if (error) {
                Alert.alert(
                  "Error",
                  "No se pudo eliminar la cuenta: " + error.message
                );
                return;
              }

              Alert.alert(
                "Cuenta eliminada",
                "Tu cuenta ha sido eliminada correctamente."
              );

              // Cierra la sesión
              await supabase.auth.signOut();

              // Redirige al login
              router.replace("/");
            } catch (err) {
              console.error("Error inesperado:", err);
              Alert.alert(
                "Error",
                "Ocurrió un problema al eliminar la cuenta."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
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
        name="Eliminar Cuenta"
        onPress={handleNavigateToEliminarCuenta}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
