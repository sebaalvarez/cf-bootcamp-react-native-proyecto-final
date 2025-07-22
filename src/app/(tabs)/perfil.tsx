import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonCustom from "../../components/ButtonCustom";
import ContainerApp from "../../components/ContainerApp";
import { ThemedView } from "../../components/ThemedView";
import { useThemeColor } from "../../hooks/useThemeColor";
import { removeData } from "../../services/local/storage";

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

  const handleNavigateToPedidoDetalle = () => {
    router.push("/pedidoUltimo");
  };

  const handleNavigateToHistorialPedidos = () => {
    router.push("/pedidoHistorial");
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
      <ThemedView>
        <ButtonCustom
          name="Editar Datos Personales"
          onPress={handleNavigateToProfileForm}
          props={{ style: styles.btn }}
        />
        <ButtonCustom
          name="Detalle Último Pedido"
          onPress={handleNavigateToPedidoDetalle}
          props={{ style: styles.btn }}
        />
        <ButtonCustom
          name="Historial de Pedidos"
          onPress={handleNavigateToHistorialPedidos}
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
      </ThemedView>
    </ContainerApp>
  );
}
