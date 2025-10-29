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

  const handleNavigateToPerfil = () => {
    router.push("./(perfil)");
  };

  const handleNavigateToPedidoDetalle = () => {
    router.push("./pedidoUltimo");
  };

  const handleNavigateToHistorialPedidos = () => {
    router.push("./pedidoHistorial");
  };

  const handleCerrarSesion = async () => {
    Alert.alert(
      "¿Estás seguro que querés desloguearte?",
      "",
      [
        {
          text: "Cancelar",
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
        icon="perfil"
        onPress={handleNavigateToPerfil}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Detalle Último Pedido"
        icon="pedidoDetalle"
        onPress={handleNavigateToPedidoDetalle}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Historial de Pedidos"
        icon="pedidoHistorial"
        onPress={handleNavigateToHistorialPedidos}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Cerrar Sesion"
        icon="salir"
        onPress={handleCerrarSesion}
        props={{ style: styles.btn }}
      />
    </ContainerApp>
  );
}
