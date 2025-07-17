import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useCarrito } from "../context/cartContextProvider";
import { IPlatos } from "../types/index";
import ButtonCustom from "./ButtonCustom";
import CardPlatoDetalle from "./CardPlatoDetalle";
import SelectorCantidad from "./SelectorCantidad";
import { ThemedView } from "./ThemedView";

interface Props {
  item: IPlatos;
  onPress?: () => void;
}

export default function ModalAgregar({ item, onPress }: Props) {
  const [cant, setCant] = useState(0);
  const { dispatch } = useCarrito();

  const handlePedido = () => {
    dispatch({
      type: "AGREGAR_PLATO",
      payload: {
        ...item,
        cantidad: cant,
      },
    });
    onPress?.();
  };

  return (
    <ThemedView style={styles.containerModal}>
      <View style={styles.containerClose}>
        <ButtonCustom name="X" onPress={onPress} height={40} width={40} />
      </View>
      <View style={styles.containerDet}>
        <CardPlatoDetalle item={item} />
        <SelectorCantidad cantidad={cant} setCantidad={setCant} />
        <ButtonCustom
          name="Agregar al pedido"
          onPress={handlePedido}
          height={50}
          width={"90%"}
          props={{ disabled: cant === 0 }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    height: 520,
    borderRadius: 20,
  },
  containerClose: {
    alignItems: "flex-end",
  },
  containerDet: {
    alignItems: "center",
    gap: 20,
  },
});
