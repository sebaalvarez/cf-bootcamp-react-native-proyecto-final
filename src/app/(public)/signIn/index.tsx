import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import LoginForm from "../../../components/forms/views/LoginForm";
import { ContainerApp } from "../../../components/ui";

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
