import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { InferType } from "yup";
import { supabase } from "../../../config/supabase";
import { selectOneUser } from "../../../services/api/supabase/usuarios";
import { storeData } from "../../../services/local/storage";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { IconSymbol } from "../../ui/IconSymbol";
import { FormInputController } from "../controllers/FormInputController";
import { loginFormSchema } from "../validations/FormSchemas";

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

      // 1. Intenta iniciar sesión
      const { error: loginError, data: dataLogin } =
        await supabase.auth.signInWithPassword({
          email: data.mail.trim(),
          password: data.password.trim(),
        });

      if (loginError) {
        throw new Error("Error al loguearse el usuario: " + loginError.message);
      }

      // 2. Obtén los datos del usuario
      const usuario = await selectOneUser(dataLogin.user.user_metadata.sub);

      if (!usuario || usuario.length === 0) {
        throw new Error("No se encontraron datos del usuario");
      }

      // 3. Almacena los datos del usuario
      await storeData("usuario", JSON.stringify(usuario[0]));

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
                name={showPassword ? "00.square" : "00.circle"}
                color="gray"
              />
            </TouchableOpacity>
          )}
        />

        {error && <ThemedText>{error}</ThemedText>}
        {loading && <ThemedText>Logueando usuario...</ThemedText>}

        <ButtonCustom
          name={"Ingresar"}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        <TouchableOpacity onPress={() => router.push("./recovery-password")}>
          <ThemedText style={styles.recoveryLink}>
            ¿Olvidaste tu contraseña?
          </ThemedText>
        </TouchableOpacity>
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
  recoveryLink: {
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
