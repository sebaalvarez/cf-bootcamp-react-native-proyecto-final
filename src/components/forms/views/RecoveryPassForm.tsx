import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { InferType } from "yup";
import { supabase } from "../../../config/supabase";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { FormInputController } from "../controllers/FormInputController";
import { recoveryPassSchema } from "../validations/FormSchemas";

interface Props {
  onSuccess?: () => void;
}

export default function RecoveryPassForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(recoveryPassSchema),
  });

  const onSubmit = async (data: InferType<typeof recoveryPassSchema>) => {
    try {
      setLoading(true);
      setError(null);

      // Envía el correo de recuperación de contraseña con deep link
      const { error: recoveryError } =
        await supabase.auth.resetPasswordForEmail(data.mail.trim(), {
          redirectTo: "hama://reset-password",
        });

      if (recoveryError) {
        // Manejar diferentes tipos de errores
        let errorMsg = recoveryError.message;

        if (
          recoveryError.message.includes("504") ||
          recoveryError.message.includes("timeout")
        ) {
          errorMsg =
            "El servidor tardó demasiado en responder. Por favor, intenta nuevamente en unos momentos.";
        } else if (recoveryError.message.includes("rate limit")) {
          errorMsg =
            "Has solicitado demasiados emails. Por favor, espera unos minutos e intenta nuevamente.";
        }

        throw new Error(errorMsg);
      }

      Alert.alert(
        "📧 Correo enviado 📧",
        "Revisa tu bandeja de entrada y sigue las instrucciones. El enlace es válido por 1 hora.",
        [
          {
            text: "Ok",
            onPress: () => {
              reset();
              onSuccess?.();
            },
          },
        ]
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ha ocurrido un error";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThemedView>
        <ThemedText type="subtitle" align="center">
          Recuperar Contraseña
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.instructions}>
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </ThemedText>

        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"mail"}
          placeholder={"Correo electrónico"}
          propsTextInput={{
            keyboardType: "email-address",
            autoCapitalize: "none",
          }}
        />

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}

        <ButtonCustom
          name={"Enviar enlace"}
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
  instructions: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});
