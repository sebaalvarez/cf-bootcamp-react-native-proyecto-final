import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { InferType } from "yup";
import {
  signUp,
  signInWithPassword,
  createUserProfile,
} from "@/src/services/api/supabase";
import { storeData } from "@/src/services/local/storage";
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

      if (signUpError || !dataRegister) {
        throw new Error("Error al registrar el usuario: " + signUpError);
      }

      // Obtengo el ID del usuario recién creado
      const userId = dataRegister.user?.id;
      if (!userId) {
        throw new Error("No se pudo obtener el ID del usuario.");
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
        throw new Error("Error al insertar el perfil del usuario: " + profileError);
      }

      // 2. Iniciar sesión automáticamente usando el servicio centralizado
      const { error: loginError } = await signInWithPassword(
        data.mail.trim(),
        data.password.trim()
      );

      if (loginError) {
        throw new Error("Error al iniciar sesión: " + loginError);
      }

      const jsonData = {
        nombre: data.nombre.trim(),
        apellido: data.apellido.trim(),
        telefono: data.telefono.trim(),
        mail: data.mail.toLowerCase().trim(),
        rol: "user",
      };

      await storeData("usuario", JSON.stringify(jsonData));

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
        {error && <ThemedText>{error}</ThemedText>}
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
