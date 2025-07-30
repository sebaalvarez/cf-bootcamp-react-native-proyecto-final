import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updatePlatoStock } from "../services/api/supabase/platos";
import { IPlatos } from "../types";
import CardPlatoDetalle from "./CardPlatoDetalle";
import SelectorCantidad from "./SelectorCantidad";
import { ButtonCustom, ThemedView } from "./ui";

interface Props {
  item: IPlatos;
  onPress?: () => void;
}

export default function ModalActualizarPlato({ item, onPress }: Props) {
  const [cant, setCant] = useState(item.stock);

  const handlePedido = async () => {
    await updatePlatoStock(Number(item.id), cant);
    onPress?.();
  };

  return (
    <ThemedView style={styles.containerModal}>
      <View style={styles.containerDet}>
        <CardPlatoDetalle item={item} />
        <SelectorCantidad cantidad={cant ?? 0} setCantidad={setCant} />
        <ButtonCustom name="Actualizar" onPress={handlePedido} width={"90%"} />
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
