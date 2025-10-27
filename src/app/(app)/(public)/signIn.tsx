import LoginForm from "@/src/components/forms/views/LoginForm";
import { ContainerApp, ThemedText } from "@/src/components/ui";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function SignIn() {
  const { height } = useWindowDimensions();

  const stylesDinamic = StyleSheet.create({
    container: {
      height: height - 200,
    },
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ContainerApp>
        <ScrollView contentContainerStyle={stylesDinamic.container}>
          <LoginForm />
          <TouchableOpacity onPress={() => router.push("./recoveryPass")}>
            <ThemedText style={styles.recoveryLink}>
              ¿Olvidaste tu contraseña?
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ContainerApp>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  recoveryLink: {
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
