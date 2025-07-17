import { StyleSheet } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import ContainerApp from "../../components/ContainerApp";

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
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
