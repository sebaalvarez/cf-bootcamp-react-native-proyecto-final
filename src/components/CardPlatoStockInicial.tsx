import { imagenes } from "@/src/services/indexImagenes";
import { IPlatos } from "@/src/types/index";
import { router } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { ButtonCustom, ThemedText, ThemedView } from "./ui";

interface Props {
  item: IPlatos;
}

export default function CardPlatoStockInicial({ item }: Props) {
  const handleActualizar = () => {
    router.push({
      pathname: "/actStockInicial",
      params: {
        id: item.id,
        nombre: item.nombre,
        stock_inicial: (item.stock_inicial ?? 0).toString(),
        uri_img: item.uri_img,
      },
    });
  };

  return (
    <ThemedView style={styles.containerCard}>
      <ThemedView style={styles.containerImg}>
        <Image source={imagenes[item.uri_img]} style={styles.imagen} />
      </ThemedView>
      <ThemedView style={styles.containerDetalle}>
        <ThemedView>
          <ThemedText style={styles.txtNombre}>{item.nombre}</ThemedText>
          <ThemedText style={styles.txtStock}>
            Stock actual: {item.stock}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.containerLineaStock}>
          <ThemedText style={styles.txtStock}>
            Stock inicial: {item.stock_inicial ?? 0}
          </ThemedText>
          <ThemedView style={styles.containerBtn}>
            <ButtonCustom name={"Actualizar"} onPress={handleActualizar} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
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
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  containerDetalle: {
    flex: 1,
    gap: 0,
    paddingVertical: 0,
  },
  txtNombre: {
    fontWeight: "bold",
    fontSize: 16,
  },
  containerLineaStock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  txtStock: {
    fontWeight: "600",
    fontSize: 14,
  },

  containerBtn: {
    width: "40%",
  },
});
