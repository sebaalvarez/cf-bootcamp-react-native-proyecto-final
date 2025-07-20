import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { InferType } from "yup";
import { useUbicacion } from "../../../hooks/useUbicacion";
import { getData, storeData } from "../../../services/local/storage";
import ButtonCustom from "../../ButtonCustom";
import { ThemedView } from "../../ThemedView";
import { FormInputController } from "../controllers/FormInputController";
import { profileFormSchema } from "../validations/FormSchemas";

interface Props {
  disabledBtn?: boolean;
  onPress?: () => void;
}

export default function ProfileForm({ onPress, disabledBtn = false }: Props) {
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

  const { direccion, error } = useUbicacion();

  useEffect(() => {
    async function setValues() {
      const dataUser = await getData("usuario");

      if (dataUser) {
        const dir = error ? dataUser.domicilio : direccion;

        reset({
          nombre: dataUser.nombre,
          apellido: dataUser.apellido,
          telefono: dataUser.telefono,
          domicilio: dir,
        });
      }
    }
    setValues();
  }, [reset, direccion]);

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
        placeholder={"Dirección de entrega"}
      />

      {error && <Text style={{ color: "red", fontSize: 13 }}>{error}</Text>}
      <ButtonCustom
        name={"Guardar"}
        onPress={handleSubmit(onSubmit)}
        props={{ disabled: disabledBtn }}
      />
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
