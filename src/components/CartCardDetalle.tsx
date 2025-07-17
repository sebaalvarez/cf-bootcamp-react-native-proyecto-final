import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";

import { imagenes } from "../services/indexImagenes";
import { IPlatos } from "../types/index";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  item: IPlatos;
}

export default function CartCardDetalle({ item }: Props) {
  const [cant, setCant] = useState(0);

  return (
    <ThemedView style={styles.containerCard}>
      <ThemedView style={styles.containerImg}>
        <Image source={imagenes[item.uri_img]} style={styles.inagen} />
      </ThemedView>
      <ThemedView style={styles.containerDetalle}>
        <ThemedView style={styles.containerNombre}>
          <ThemedText style={styles.txtNombre}>{item.nombre} </ThemedText>
          <ThemedText>Precio: ${item.precio.toFixed(0)} </ThemedText>
          <ThemedView style={styles.filaCant}>
            <ThemedText>Cantidad: {item.cantidad.toFixed(0)} </ThemedText>
            <ThemedText style={styles.txtPrecio}>
              ${(item.precio * item.cantidad).toFixed(0)}{" "}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        {/* <ThemedView style={styles.containerCantidad}>
          <SelectorCantidad cantidad={item.cantidad} setCantidad={setCant} />
        </ThemedView> */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    gap: 5,
    marginBottom: 5,
    borderColor: "black",
    borderBottomWidth: 2,
  },

  containerImg: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    // backgroundColor: "blue",
  },

  containerDetalle: {
    // alignItems: "center",
    justifyContent: "center",
    width: "75%",
    // backgroundColor: "blue",
    gap: 5,
  },
  containerNombre: {
    // flexDirection: "row",
    // backgroundColor: "grey",
  },
  containerCantidad: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "grey",
  },
  filaCant: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  inagen: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  txtNombre: {
    fontSize: 18,
    fontWeight: 700,
  },

  txtPrecio: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "right",
  },
});
