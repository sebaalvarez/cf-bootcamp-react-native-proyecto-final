import { FormInputController } from "@/src/components/forms/controllers/FormInputController";
import { resetPassSchema } from "@/src/components/forms/validations/FormSchemas";
import {
  ButtonCustom,
  IconSymbol,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import { updatePassword } from "@/src/services/api/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { InferType } from "yup";

export default function ResetPassForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPassSchema),
  });

  const onSubmit = async (data: InferType<typeof resetPassSchema>) => {
    try {
      setLoading(true);
      setError(null);

      // Actualiza la contraseña usando el servicio centralizado
      const { error: updateError } = await updatePassword(
        data.newPassword.trim()
      );

      if (updateError) {
        throw new Error(updateError);
      }

      Alert.alert("Contraseña actualizada", "Ingresa con tu nueva contraseña");

      reset();
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
          Restablecer Contraseña
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.instructions}>
          Ingresa tu nueva contraseña.
        </ThemedText>

        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"newPassword"}
          placeholder={"Nueva contraseña"}
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

        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"re_newPassword"}
          placeholder={"Confirmar nueva contraseña"}
          propsTextInput={{
            secureTextEntry: !showConfirmPassword,
            autoCapitalize: "none",
          }}
          renderRightAccessory={() => (
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <IconSymbol
                size={20}
                name={showConfirmPassword ? "pass-oculta" : "pass-visible"}
                color="gray"
              />
            </TouchableOpacity>
          )}
        />

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}

        <ButtonCustom
          name={"Actualizar contraseña"}
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
