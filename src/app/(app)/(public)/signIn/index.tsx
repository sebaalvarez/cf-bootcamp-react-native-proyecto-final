import LoginForm from "@/src/components/forms/views/LoginForm";
import { ContainerApp } from "@/src/components/ui";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function SignUp() {
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
        </ScrollView>
      </ContainerApp>
    </KeyboardAvoidingView>
  );
}
