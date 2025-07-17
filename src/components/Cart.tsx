import { StyleSheet } from "react-native";
import { useCarrito } from "../context/cartContextProvider";
import CartCardList from "./CartCardList";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

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
