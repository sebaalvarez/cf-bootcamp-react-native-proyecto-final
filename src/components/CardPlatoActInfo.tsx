import { imagenes } from "@/src/services/indexImagenes";
import { IPlatos } from "@/src/types/index";
import { router } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { ButtonCustom, ThemedText, ThemedView } from "./ui";

interface Props {
  item: IPlatos;
}

export default function CardPlatoActInfo({ item }: Props) {
  const handleActualizar = () => {
    // Navegar a la pantalla de edición pasando todos los datos del plato
    router.push({
      pathname: "/(public)/(tabs)/(admin)/editarPlato",
      params: {
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precio: item.precio.toString(),
        stock: item.stock.toString(),
        uri_img: item.uri_img,
        activo: (item.activo ?? true).toString(),
        ordenVisualiza: (item.ordenVisualiza ?? 0).toString(),
      },
    });
  };

  return (
    <ThemedView style={styles.containerCard}>
      <ThemedView style={styles.containerImg}>
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
              ${item.precio.toLocaleString("es-AR")}
            </ThemedText>
            <ThemedText style={styles.txtStock}>Stock: {item.stock}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.containerLineaPrecioBtn}>
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
    height: 140,
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
  inagen: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  containerDetalle: {
    flex: 1,
    gap: 10,
    paddingVertical: 5,
  },
  txtNombre: {
    fontWeight: "bold",
    fontSize: 16,
  },
  txtDescripcion: {
    fontSize: 12,
  },
  containerLineaPrecio: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  containerLineaPrecioValor: {
    flex: 1,
    gap: 5,
  },
  containerLineaPrecioBtn: {
    flex: 1,
  },
  txtPrecio: {
    fontWeight: "bold",
    fontSize: 18,
  },
  txtStock: {
    fontSize: 12,
    opacity: 0.7,
  },
});
