import { FormInputController } from "@/src/components/forms/controllers/FormInputController";
import { loginFormSchema } from "@/src/components/forms/validations/FormSchemas";
import {
  ButtonCustom,
  ErrorMessage,
  IconSymbol,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import { selectOneUser, signInWithPassword } from "@/src/services/api/supabase";
import { storeData } from "@/src/services/local/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { InferType } from "yup";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: InferType<typeof loginFormSchema>) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Intenta iniciar sesión usando el servicio centralizado
      const { error: loginError, data: dataLogin } = await signInWithPassword(
        data.mail.trim(),
        data.password.trim()
      );

      if (loginError || !dataLogin) {
        setError(loginError);
        setLoading(false);
        return;
      }

      // 2. Obtén los datos del usuario
      const usuario = await selectOneUser(dataLogin.user.user_metadata.sub);

      if (!usuario || usuario.length === 0) {
        setError("No se encontraron datos del usuario");
        setLoading(false);
        return;
      }

      // 3. Almacena los datos del usuario
      await storeData("usuario", JSON.stringify(usuario[0]));

      router.replace("/");
    } catch (err) {
      console.error("Error en login:", err);
      setError("Ha ocurrido un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThemedView>
        <ThemedText type="subtitle" align="center">
          Ingresar
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
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
                name={showPassword ? "pass-oculta" : "pass-visible"}
                color="gray"
              />
            </TouchableOpacity>
          )}
        />

        <ErrorMessage message={error || ""} />
        {loading && <ThemedText>Logueando usuario...</ThemedText>}

        <ButtonCustom
          name={"Ingresar"}
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
