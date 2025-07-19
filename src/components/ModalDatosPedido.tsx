import { Alert, StyleSheet } from "react-native";
import { useCarrito } from "../context/cartContextProvider";
import { getData, storeData } from "../services/local/storage";
import { IPedido } from "../types";
import ProfileForm from "./forms/views/ProfileForm";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

import {
  collection,
  doc,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebaseConfig";

interface Props {
  onPress?: () => void;
}

export default function ModalDatosPedido({ onPress }: Props) {
  const { state, dispatch } = useCarrito();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePedido = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const datosEnvio = await getData("usuario");
      const detalle = state.carrito;

      if (!datosEnvio || !Array.isArray(detalle)) {
        Alert.alert("Error", "Datos inválidos para crear el pedido");
        setIsProcessing(false);
        onPress?.();
        return;
      }

      // Verificar el stock de los platos
      for (const plato of detalle) {
        const platoRef = doc(db, "platos", plato.id);
        const platoSnapshot = await getDoc(platoRef);

        if (!platoSnapshot.exists()) {
          Alert.alert(
            "Error",
            `El plato ${plato.nombre} no existe en el sistema`
          );
          setIsProcessing(false);
          onPress?.();
          return;
        }

        const platoData = platoSnapshot.data();
        if (platoData.stock < plato.cantidad) {
          Alert.alert(
            "Error",
            `No hay suficiente stock para el plato ${plato.nombre}. Stock disponible: ${platoData.stock}`
          );
          setIsProcessing(false);
          onPress?.();
          return;
        }
      }

      const jsonPedido: IPedido = {
        fecha: new Date().toLocaleString(),
        datosEnvio,
        detalle,
      };

      await storeData("pedido", JSON.stringify(jsonPedido));

      // Registrar el pedido en la colección "pedidos"
      const pedidoRef = doc(collection(db, "pedidos"));
      await setDoc(pedidoRef, jsonPedido);

      const batch = writeBatch(db);
      for (const plato of detalle) {
        const platoRef = doc(db, "platos", plato.id);
        const platoSnapshot = await getDoc(platoRef);

        if (platoSnapshot.exists()) {
          const platoData = platoSnapshot.data();
          const nuevoStock = platoData.stock - plato.cantidad;

          batch.update(platoRef, { stock: nuevoStock });
        }
      }

      await batch.commit();

      dispatch({
        type: "VACIAR_CARRITO",
      });
      Alert.alert("Exito", "Tu pedido fue enviado");
      onPress?.();
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      Alert.alert(
        "Error",
        "Ocurrió un problema al procesar tu pedido. Inténtalo nuevamente."
      );
      onPress?.();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ThemedView style={styles.containerModal}>
      <ThemedView style={styles.containerDet}>
        <ThemedText type="subtitle"> Datos para el envío</ThemedText>
        <ProfileForm onPress={handlePedido} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    height: "auto",
    borderRadius: 20,
  },

  containerDet: {
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
});
