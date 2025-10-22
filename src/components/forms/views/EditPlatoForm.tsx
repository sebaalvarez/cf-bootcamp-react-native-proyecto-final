import { updatePlatoInfo } from "@/src/services/api/supabase/platos";
import { IPlatos } from "@/src/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { InferType } from "yup";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { FormInputController } from "../controllers/FormInputController";
import { editPlatoFormSchema } from "../validations/FormSchemas";

interface Props {
  item: IPlatos;
  onSuccess?: () => void;
}

type EditPlatoFormValues = InferType<typeof editPlatoFormSchema>;

export default function EditPlatoForm({ item, onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditPlatoFormValues>({
    resolver: yupResolver(editPlatoFormSchema),
    defaultValues: {
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
    },
  });

  useEffect(() => {
    reset({
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
    });
  }, [item, reset]);

  const onSubmit = async (data: EditPlatoFormValues) => {
    try {
      await updatePlatoInfo(
        Number(item.id),
        data.nombre.trim(),
        data.descripcion.trim(),
        data.precio
      );
      onSuccess?.();
      // Alert.alert("Éxito", "El plato ha sido actualizado correctamente", [
      //   {
      //     text: "OK",
      //     onPress: () => onSuccess?.(),
      //   },
      // ]);
    } catch (err) {
      Alert.alert(
        "Error",
        "No se pudo actualizar el plato. Intenta nuevamente."
      );
      console.error(err);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="subtitle" align="center">
          Actualiza la información del plato
        </ThemedText>
      </ThemedView>

      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"precio"}
        placeholder={"Precio"}
        propsTextInput={{
          keyboardType: "number-pad",
        }}
      />

      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"nombre"}
        placeholder={"Nombre del Plato"}
        propsTextInput={{
          maxLength: 50,
        }}
      />

      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"descripcion"}
        placeholder={"Descripción"}
        propsTextInput={{
          multiline: true,
          numberOfLines: 4,
          maxLength: 200,
          textAlignVertical: "top",
        }}
      />

      <ButtonCustom
        name="Actualizar Plato"
        onPress={handleSubmit(onSubmit)}
        width={"100%"}
        loading={isSubmitting}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
});
