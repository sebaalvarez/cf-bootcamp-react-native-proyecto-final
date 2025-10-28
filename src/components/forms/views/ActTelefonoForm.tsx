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
import { telefonoWhatsappSchema } from "../validations/FormSchemas";

type TelefonoFormValues = InferType<typeof telefonoWhatsappSchema>;

export default function ActTelefonoForm() {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TelefonoFormValues>({
    resolver: yupResolver(telefonoWhatsappSchema),
    defaultValues: {
      telefono: "",
    },
  });

  const cargarTelefono = async () => {
    try {
      const telefonoActual = await getConfig("numero_telefono");
      if (telefonoActual) {
        reset({ telefono: String(telefonoActual) });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el número de teléfono actual");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    cargarTelefono();
  }, [reset]);

  const onSubmit = async (data: TelefonoFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // Actualizar en la base de datos
      await updateConfig("numero_telefono", data.telefono);

      Alert.alert("Éxito", "El número de teléfono se actualizó correctamente", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar el teléfono");
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
        Modificar N° de Teléfono
      </ThemedText>
      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"telefono"}
        placeholder={"Teléfono"}
        propsTextInput={{
          keyboardType: "phone-pad",
        }}
      />

      <ErrorMessage message={error || ""} />
      {loading && <ThemedText>Actualizando Teléfono...</ThemedText>}

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
