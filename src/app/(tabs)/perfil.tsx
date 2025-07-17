import { StyleSheet } from "react-native";
import ContainerApp from "../../components/ContainerApp";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

export default function PerfilScreen() {
  return (
    <ContainerApp scroll>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Datos Usuario</ThemedText>
      </ThemedView>
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
