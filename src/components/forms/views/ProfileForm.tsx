import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { InferType } from "yup";
import { useUbicacion } from "../../../hooks/useUbicacion";
import { updateUser } from "../../../services/api/supabase/usuarios";
import { getData, storeData } from "../../../services/local/storage";
import { ButtonCustom, ThemedView } from "../../ui";
import { FormInputController } from "../controllers/FormInputController";
import { profileFormSchema } from "../validations/FormSchemas";

interface Props {
  disabledBtn?: boolean;
  onPress?: () => void;
  nameButton?: string;
}

type ProfileFormValues = InferType<typeof profileFormSchema>;

export default function ProfileForm({
  onPress,
  disabledBtn = false,
  nameButton = "Grabar",
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileFormSchema),
  });

  const dataUserRef = useRef<any>(null);

  const onSubmit = async (data: ProfileFormValues) => {
    if (dataUserRef.current) {
      if (
        dataUserRef.current.nombre !== data.nombre ||
        dataUserRef.current.apellido !== data.apellido ||
        dataUserRef.current.telefono !== data.telefono
      ) {
        await updateUser(
          dataUserRef.current.id ?? "",
          data.nombre,
          data.apellido,
          data.telefono
        );
      }
      dataUserRef.current.nombre = data.nombre;
      dataUserRef.current.apellido = data.apellido;
      dataUserRef.current.telefono = data.telefono;
      dataUserRef.current.domicilio = data.domicilio;

      await storeData("usuario", JSON.stringify(dataUserRef.current));
    }
    onPress?.();
  };

  const { direccion, error } = useUbicacion();

  useEffect(() => {
    async function setValues() {
      const dataUser = await getData("usuario");

      if (dataUser) {
        const dir = error ? dataUser.domicilio : direccion;

        dataUserRef.current = dataUser;
        dataUserRef.current.domicilio = dir;

        reset({
          nombre: dataUser.nombre,
          apellido: dataUser.apellido,
          telefono: dataUser.telefono,
          domicilio: dir,
        });
      } else {
        reset({
          domicilio: direccion,
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
        name={nameButton}
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
