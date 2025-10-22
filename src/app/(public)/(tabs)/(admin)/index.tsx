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

  const handleNavigateToCambioEstado = () => {
    router.push("/actEstadoCocina");
  };

  const handleNavigateToActStockPlatos = () => {
    router.push("/actStockPlato");
  };

  const handleNavigateToActPrecioPlatos = () => {
    router.push("/actInfoPlato");
  };

  const handleNavigateToPedSolicitados = () => {
    router.push("/PedidosSolicitados");
  };

  const handleNavigateToPedRecibidos = () => {
    router.push("/PedidosRecibidos");
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
        name="Actualizar Información Plato"
        onPress={handleNavigateToActPrecioPlatos}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Listado de Pedidos Solicitados"
        onPress={handleNavigateToPedSolicitados}
        props={{ style: styles.btn }}
      />
      <ButtonStack
        name="Listado de Pedidos Recibidos"
        onPress={handleNavigateToPedRecibidos}
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
