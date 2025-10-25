import {
  ButtonCustom,
  ContainerApp,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import { getConfig } from "@/src/services/api/supabase/configuracion";
import { imagenes } from "@/src/services/indexImagenes";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [abierto, setAbierto] = useState(true);
  const [horario, setHorario] = useState("");

  const getEstado = async () => {
    const estado = await getConfig("cocina_abierta");
    setAbierto(!!estado);
    const hora = await getConfig("horario_atencion");
    setHorario(String(hora));
  };

  useFocusEffect(
    useCallback(() => {
      getEstado();
    }, [])
  );

  return (
    <ContainerApp>
      <ThemedView style={styles.container}>
        <Image source={imagenes["logo"]} style={styles.img} />
        <ThemedText type="title">¡Bienvenido!</ThemedText>
        <ThemedText type="subtitle">Pedí tu plato favorito</ThemedText>
        {horario && (
          <ThemedText type="defaultSemiBold" align="center">
            Atendemos solamente los {horario}
          </ThemedText>
        )}
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

        <ButtonCustom
          name="Ver menú"
          width={"80%"}
          onPress={() => router.push("/menu")}
        />
      </ThemedView>
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
});
