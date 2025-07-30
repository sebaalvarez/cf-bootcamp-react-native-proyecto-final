import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import RegisterForm from "../../components/forms/views/RegisterForm";
import { ContainerApp } from "../../components/ui";

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
          <RegisterForm />
        </ScrollView>
      </ContainerApp>
    </KeyboardAvoidingView>
  );
}
