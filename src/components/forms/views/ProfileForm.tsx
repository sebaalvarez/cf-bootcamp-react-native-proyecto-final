import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { InferType } from "yup";
import { getData, storeData } from "../../../services/local/storage";
import ButtonCustom from "../../ButtonCustom";
import { ThemedView } from "../../ThemedView";
import { FormInputController } from "../controllers/FormInputController";
import { profileFormSchema } from "../validations/FormSchemas";

interface Props {
  onPress?: () => void;
}

export default function ProfileForm({ onPress }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileFormSchema),
  });
  const onSubmit = async (data: InferType<typeof profileFormSchema>) => {
    await storeData("usuario", JSON.stringify(data));
    onPress?.();
  };

  useEffect(() => {
    async function setValues() {
      const dataUser = await getData("usuario");

      if (dataUser) {
        reset({
          nombre: dataUser.nombre,
          apellido: dataUser.apellido,
          telefono: dataUser.telefono,
          domicilio: dataUser.domicilio,
        });
      }
    }
    setValues();
  }, [reset]);

  return (
    <ThemedView style={styles.container}>
      <FormInputController
        control={control}
        errors={errors}
        name={"nombre"}
        placeholder={"Nombre "}
        propsTextInput={{}}
      />
      <FormInputController
        control={control}
        errors={errors}
        name={"apellido"}
        placeholder={"Apellido"}
        propsTextInput={{}}
      />

      <FormInputController
        control={control}
        errors={errors}
        name={"telefono"}
        placeholder={"Teléfono"}
        propsTextInput={{
          keyboardType: "phone-pad",
        }}
      />

      <FormInputController
        control={control}
        errors={errors}
        name={"domicilio"}
        placeholder={"Domicilio"}
      />

      <ButtonCustom name={"Guardar"} onPress={handleSubmit(onSubmit)} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
    width: "100%",
  },
});
