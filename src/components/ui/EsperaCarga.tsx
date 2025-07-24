import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  text?: string;
}

export function EsperaCarga({ text }: Props) {
  return (
    <ThemedView style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <ThemedText>{text}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
