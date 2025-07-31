import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { ButtonStack, ContainerApp } from "../../../../components/ui";
import { supabase } from "../../../../config/supabase";
import { useAuth } from "../../../../context/authProvider";
import { useThemeColor } from "../../../../hooks/useThemeColor";
import { removeData } from "../../../../services/local/storage";

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
  const { loading, session } = useAuth();

  const handleNavigateToProfileForm = () => {
    router.push("/profileForm");
  };

  const handleNavigateToPedidoDetalle = () => {
    router.push("/pedidoUltimo");
  };

  const handleNavigateToHistorialPedidos = () => {
    router.push("/pedidoHistorial");
  };

  const handleCerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleBorraHistorial = () => {
    removeData("pedidoHistorial");
  };

  const handleBorraPedido = () => {
    removeData("pedido");
  };

  const handleBorraUsuario = () => {
    removeData("usuario");
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
      {/* <ButtonCustom
          name="BORRAR Historial de Pedidos"
          onPress={handleBorraHistorial}
          props={{ style: styles.btn }}
        />
        <ButtonCustom
          name="BORRAR ultimo Pedidos"
          onPress={handleBorraPedido}
          props={{ style: styles.btn }}
        />
        <ButtonCustom
          name="BORRAR Datos Personales"
          onPress={handleBorraUsuario}
          props={{ style: styles.btn }}
        /> */}
    </ContainerApp>
  );
}
