import { ButtonCustom, ThemedText, ThemedView } from "@/src/components/ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.emoji}>👨‍🍳</ThemedText>
      <ThemedText type="title" align="center">
        ¡Ups!
      </ThemedText>
      <ThemedText type="subtitle" align="center">
        Parece que te perdiste en la cocina... ¿Volvemos al inicio?
      </ThemedText>
      <ButtonCustom
        name="Ir a Inicio"
        width={"80%"}
        onPress={() => router.push("/")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
    paddingTop: 30,
    height: 80,
  },
});
