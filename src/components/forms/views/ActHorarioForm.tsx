import {
  ButtonCustom,
  ErrorMessage,
  EsperaCarga,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import {
  getConfig,
  updateConfig,
} from "@/src/services/api/supabase/configuracion";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { InferType } from "yup";
import { FormInputController } from "../controllers/FormInputController";
import { horarioAtencionSchema } from "../validations/FormSchemas";

type HorarioFormValues = InferType<typeof horarioAtencionSchema>;

export default function ActHorarioForm() {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HorarioFormValues>({
    resolver: yupResolver(horarioAtencionSchema),
    defaultValues: {
      horario: "",
    },
  });

  const cargarHorario = async () => {
    try {
      const horarioActual = await getConfig("horario_atencion");
      if (horarioActual) {
        reset({ horario: String(horarioActual) });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el horario de atención actual");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    cargarHorario();
  }, [reset]);

  const onSubmit = async (data: HorarioFormValues) => {
    try {
      setLoading(true);
      setError(null);

      await updateConfig("horario_atencion", data.horario);

      Alert.alert(
        "Éxito",
        "El horario de atención se actualizó correctamente",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el horario de atención");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <EsperaCarga text="Cargando..." />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText align="center" type="subtitle">
        Modificar Horario
      </ThemedText>
      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"horario"}
        placeholder={"Horario de atención"}
        propsTextInput={{
          multiline: true,
          numberOfLines: 2,
          maxLength: 100,
          textAlignVertical: "top",
        }}
      />

      <ErrorMessage message={error || ""} />
      {loading && <ThemedText>Actualizando Horario Atención...</ThemedText>}

      <ButtonCustom
        name={"Actualizar"}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    padding: 20,
    width: "100%",
  },
});
