import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { EstadosPedidoType } from "../constants/EstadosPedido";
import { useThemeColor } from "../hooks/useThemeColor";
import { updateEstadoPedido } from "../services/api/supabase/pedidos";
import { selectOnePedidoDetalle } from "../services/api/supabase/pedidosDetalle";
import { IPedidoDetalleSupabase, IPedidoSupabase } from "../types";
import CardPedidoIngresadoDetalle from "./CardPedidoIngresadoDetalle";
import {
  ButtonCustom,
  EsperaCarga,
  ModalCustom,
  ThemedText,
  ThemedView,
} from "./ui";

interface Prop {
  item: IPedidoSupabase;
  lightColor?: string;
  darkColor?: string;
  refresca: (valor: boolean) => void;
  actEstado: boolean;
  nuevoEstado: EstadosPedidoType;
}

export default function CardPedidoIngresado({
  item,
  lightColor,
  darkColor,
  refresca,
  actEstado,
  nuevoEstado,
}: Prop) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [detPed, setDetPed] = useState<IPedidoDetalleSupabase[]>();
  const backgroundTitleDet = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundTitle"
  );

  const handleVerDetalle = async () => {
    setLoading(true);
    const res = await selectOnePedidoDetalle(item.id ?? 0);
    const detPed = res ?? [];
    setDetPed(detPed);
    setLoading(false);
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);
  };

  const handleActEstado = async () => {
    await updateEstadoPedido(item.id ?? 0, nuevoEstado);
    refresca(!actEstado);
  };

  if (isLoading) {
    return (
      <ThemedView style={{ marginTop: 10 }}>
        <EsperaCarga />
        <ThemedText type="defaultSemiBold" align="center">
          Cargando Listado...
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
          <ThemedText type="defaultSemiBold">Nombre: </ThemedText>
          <ThemedText>
            {item.apellido}, {item.nombre}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.linea}>
          <ThemedText type="defaultSemiBold">Teléfono: </ThemedText>
          <ThemedText>{item.telefono}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.linea}>
          <ThemedText type="defaultSemiBold">Dir. Entrega: </ThemedText>
          <ThemedText>{item.domicilio}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.lineaGral}>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Cant Productos: </ThemedText>
            <ThemedText>{item.cantidadPlatos}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Total: </ThemedText>
            <ThemedText>${item.montoTotal.toLocaleString("es-AR")} </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={[styles.lineaBtn]}>
          <ButtonCustom
            name="Ver Detalle"
            onPress={handleVerDetalle}
            width={"30%"}
          />
          <ButtonCustom
            name="Actualiza Estado"
            onPress={handleActEstado}
            width={"60%"}
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
          data={detPed}
          keyExtractor={(item, index) => `plato-${item.id}-${index}`}
          renderItem={({ item }) => <CardPedidoIngresadoDetalle item={item} />}
        />
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
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
    justifyContent: "space-between",
  },
  lineaGral: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
