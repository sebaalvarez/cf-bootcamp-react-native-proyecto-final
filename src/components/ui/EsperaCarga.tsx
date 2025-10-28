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
      <ThemedText type="defaultSemiBold" align="center">
        {text}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    gap: 30,
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
