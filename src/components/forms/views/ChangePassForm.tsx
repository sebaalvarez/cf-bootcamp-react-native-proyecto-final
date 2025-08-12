import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../../../config/supabase";
import { ButtonCustom, ThemedText, ThemedView } from "../../ui";
import { IconSymbol } from "../../ui/IconSymbol";
import { FormInputController } from "../controllers/FormInputController";
import { cambioPassSchema } from "../validations/FormSchemas";

interface Props {
  disabledBtn?: boolean;
  // onPress?: () => void;
  nameButton?: string;
}

export default function ChangePassForm({
  // onPress,
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
    // onPress?.();
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const email = userData.user?.email;

      console.log(email);

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email!,
        password: currentPassword,
      });

      if (signInError) {
        Alert.alert("Error", "Contraseña actual incorrecta");
        setLoading(false);
        return;
      }

      console.log("antes de actualizar");
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      Alert.alert("Éxito", "Contraseña actualizada correctamente");
      reset();
      setLoading(false);
      // await supabase.auth.signOut();
    } catch (err) {
      console.error("Error inesperado:", err);
      Alert.alert(
        "Error inesperado",
        "Ocurrió un problema al actualizar la contraseña."
      );
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
          control={control}
          errors={errors}
          name={"currentPassword"}
          placeholder={"Contraseña actual"}
          propsTextInput={{ autoCapitalize: "none" }}
        />

        <FormInputController
          control={control}
          errors={errors}
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
          control={control}
          errors={errors}
          name="confirmPassword"
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
          // loading={loading}
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
