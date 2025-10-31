import {
  ButtonStack,
  ContainerApp,
  EsperaCarga,
  ThemedView,
} from "@/src/components/ui";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { actualizarStockMasivo } from "@/src/services/api/supabase/platos";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Modal, StyleSheet } from "react-native";

interface Props {
  lightColor?: string;
  darkColor?: string;
}
export default function AdminActScreen({ lightColor, darkColor }: Props) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const handleNavigateToConfig = () => {
    router.push("./(config)");
  };

  const handleNavigateToActStockPlatos = () => {
    router.push("./actStockPlato");
  };

  const handleNavigateToActPrecioPlatos = () => {
    router.push("./actInfoPlato");
  };

  const handleActualizarStockMasivo = () => {
    Alert.alert(
      "⚠️ Confirmar Actualización Masiva",
      "¿Estás seguro que deseas actualizar el stock de TODOS los platos con el valor de stock inicial?\n\nEsta acción sobrescribirá el stock actual de todos los platos.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            setIsUpdating(true);
            try {
              const result = await actualizarStockMasivo();

              if (result.success) {
                Alert.alert(
                  "✅ Éxito",
                  result.message || "Stock actualizado correctamente",
                  [{ text: "OK" }]
                );
              } else {
                Alert.alert(
                  "❌ Error",
                  result.message || "No se pudo actualizar el stock",
                  [{ text: "OK" }]
                );
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
              Alert.alert(
                "❌ Error",
                "Ocurrió un error al actualizar el stock",
                [{ text: "OK" }]
              );
            } finally {
              setIsUpdating(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: background,
      height: 80,
      borderBottomWidth: 0.5,
      borderWidth: 0,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 30,
      borderRadius: 15,
      minWidth: 250,
    },
  });

  return (
    <>
      <Modal transparent visible={isUpdating} animationType="fade">
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <EsperaCarga
              text="Actualizando stock..."
              height={150}
              fullScreen={false}
            />
          </ThemedView>
        </ThemedView>
      </Modal>

      <ContainerApp scroll>
        <ButtonStack
          name="Configuración Global"
          icon="configGlobal"
          onPress={handleNavigateToConfig}
          props={{ style: styles.btn }}
        />
        <ButtonStack
          name="Actualizar Stock Plato Individual"
          icon="actStockPlatos"
          onPress={handleNavigateToActStockPlatos}
          props={{ style: styles.btn }}
        />
        <ButtonStack
          name="Actualizar Stock Plato Masivo"
          icon="actStockPlatos"
          onPress={handleActualizarStockMasivo}
          props={{ style: styles.btn, disabled: isUpdating }}
        />
        <ButtonStack
          name="Actualizar Información Plato"
          icon="actInfoPlatos"
          onPress={handleNavigateToActPrecioPlatos}
          props={{ style: styles.btn }}
        />
      </ContainerApp>
    </>
  );
}
