import { useCarrito } from "@/src/hooks/useCarrito";
import { calculaTotalPedido } from "@/src/utils/calculaTotalPedido";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import CartCardDetalle from "./CartCardDetalle";
import ModalDatosPedido from "./ModalDatosPedido";
import { ButtonCustom, ModalCustom, ThemedText, ThemedView } from "./ui";

export default function CartCardList() {
  const [modalOpen, setModalOpen] = useState(false);
  const { state } = useCarrito();

  const handleAgregar = () => {
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);
  };

  const sumarTotal = calculaTotalPedido(state.carrito);

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
      <ModalCustom isOpen={modalOpen} onPress={handleCerrarModal}>
        <ModalDatosPedido onPress={handleCerrarModal} />
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "96%",
    justifyContent: "center",
    gap: 20,
  },
  filaResumen: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
