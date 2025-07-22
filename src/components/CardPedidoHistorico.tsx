import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import getEstadoPedido from "../services/api/getEstadoPedidoService";
import { IPedido } from "../types";
import calculaTotalPedido from "../utils/calculaTotalPedido";
import ButtonCustom from "./ButtonCustom";
import CartCardDetalle from "./CartCardDetalle";
import { ModalCustom } from "./ModalCustom";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Prop {
  item: IPedido;
}

export default function CardPedidoHistorico({ item }: Prop) {
  const [modalOpen, setModalOpen] = useState(false);
  const [estadoAct, setEstadoAct] = useState("");

  useEffect(() => {
    async function getPedido() {
      const estAct = item?.id ? await getEstadoPedido(item.id) : "";
      setEstadoAct(estAct);
    }
    getPedido();
  }, []);

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
        <ThemedView style={styles.linea}>
          <ThemedText type="defaultSemiBold">Estado: </ThemedText>
          <ThemedText>{estadoAct}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.lineaGral}>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Cant Productos: </ThemedText>
            <ThemedText>{item.detalle.length}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Total: </ThemedText>
            <ThemedText>${sumarTotal} </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={[styles.lineaBtn]}>
          <ButtonCustom
            name="Ver Detalle"
            onPress={handleAgregar}
            width={"80%"}
          />
        </ThemedView>
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
    height: 120,
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 0,
    borderBottomWidth: 2,
  },

  linea: {
    flexDirection: "row",
  },
  lineaBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  lineaGral: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
