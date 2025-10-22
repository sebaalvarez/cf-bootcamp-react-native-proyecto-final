import { useThemeColor } from "@/src/hooks/useThemeColor";
import { getEstadoPedido } from "@/src/services/api/getEstadoPedidoService";
import { IPedido } from "@/src/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import CartCardDetalle from "./CartCardDetalle";
import {
  ButtonCustom,
  EsperaCarga,
  ModalCustom,
  ThemedText,
  ThemedView,
} from "./ui";

interface Prop {
  item: IPedido;
  lightColor?: string;
  darkColor?: string;
}

export default function CardPedidoHistorico({
  item,
  lightColor,
  darkColor,
}: Prop) {
  const [modalOpen, setModalOpen] = useState(false);
  const [estadoAct, setEstadoAct] = useState("");
  const [isLoading, setLoading] = useState(true);
  const backgroundTitleDet = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundTitle"
  );

  async function getPedido() {
    if (item?.id) {
      if (typeof item.id === "number") {
        const estAct = await getEstadoPedido(item.id);
        setEstadoAct(estAct);
      } else {
        setEstadoAct("");
      }
    } else {
      setEstadoAct("");
    }
  }

  useEffect(() => {
    getPedido();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAgregar = () => {
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <ThemedView style={{ marginTop: 40, gap: 30 }}>
        <EsperaCarga />
        <ThemedText type="defaultSemiBold" align="center">
          Cargando Historial...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <ThemedView style={[styles.container]}>
        <ThemedText
          align="center"
          style={{ backgroundColor: backgroundTitleDet }}
        >
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
            <ThemedText>${item.montoTotal} </ThemedText>
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
