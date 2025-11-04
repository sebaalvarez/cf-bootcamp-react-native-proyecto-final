import { APP_VERSION_CODE } from "@/src/constants/Version";
import { verificarActualizacion } from "@/src/services/api/supabase/version";
import { IAppVersion } from "@/src/types";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Linking, Modal, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

interface Props {
  children: React.ReactNode;
}

export function VersionChecker({ children }: Props) {
  const [actualizacionObligatoria, setActualizacionObligatoria] =
    useState(false);
  const [versionNueva, setVersionNueva] = useState<IAppVersion | undefined>();

  const abrirActualizacion = useCallback((version: IAppVersion) => {
    if (version.url_descarga) {
      Linking.openURL(version.url_descarga);
    } else {
      Alert.alert(
        "Actualización",
        "Por favor, actualiza la aplicación desde la tienda de aplicaciones."
      );
    }
  }, []);

  const mostrarAlertaActualizacion = useCallback(
    (version?: IAppVersion) => {
      if (!version) return;

      Alert.alert(
        "🎉 Nueva versión disponible",
        `La versión (${version.version}) está disponible.\n\n${
          version.descripcion || "Incluye mejoras y correcciones."
        }\n\n¿Deseas actualizar ahora?`,
        [
          {
            text: "Más tarde",
            style: "cancel",
          },
          {
            text: "Actualizar",
            onPress: () => abrirActualizacion(version),
          },
        ]
      );
    },
    [abrirActualizacion]
  );

  const verificarVersion = useCallback(async () => {
    try {
      const resultado = await verificarActualizacion(APP_VERSION_CODE);

      if (resultado.hayActualizacion) {
        setVersionNueva(resultado.versionNueva);

        if (resultado.esObligatoria) {
          // Actualización obligatoria - bloquear la app
          setActualizacionObligatoria(true);
        } else {
          // Actualización opcional - mostrar alerta
          mostrarAlertaActualizacion(resultado.versionNueva);
        }
      }
    } catch (error) {
      console.error("Error al verificar versión:", error);
    }
  }, [mostrarAlertaActualizacion]);

  useEffect(() => {
    verificarVersion();
  }, [verificarVersion]);

  // Si la actualización es obligatoria, mostrar modal bloqueante
  if (actualizacionObligatoria && versionNueva) {
    return (
      <Modal visible={true} animationType="fade" transparent={false}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.content}>
            <ThemedText style={styles.emoji}>🚀</ThemedText>
            <ThemedText style={styles.title}>
              Actualización Requerida
            </ThemedText>
            <ThemedText style={styles.version}>
              Versión {versionNueva.version}
            </ThemedText>
            <ThemedText style={styles.description}>
              {versionNueva.descripcion ||
                "Para continuar usando la aplicación, debes actualizar a la última versión."}
            </ThemedText>
            <Pressable
              style={styles.button}
              onPress={() => abrirActualizacion(versionNueva)}
            >
              <ThemedText style={styles.buttonText}>
                Actualizar Ahora
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </Modal>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    gap: 20,
    padding: 30,
    borderRadius: 15,
    maxWidth: 400,
  },
  emoji: {
    paddingTop: 30,
    fontSize: 64,
    height: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  version: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
