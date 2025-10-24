import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <ThemedView style={styles.errorContainer}>
      <ThemedText style={styles.errorText}>{message}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#fee",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fcc",
  },
  errorText: {
    color: "#c00",
    textAlign: "center",
  },
});
