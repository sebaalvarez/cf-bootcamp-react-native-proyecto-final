import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import RecoveryPassForm from "../../../components/forms/views/RecoveryPassForm";
import { ContainerApp } from "../../../components/ui";

export default function RecoveryPassword() {
  const { height } = useWindowDimensions();

  const stylesDinamic = StyleSheet.create({
    container: {
      height: height - 200,
    },
  });

  const handleSuccess = () => {
    // Redirige al login después de enviar el correo
    router.replace("./signIn");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ContainerApp>
        <ScrollView contentContainerStyle={stylesDinamic.container}>
          <RecoveryPassForm onSuccess={handleSuccess} />
        </ScrollView>
      </ContainerApp>
    </KeyboardAvoidingView>
  );
}
