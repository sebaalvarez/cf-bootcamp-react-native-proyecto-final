import { imagenes } from "@/src/services/indexImagenes";
import { IPlatos } from "@/src/types/index";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import ModalActStockPlato from "./ModalActStockPlato";
import { ButtonCustom, ModalCustom, ThemedText, ThemedView } from "./ui";

interface Props {
  item: IPlatos;
  actualizar: (nuevoValor: boolean) => void;
  estado: boolean;
}

export default function CardPlatoActStock({ item, actualizar, estado }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, [modalOpen]);

  const handleAgregar = () => {
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);

    actualizar(!estado);
  };

  return (
    <>
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
              <ThemedText style={styles.txtPrecio}>
                Stock: {item.stock}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.containerLineaPrecioBtn}>
              <ButtonCustom name={"Actualizar"} onPress={handleAgregar} />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ModalCustom isOpen={modalOpen} onPress={handleCerrarModal}>
        <ModalActStockPlato item={item} onPress={handleCerrarModal} />
      </ModalCustom>
    </>
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
    alignItems: "center",
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
