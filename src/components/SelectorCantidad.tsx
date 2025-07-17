import { StyleSheet, View } from "react-native";
import ButtonCustom from "./ButtonCustom";
import { ThemedText } from "./ThemedText";

interface Props {
  cantidad: number;
  setCantidad: (nuevoValor: number) => void;
}

export default function SelectorCantidad({ cantidad, setCantidad }: Props) {
  const increment = () => {
    setCantidad(cantidad + 1);
  };

  const decrement = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonCustom name="-" width={60} height={40} onPress={decrement} />
      <ThemedText style={styles.txt}>{cantidad}</ThemedText>
      <ButtonCustom name="+" width={60} height={40} onPress={increment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    borderColor: "black",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  txt: {
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: 800,
    fontSize: 18,
  },
});
