import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { InferType } from "yup";
import { supabase } from "../../../config/supabase";
import { useAuth } from "../../../context/authProvider";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { FormInputController } from "../controllers/FormInputController";
import { userFormSchema } from "../validations/FormSchemas";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { loading: load, session } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userFormSchema),
  });
  console.log("loading: ", load);
  console.log("Session antes registro: ", session);

  const onSubmit = async (data: InferType<typeof userFormSchema>) => {
    // Alert.alert(JSON.stringify(data));
    // console.log(data);

    try {
      setLoading(true);
      setError(null);

      // TODO: guardar usuario en supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.mail.trim(),
        password: data.password.trim(),
        options: { data: { name: data.usuario } },
      });

      if (signUpError) {
        throw signUpError;
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.mail.trim(),
        password: data.password.trim(),
      });

      if (loginError) {
        throw loginError;
      }

      // // Forzar recarga de la sesión
      // const { data: dataSession } = await supabase.auth.getSession();
      // console.log("Sesión después del registro:", dataSession.session);

      console.log("Session despues del registro: ", session);
      router.back();

      //
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
          name={"usuario"}
          placeholder={"usuario"}
        />

        <FormInputController
          control={control}
          errors={errors}
          name={"mail"}
          placeholder={"mail"}
        />

        <FormInputController
          control={control}
          errors={errors}
          name={"password"}
          placeholder={"password"}
          propsTextInput={{
            secureTextEntry: true,
          }}
        />

        {error && <ThemedText>{error}</ThemedText>}
        {loading && <ThemedText>Registrando usuario...</ThemedText>}

        <ButtonCustom name={"Guardar"} onPress={handleSubmit(onSubmit)} />
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
