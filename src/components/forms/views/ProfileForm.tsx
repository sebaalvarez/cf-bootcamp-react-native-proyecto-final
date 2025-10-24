import { FormInputController } from "@/src/components/forms/controllers/FormInputController";
import { profileFormSchema } from "@/src/components/forms/validations/FormSchemas";
import { ButtonCustom, ErrorMessage, ThemedView } from "@/src/components/ui";
import { useUbicacion } from "@/src/hooks/useUbicacion";
import { updateUser } from "@/src/services/api/supabase/usuarios";
import { getData, storeData } from "@/src/services/local/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { InferType } from "yup";

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
  const [updateError, setUpdateError] = useState<string | null>(null);
  
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
    setUpdateError(null);
    
    if (dataUserRef.current) {
      // Asegurar que tenemos el ID del usuario
      let userId = dataUserRef.current.id;
      
      // Si no hay id en localStorage, obtenerlo de la sesión actual
      if (!userId || userId === "") {
        const { getSession } = await import("@/src/services/api/supabase");
        const { data: sessionData } = await getSession();
        if (sessionData?.session?.user?.id) {
          userId = sessionData.session.user.id;
          dataUserRef.current.id = userId;
        } else {
          setUpdateError("No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.");
          return;
        }
      }

      if (
        dataUserRef.current.nombre !== data.nombre ||
        dataUserRef.current.apellido !== data.apellido ||
        dataUserRef.current.telefono !== data.telefono
      ) {
        try {
          await updateUser(
            userId,
            data.nombre,
            data.apellido,
            data.telefono
          );
        } catch {
          setUpdateError("Error al actualizar el perfil. Por favor, intenta nuevamente.");
          return;
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, direccion]);

  return (
    <ThemedView style={styles.container}>
      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"nombre"}
        placeholder={"Nombre "}
        propsTextInput={{}}
      />

      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"apellido"}
        placeholder={"Apellido"}
        propsTextInput={{}}
      />

      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"telefono"}
        placeholder={"Teléfono"}
        propsTextInput={{
          keyboardType: "phone-pad",
        }}
      />

      <FormInputController
        control={control as any}
        errors={errors as any}
        name={"domicilio"}
        placeholder={"Dirección de entrega"}
      />

      {error && <Text style={{ color: "red", fontSize: 13 }}>{error}</Text>}
      
      <ErrorMessage message={updateError || ""} />

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
