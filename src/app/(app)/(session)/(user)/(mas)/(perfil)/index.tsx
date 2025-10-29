import { ButtonStack, ContainerApp } from "@/src/components/ui";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { deleteUserAccount } from "@/src/services/api/supabase";
import { removeData } from "@/src/services/local/storage";
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
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              // Llama al servicio centralizado para eliminar la cuenta
              const { error } = await deleteUserAccount();

              if (error) {
                Alert.alert("Error", "No se pudo eliminar la cuenta: " + error);
                return;
              }

              // Limpia el storage local
              await removeData("pedidoHistorial");
              await removeData("pedido");
              await removeData("usuario");
            } catch {
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
        icon="datos-perfil"
        onPress={handleNavigateToProfileForm}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Cambio Contraseña"
        icon="cambio-pass"
        onPress={handleNavigateToCambioPass}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Eliminar Cuenta"
        icon="borrar-cuenta"
        onPress={handleNavigateToEliminarCuenta}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
