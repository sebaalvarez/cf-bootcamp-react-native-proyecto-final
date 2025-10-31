import { ButtonCustom, ThemedView } from "@/src/components/ui";
import { updateStockInicial } from "@/src/services/api/supabase/platos";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { InferType } from "yup";
import { FormInputController } from "../controllers/FormInputController";
import { stockInicialSchema } from "../validations/FormSchemas";

interface FormData {
  stock: number;
}

type EditPlatoFormValues = InferType<typeof stockInicialSchema>;

export default function ActStockInicialForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loadingData, setLoadingData] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditPlatoFormValues>({
    resolver: yupResolver(stockInicialSchema),
    // defaultValues: {
    //   stock: 0,
    // },
  });

  const cargarDatos = useCallback(async () => {
    try {
      if (params.stock_inicial) {
        reset({ stock: parseInt(params.stock_inicial as string, 10) });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los datos del plato");
    } finally {
      setLoadingData(false);
    }
  }, [params.stock_inicial, reset]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const onSubmit = async (data: FormData) => {
    try {
      const platoId = parseInt(params.id as string, 10);
      const result = await updateStockInicial(platoId, data.stock);

      if (result.success) {
        Alert.alert("Éxito", "El stock inicial se actualizó correctamente", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Error", "No se pudo actualizar el stock inicial");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el stock inicial");
    }
  };

  if (loadingData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.loadingContainer}>
          <ButtonCustom name="Cargando..." />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        {/* <Controller
          control={control}
          name="stock"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              placeholder="Cantidad de stock inicial"
              value={value?.toString() || ""}
              onChangeText={(text) => onChange(text ? parseInt(text, 10) : 0)}
              onBlur={onBlur}
              props={{
                keyboardType: "numeric",
              }}
            />
          )}
        /> */}
        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"stock"}
          placeholder={"Cantidad de stock inicial"}
          propsTextInput={{
            keyboardType: "numeric",
          }}
        />

        <ThemedView style={styles.buttonContainer}>
          <ButtonCustom
            name={isSubmitting ? "Actualizando..." : "Actualizar Stock Inicial"}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    gap: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 10,
    marginTop: 20,
  },
});
