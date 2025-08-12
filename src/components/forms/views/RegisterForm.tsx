import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { InferType } from "yup";
import { supabase } from "../../../config/supabase";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { IconSymbol } from "../../ui/IconSymbol";
import { FormInputController } from "../controllers/FormInputController";
import { userFormSchema } from "../validations/FormSchemas";

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

      const { error: signUpError, data: dataRegister } =
        await supabase.auth.signUp({
          email: data.mail.trim(),
          password: data.password.trim(),
          options: {
            data: {
              nombre: data.nombre.trim(),
              apellido: data.apellido.trim(),
              telefono: data.telefono.trim(),
            },
          },
        });

      if (signUpError) {
        throw new Error(
          "Error al registrar el usuario: " + signUpError.message
        );
      }

      // Obtengo el ID del usuario recién creado
      const userId = dataRegister.user?.id;
      if (!userId) {
        throw new Error("No se pudo obtener el ID del usuario.");
      }

      // Registro el usuario recién creado con el rol usuario
      const { error: signUpRolUser } = await supabase.from("perfiles").insert({
        id: userId,
        nombre: data.nombre.trim(),
        apellido: data.apellido.trim(),
        telefono: data.telefono.trim(),
        mail: data.mail.trim(),
        rol: "user",
      });

      if (signUpRolUser) {
        throw new Error(
          "Error al insertar el perfil del usuario: " + signUpRolUser.message
        );
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.mail.trim(),
        password: data.password.trim(),
      });

      if (loginError) {
        throw new Error("Error al iniciar sesión: " + loginError.message);
      }

      router.replace("./(tabs)");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ha ocurrido un error");
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
          control={control}
          errors={errors}
          name={"nombre"}
          placeholder={"Nombre "}
          propsTextInput={{
            autoCapitalize: "words",
          }}
        />
        <FormInputController
          control={control}
          errors={errors}
          name={"apellido"}
          placeholder={"Apellido"}
          propsTextInput={{
            autoCapitalize: "words",
          }}
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
          name={"mail"}
          placeholder={"mail"}
          propsTextInput={{
            keyboardType: "email-address",
            autoCapitalize: "none",
          }}
        />

        <FormInputController
          control={control}
          errors={errors}
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
          control={control}
          errors={errors}
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
        {error && <ThemedText>{error}</ThemedText>}
        {loading && <ThemedText>Registrando usuario...</ThemedText>}

        <ButtonCustom name={"Registrarme"} onPress={handleSubmit(onSubmit)} />
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
