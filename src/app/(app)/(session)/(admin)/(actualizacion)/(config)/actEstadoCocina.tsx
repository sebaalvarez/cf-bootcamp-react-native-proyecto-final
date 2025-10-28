import {
  ButtonCustom,
  ContainerApp,
  ThemedText,
  ThemedView,
} from "@/src//components/ui";
import {
  getConfig,
  updateConfig,
} from "@/src//services/api/supabase/configuracion";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

export default function ActEstadoCocina() {
  const [abierto, setAbierto] = useState(true);

  const getEstado = async () => {
    const estado = await getConfig("cocina_abierta");
    setAbierto(!!estado);
  };

  useEffect(() => {
    getEstado();
  }, [abierto]);

  const handlerActEstadoCocina = async () => {
    await updateConfig("cocina_abierta", !abierto);
    setAbierto(!abierto);
    Alert.alert("Éxito", "El horario de atención se actualizó correctamente", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <ContainerApp>
      <ThemedView style={styles.container}>
        <ThemedText align="center" type="subtitle">
          Modificar Estado Cocina
        </ThemedText>
        {!abierto && (
          <ThemedText type="subtitle" align="center" style={{ color: "red" }}>
            Cocina cerrada
          </ThemedText>
        )}
        {abierto && (
          <ThemedText type="subtitle" align="center" style={{ color: "green" }}>
            Cocina abierta
          </ThemedText>
        )}
      </ThemedView>
      <ButtonCustom name={"Cambiar estado"} onPress={handlerActEstadoCocina} />
    </ContainerApp>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 30,
    padding: 20,
    width: "100%",
  },
});
