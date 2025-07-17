import { View, Text } from "react-native";
import { useCarrito } from "../context/cartContextProvider";

export default function Cart() {
  const { state } = useCarrito();

  return state.carrito.length > 0 ? (
    <View>
      <Text>Carrito ({state.carrito.length} items)</Text>
      {state.carrito.map((plato) => (
        <Text key={plato.id}>
          {plato.nombre} x {plato.cantidad} x ${plato.precio} x{" "}
          {plato.precio * plato.cantidad}
        </Text>
      ))}
    </View>
  ) : (
    <View>
      <Text>No hay producxtos en el carrito</Text>
    </View>
  );
}
