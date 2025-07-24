import { Image, StyleSheet } from "react-native";
import { imagenes } from "../services/indexImagenes";
import { IPlatos } from "../types";
import { ThemedText, ThemedView } from "./ui";

interface Props {
  item: IPlatos;
}

export default function CartCardDetalle({ item }: Props) {
  return (
    <ThemedView style={styles.containerCard}>
      <ThemedView style={styles.containerImg}>
        <Image source={imagenes[item.uri_img]} style={styles.imagen} />
      </ThemedView>
      <ThemedView style={styles.containerDetalle}>
        <ThemedText style={styles.txtNombre}>{item.nombre} </ThemedText>
        <ThemedText>Precio: ${item.precio.toLocaleString("es-AR")} </ThemedText>
        <ThemedView style={styles.filaCant}>
          <ThemedText>
            Cantidad: {item.cantidad.toLocaleString("es-AR")}{" "}
          </ThemedText>
          <ThemedText style={styles.txtPrecio}>
            ${(item.precio * item.cantidad).toLocaleString("es-AR")}{" "}
          </ThemedText>
        </ThemedView>
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
  },
  containerDetalle: {
    justifyContent: "center",
    width: "75%",
  },
  filaCant: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  imagen: {
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
