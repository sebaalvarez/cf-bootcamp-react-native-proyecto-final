import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useCarrito } from "../hooks/useCarrito";
import { IPlatos } from "../types";
import CardPlatoDetalle from "./CardPlatoDetalle";
import SelectorCantidad from "./SelectorCantidad";
import { ButtonCustom, ThemedView } from "./ui";

interface Props {
  item: IPlatos;
  onPress?: () => void;
}

export default function ModalAgregar({ item, onPress }: Props) {
  const { dispatch, state } = useCarrito();

  const enCarrito = state.carrito.find((p) => p.id === item.id);
  const [cant, setCant] = useState(enCarrito ? enCarrito.cantidad : 0);
  const cantMax = item.stock;

  const handlePedido = () => {
    if (enCarrito) {
      if (cant === 0) {
        dispatch({
          type: "QUITAR_PLATO",
          payload: { id: item.id },
        });
      } else {
        dispatch({
          type: "MODIFICAR_CANTIDAD",
          payload: {
            id: item.id,
            cantidad: cant ?? 0,
          },
        });
      }
    } else {
      dispatch({
        type: "AGREGAR_PLATO",
        payload: {
          ...item,
          cantidad: cant,
        },
      });
    }

    onPress?.();
  };

  return (
    <ThemedView style={styles.containerModal}>
      <View style={styles.containerDet}>
        <CardPlatoDetalle item={item} />
        <SelectorCantidad
          cantidad={cant ?? 0}
          setCantidad={setCant}
          cantMax={cantMax}
        />
        {enCarrito && (
          <ButtonCustom
            name="Modificar pedido"
            onPress={handlePedido}
            width={"90%"}
          />
        )}
        {!enCarrito && (
          <ButtonCustom
            name="Agregar al pedido"
            onPress={handlePedido}
            width={"90%"}
            props={{ disabled: cant === 0 }}
          />
        )}
      </View>
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
