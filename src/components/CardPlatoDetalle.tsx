import React from "react";
import { Image, StyleSheet } from "react-native";

import { imagenes } from "../services/indexImagenes";
import { IPlatos } from "../types/index";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  item: IPlatos;
}

export default function CardPlatoDetalle({ item }: Props) {
  return (
    <ThemedView style={styles.containerCard}>
      <Image source={imagenes[item.uri_img]} style={styles.inagen} />
      <ThemedText style={styles.txtNombre}>{item.nombre} </ThemedText>
      <ThemedText numberOfLines={10} style={styles.txtDescripcion}>
        {item.descripcion}
      </ThemedText>
      <ThemedText style={styles.txtPrecio}>
        ${item.precio.toLocaleString("es-AR")}{" "}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  inagen: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  txtNombre: {
    fontSize: 20,
    fontWeight: 700,
  },
  txtDescripcion: {
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 20,
    textAlign: "justify",
  },
  txtPrecio: {
    fontSize: 18,
    fontWeight: 600,
  },
});
