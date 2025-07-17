import { StyleSheet } from "react-native";
import Cart from "../../components/Cart";
import ContainerApp from "../../components/ContainerApp";
import { ThemedView } from "../../components/ThemedView";

export default function Menu() {
  return (
    <ContainerApp>
      <ThemedView style={styles.container}>
        <Cart />
      </ThemedView>
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
