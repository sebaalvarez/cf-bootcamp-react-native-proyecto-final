import { StyleSheet } from "react-native";

import ButtonCustom from "./ButtonCustom";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  onPress?: () => void;
}

export default function ModalAgregar({ onPress }: Props) {
  const handlePedido = () => {
    onPress?.();
  };

  return (
    <ThemedView style={styles.containerModal}>
      <ThemedView style={styles.containerDet}>
        <ThemedText> Datos del envío</ThemedText>
        <ButtonCustom
          name="Modificar pedido"
          onPress={handlePedido}
          width={"90%"}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    height: "auto",
    borderRadius: 20,
  },

  containerDet: {
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
});
