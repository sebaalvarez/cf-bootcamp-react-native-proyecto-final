import CardPlatoDetalle from "@/src/components/CardPlatoDetalle";
import EditPlatoForm from "@/src/components/forms/views/EditPlatoForm";
import { ContainerApp, ThemedText, ThemedView } from "@/src/components/ui";
import { IPlatos } from "@/src/types";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function EditarPlato() {
  const params = useLocalSearchParams();

  // Validar que tengamos los parámetros necesarios
  if (!params.id || !params.nombre) {
    return (
      <ContainerApp>
        <ThemedView style={styles.errorContainer}>
          <ThemedText type="subtitle" align="center">
            Error: No se recibieron los datos del plato
          </ThemedText>
        </ThemedView>
      </ContainerApp>
    );
  }

  // Reconstruir el objeto plato desde los parámetros
  const plato: IPlatos = {
    id: params.id as string,
    nombre: params.nombre as string,
    descripcion: params.descripcion as string,
    precio: Number(params.precio),
    stock: Number(params.stock),
    uri_img: params.uri_img as string,
    activo: params.activo === "true",
    ordenVisualiza: Number(params.ordenVisualiza),
  };

  const handleSuccess = () => {
    // Volver a la pantalla anterior
    router.back();
  };

  return (
    <ContainerApp scroll>
      <CardPlatoDetalle item={plato} />
      <EditPlatoForm item={plato} onSuccess={handleSuccess} />
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
