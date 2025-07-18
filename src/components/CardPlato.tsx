import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useCarrito } from "../context/cartContextProvider";
import { imagenes } from "../services/indexImagenes";
import { IPlatos } from "../types/index";
import ButtonCustom from "./ButtonCustom";
import ModalAgregar from "./ModalAgregar";
import { ModalCustom } from "./ModalCustom";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  item: IPlatos;
}

export default function CardPlato({ item }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { state } = useCarrito();

  const enCarrito = state.carrito.find((p) => p.id === item.id);

  const nameBtn = enCarrito ? "Modificar" : "Agregar";
  const sinStock = item.stock === 0 ? true : false;

  const handleAgregar = () => {
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ThemedView style={styles.containerCard}>
        <ThemedView style={styles.containerImg}>
          {enCarrito ? (
            <View style={styles.containerMsgCant}>
              <Text style={styles.txtCantidad}>{enCarrito?.cantidad}</Text>
            </View>
          ) : (
            <></>
          )}
          {sinStock ? (
            <View style={styles.containerMsgSinStock}>
              <Text style={styles.txtCantidad}>Sin Stock</Text>
            </View>
          ) : (
            <></>
          )}
          <Image source={imagenes[item.uri_img]} style={styles.inagen} />
        </ThemedView>
        <ThemedView style={styles.containerDetalle}>
          <ThemedView>
            <ThemedText style={styles.txtNombre}>{item.nombre} </ThemedText>
            <ThemedText numberOfLines={2} style={styles.txtDescripcion}>
              {item.descripcion}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.containerLineaPrecio}>
            <ThemedView style={styles.containerLineaPrecioValor}>
              <ThemedText style={styles.txtPrecio}>
                ${item.precio.toLocaleString("es-AR")}{" "}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.containerLineaPrecioBtn}>
              <ButtonCustom
                name={nameBtn}
                onPress={handleAgregar}
                props={{ disabled: sinStock }}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ModalCustom isOpen={modalOpen}>
        <ModalAgregar item={item} onPress={handleCerrarModal} />
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 120,
    borderRadius: 10,
    borderWidth: 0.2,
    padding: 5,
    gap: 10,
    marginVertical: 5,
  },
  containerImg: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  containerMsgCant: {
    position: "absolute",
    top: 0,
    alignSelf: "flex-end",
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 20,
    zIndex: 1,
  },
  containerMsgSinStock: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
  },
  txtCantidad: {
    color: "white",
    fontWeight: 600,
    textAlign: "center",
    textAlignVertical: "center",
  },
  inagen: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  containerDetalle: {
    flex: 1,
    width: "70%",
    justifyContent: "space-between",
    paddingVertical: 0,
    gap: 15,
  },
  txtNombre: {
    fontSize: 18,
    fontWeight: 700,
  },
  txtDescripcion: {
    fontSize: 12,
    lineHeight: 18,
  },
  txtPrecio: {
    fontSize: 14,
    fontWeight: 600,
  },
  containerLineaPrecio: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  containerLineaPrecioValor: {
    width: "40%",
    justifyContent: "center",
  },
  containerLineaPrecioBtn: {
    width: "60%",
  },
});
