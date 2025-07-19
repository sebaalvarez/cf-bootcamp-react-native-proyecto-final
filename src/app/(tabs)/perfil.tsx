import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonCustom from "../../components/ButtonCustom";
import ContainerApp from "../../components/ContainerApp";
import { ThemedView } from "../../components/ThemedView";
export default function PerfilScreen() {
  const router = useRouter();

  const handleNavigateToProfileForm = () => {
    router.push("/profileForm");
  };

  const handleNavigateToPedidoDetalle = () => {
    router.push("/pedidoDetalle");
  };

  return (
    <ContainerApp scroll>
      <ThemedView>
        <ButtonCustom
          name="Editar Datos Personales"
          onPress={handleNavigateToProfileForm}
          props={{ style: styles.btn }}
        />
        <ButtonCustom
          name="Ver Detalle último Pedido"
          onPress={handleNavigateToPedidoDetalle}
          props={{ style: styles.btn }}
        />

        {/* <ButtonCustom
          name="Importar Platos a Firestore"
          onPress={importarPlatos}
          props={{ style: styles.btn }}
        /> */}
      </ThemedView>
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 0.5,
    borderWidth: 0,
  },
});
