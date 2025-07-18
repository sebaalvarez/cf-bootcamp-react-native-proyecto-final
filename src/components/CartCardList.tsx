import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useCarrito } from "../context/cartContextProvider";
import ButtonCustom from "./ButtonCustom";
import CartCardDetalle from "./CartCardDetalle";
import { ModalCustom } from "./ModalCustom";
import ModalDatosPedido from "./ModalDatosPedido";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function CartCardList() {
  const [modalOpen, setModalOpen] = useState(false);
  const { state } = useCarrito();

  const handleAgregar = () => {
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);
  };
  const sumarTotal = state.carrito.reduce(
    (acc, item) => item.precio * item.cantidad + acc,
    0
  );

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title" align="center">
          Detalle de tu pedido
        </ThemedText>

        <FlatList
          data={state.carrito}
          keyExtractor={(item, index) => `plato-${item.id}-${index}`}
          renderItem={({ item }) => <CartCardDetalle item={item} />}
        />

        <ThemedView style={styles.filaResumen}>
          <ThemedText type="subtitle" align="left">
            Productos: {state.carrito.length}
          </ThemedText>
          <ThemedText type="subtitle" align="left">
            Total Pedido: ${sumarTotal.toLocaleString("es-AR")}
          </ThemedText>
        </ThemedView>
        <ButtonCustom name="confirmar pedido" onPress={handleAgregar} />
      </ThemedView>
      <ModalCustom
        isOpen={modalOpen}
        onPress={handleCerrarModal}
        // visibleClose={false}
      >
        <ModalDatosPedido onPress={handleCerrarModal} />
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    gap: 20,
  },
  filaResumen: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
});
