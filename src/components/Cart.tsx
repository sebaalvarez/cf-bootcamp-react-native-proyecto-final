import { useCarrito } from "@/src/hooks/useCarrito";
import { StyleSheet } from "react-native";
import CartCardList from "./CartCardList";
import { ThemedText, ThemedView } from "./ui";

export default function Cart() {
  const { state } = useCarrito();

  return state.carrito.length > 0 ? (
    <ThemedView>
      <CartCardList />
    </ThemedView>
  ) : (
    <ThemedView style={styles.containerVacio}>
      <ThemedText type="title">Carrito Vacio</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerVacio: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
