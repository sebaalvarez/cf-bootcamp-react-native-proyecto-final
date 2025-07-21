import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { IPedidosHistoricos } from "../types";
import calculaTotalPedido from "../utils/calculaTotalPedido";
import ButtonCustom from "./ButtonCustom";
import CartCardDetalle from "./CartCardDetalle";
import { ModalCustom } from "./ModalCustom";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Prop {
  item: IPedidosHistoricos;
}

export default function CardPedidoHistorico({ item }: Prop) {
  const [modalOpen, setModalOpen] = useState(false);

  const sumarTotal = item?.montoTotal
    ? item.montoTotal.toLocaleString("es-AR")
    : calculaTotalPedido(item?.detalle).toLocaleString("es-AR");

  const handleAgregar = () => {
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ThemedView style={[styles.container]}>
        <ThemedText align="center" style={{ backgroundColor: "#bab7b7ff" }}>
          {item.fecha}
        </ThemedText>
        <ThemedView style={styles.lineaGral}>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Cant Productos: </ThemedText>
            <ThemedText>{item.detalle.length}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Total: </ThemedText>
            <ThemedText>${sumarTotal.toLocaleString("es-AR")} </ThemedText>
          </ThemedView>
        </ThemedView>

        <ButtonCustom name="Ver Detalle" onPress={handleAgregar} />
      </ThemedView>
      <ModalCustom isOpen={modalOpen} onPress={handleCerrarModal}>
        <ThemedView>
          <ThemedText type="subtitle" align="center">
            Detalle
          </ThemedText>
        </ThemedView>
        <FlatList
          data={item.detalle}
          keyExtractor={(item, index) => `plato-${item.id}-${index}`}
          renderItem={({ item }) => <CartCardDetalle item={item} />}
        />
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  linea: {
    flexDirection: "row",
  },
  lineaGral: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
