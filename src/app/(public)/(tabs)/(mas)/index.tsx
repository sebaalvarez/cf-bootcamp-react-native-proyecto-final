import { ButtonStack, ContainerApp } from "@/src/components/ui";
import { supabase } from "@/src/config/supabase";
import { useThemeColor } from "@/src/hooks/useThemeColor";
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

  const handleNavigateToPerfil = () => {
    router.push("/(public)/(tabs)/(mas)/(perfil)");
  };

  const handleNavigateToPedidoDetalle = () => {
    router.push("/pedidoUltimo");
  };

  const handleNavigateToHistorialPedidos = () => {
    router.push("/pedidoHistorial");
  };

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
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error("Error al cerrar sesión:", error.message);
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
        name="Mi Perfil"
        onPress={handleNavigateToPerfil}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Detalle Último Pedido"
        onPress={handleNavigateToPedidoDetalle}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Historial de Pedidos"
        onPress={handleNavigateToHistorialPedidos}
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
