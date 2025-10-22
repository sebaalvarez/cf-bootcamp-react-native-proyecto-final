import { supabase } from "@/src/config/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { InferType } from "yup";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { IconSymbol } from "../../ui/IconSymbol";
import { FormInputController } from "../controllers/FormInputController";
import { resetPassSchema } from "../validations/FormSchemas";

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

      // Actualiza la contraseña directamente
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword.trim(),
      });

      if (updateError) {
        throw new Error(updateError.message);
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
                name={showPassword ? "00.square" : "00.circle"}
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
                name={showConfirmPassword ? "00.square" : "00.circle"}
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
