import { FormInputController } from "@/src/components/forms/controllers/FormInputController";
import { userFormSchema } from "@/src/components/forms/validations/FormSchemas";
import {
  ButtonCustom,
  ErrorMessage,
  IconSymbol,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import {
  createUserProfile,
  signInWithPassword,
  signUp,
} from "@/src/services/api/supabase";
import { storeData } from "@/src/services/local/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { InferType } from "yup";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userFormSchema),
  });

  const onSubmit = async (data: InferType<typeof userFormSchema>) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Registrar el usuario usando el servicio centralizado con metadatos
      const { error: signUpError, data: dataRegister } = await signUp(
        data.mail.trim(),
        data.password.trim(),
        {
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim(),
          telefono: data.telefono.trim(),
        }
      );

      if (signUpError) {
        setError(signUpError);
        setLoading(false);
        return;
      }

      // Obtengo el ID del usuario recién creado
      const userId = dataRegister?.user?.id;
      if (!userId) {
        setError("No se pudo obtener el ID del usuario.");
        setLoading(false);
        return;
      }

      // Registro el usuario recién creado con el rol usuario usando el servicio centralizado
      const { error: profileError } = await createUserProfile(
        userId,
        data.nombre.trim(),
        data.apellido.trim(),
        data.telefono.trim(),
        data.mail.trim(),
        "user"
      );

      if (profileError) {
        setError("Error al crear el perfil del usuario.");
        setLoading(false);
        return;
      }

      // 2. Iniciar sesión automáticamente usando el servicio centralizado
      const { error: loginError } = await signInWithPassword(
        data.mail.trim(),
        data.password.trim()
      );

      if (loginError) {
        setError(loginError);
        setLoading(false);
        return;
      }

      const jsonData = {
        id: userId,
        nombre: data.nombre.trim(),
        apellido: data.apellido.trim(),
        telefono: data.telefono.trim(),
        mail: data.mail.toLowerCase().trim(),
        rol: "user",
      };

      await storeData("usuario", JSON.stringify(jsonData));

      router.replace("./(tabs)");
    } catch (err) {
      console.error("Error en registro:", err);
      setError("Ha ocurrido un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThemedView>
        <ThemedText type="subtitle" align="center">
          Registrarse
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"nombre"}
          placeholder={"Nombre "}
          propsTextInput={{
            autoCapitalize: "words",
          }}
        />
        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"apellido"}
          placeholder={"Apellido"}
          propsTextInput={{
            autoCapitalize: "words",
          }}
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
          name={"mail"}
          placeholder={"mail"}
          propsTextInput={{
            keyboardType: "email-address",
            autoCapitalize: "none",
          }}
        />

        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"password"}
          placeholder={"password"}
          propsTextInput={{
            secureTextEntry: !showPassword,
            autoCapitalize: "none",
          }}
          renderRightAccessory={() => (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <IconSymbol
                size={20}
                name={showPassword ? "00.square" : "00.circle"}
                color="gray"
              />
            </TouchableOpacity>
          )}
        />

        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"re_password"}
          placeholder={"confirmar password"}
          propsTextInput={{
            secureTextEntry: !showRePassword,
            autoCapitalize: "none",
          }}
          renderRightAccessory={() => (
            <TouchableOpacity
              onPress={() => setShowRePassword(!showRePassword)}
            >
              <IconSymbol
                size={20}
                name={showRePassword ? "00.square" : "00.circle"}
                color="gray"
              />
            </TouchableOpacity>
          )}
        />
        <ErrorMessage message={error || ""} />
        {loading && <ThemedText>Registrando usuario...</ThemedText>}

        <ButtonCustom
          name={"Registrarme"}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
    width: "100%",
  },
});
