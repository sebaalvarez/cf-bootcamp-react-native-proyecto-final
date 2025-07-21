import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonCustom from "../../components/ButtonCustom";
import ContainerApp from "../../components/ContainerApp";
import { ThemedView } from "../../components/ThemedView";
import { useThemeColor } from "../../hooks/useThemeColor";

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
  // useEffect(() => {
  //   async function abrir() {
  //     const viejoToken = await getData("@push_token");
  //     console.log(viejoToken);
  //   }
  //   abrir();
  // }, []);

  const handleNavigateToProfileForm = () => {
    router.push("/profileForm");
  };

  const handleNavigateToPedidoDetalle = () => {
    router.push("/pedidoDetalle");
  };

  const handleNavigateToHistorialPedidos = () => {
    router.push("/pedidoHistorial");
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
      </ThemedView>
    </ContainerApp>
  );
}
