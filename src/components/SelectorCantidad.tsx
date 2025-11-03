import { Alert, StyleSheet, View } from "react-native";
import { ButtonCustom, ThemedText } from "./ui";

interface Props {
  cantidad: number;
  setCantidad: (nuevoValor: number) => void;
  cantMax?: number;
}

export default function SelectorCantidad({
  cantidad,
  setCantidad,
  cantMax = 500,
}: Props) {
  const increment = () => {
    if (cantidad < cantMax) {
      setCantidad(cantidad + 1);
    } else {
      Alert.alert(
        "",
        `${cantMax} es la cantidad máxima que nos queda disponible.`
      );
    }
  };

  const decrement = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonCustom name="-" width={60} onPress={decrement} />
      <ThemedText style={styles.txt}>{cantidad}</ThemedText>
      <ButtonCustom name="+" width={60} onPress={increment} />
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
    width: 40,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: 800,
    fontSize: 18,
  },
});
