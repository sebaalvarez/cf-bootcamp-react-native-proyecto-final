import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import {
  updatePassword,
  verifyCurrentPassword,
} from "@/src/services/api/supabase";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { IconSymbol } from "../../ui/IconSymbol";
import { FormInputController } from "../controllers/FormInputController";
import { cambioPassSchema } from "../validations/FormSchemas";

interface Props {
  disabledBtn?: boolean;
  onPress?: () => void;
  nameButton?: string;
}

export default function ChangePassForm({
  onPress,
  disabledBtn = false,
  nameButton = "Grabar",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(cambioPassSchema),
  });

  const onSubmit = async ({ currentPassword, newPassword }: any) => {
    setLoading(true);
    try {
      // 1. Verifica la contraseña actual a través del servicio centralizado
      const { isValid, error: verifyError } = await verifyCurrentPassword(
        currentPassword
      );

      if (verifyError || !isValid) {
        throw new Error("La contraseña actual es incorrecta.");
      }

      // 2. Actualiza la contraseña. El listener onAuthStateChange en AuthProvider se encargará del resto.
      const { error: updateError } = await updatePassword(newPassword);

      if (updateError) {
        throw new Error(updateError);
      }

      // 3. Muestra un mensaje de éxito. El AuthProvider gestionará el cierre de sesión y la redirección.
      Alert.alert("Contraseña actualizada", "Ingresa con tu nueva contraseña");

      reset();
    } catch (err: any) {
      // console.error("Error en el cambio de contraseña:", err.message);
      Alert.alert(
        "Error",
        err.message || "Ocurrió un problema al actualizar la contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThemedView>
        <ThemedText type="subtitle" align="center"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <FormInputController
          control={control as any}
          errors={errors as any}
          name={"currentPassword"}
          placeholder={"Contraseña actual"}
          propsTextInput={{ autoCapitalize: "none" }}
        />

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
          name="re_newPassword"
          placeholder={"Confirmar nueva contraseña"}
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

        <ButtonCustom
          name={nameButton}
          onPress={handleSubmit(onSubmit)}
          props={{ disabled: disabledBtn }}
          loading={loading}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 40,
    width: "100%",
  },
});
