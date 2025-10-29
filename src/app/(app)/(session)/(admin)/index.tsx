import { ContainerApp, ThemedText, ThemedView } from "@/src/components/ui";
import { useAuth } from "@/src/hooks/useAuth";
import { getConfig } from "@/src/services/api/supabase";
import { imagenes } from "@/src/services/indexImagenes";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, StyleSheet } from "react-native";

interface Props {
  lightColor?: string;
  darkColor?: string;
}
export default function PerfilScreen({ lightColor, darkColor }: Props) {
  const [abierto, setAbierto] = useState(true);
  const [horario, setHorario] = useState("");
  const [telefono, setTelefono] = useState("");
  const { name } = useAuth();

  const getEstado = async () => {
    const estado = await getConfig("cocina_abierta");
    setAbierto(!!estado);
    const hora = await getConfig("horario_atencion");
    setHorario(String(hora));
    const telefono = await getConfig("numero_telefono");
    setTelefono(String(telefono));
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
        <ThemedText type="subtitle" align="center">
          {name}
        </ThemedText>
        {horario && (
          <ThemedText type="defaultSemiBold" align="center">
            {horario}
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
        {telefono && (
          <ThemedText type="defaultSemiBold" align="center">
            {telefono}
          </ThemedText>
        )}
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
    height: 150,
    width: 150,
    borderRadius: 20,
  },
});
