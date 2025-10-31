import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  text?: string;
  height?: number;
  fullScreen?: boolean;
}

export function EsperaCarga({ text, height, fullScreen = true }: Props) {
  const containerStyle = [
    styles.spinnerContainer,
    fullScreen && styles.fullScreenContainer,
    !fullScreen && height ? { height } : !fullScreen && styles.defaultContainer,
  ];

  return (
    <ThemedView style={containerStyle}>
      <ActivityIndicator size="large" color="#0000ff" />
      <ThemedText type="defaultSemiBold" align="center">
        {text}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenContainer: {
    flex: 1,
    minHeight: "100%",
  },
  defaultContainer: {
    minHeight: 200,
  },
});
