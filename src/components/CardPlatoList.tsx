import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useConfiguracion } from "../hooks/useEstadoAtencion";
import { usePlatos } from "../hooks/usePlatos";
import CardPlato from "./CardPlato";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function Menu() {
  const { platos, isLoading } = usePlatos();

  const configuracion = useConfiguracion();

  if (!configuracion) {
    return (
      <ThemedView>
        <ThemedText>Cargando configuración...</ThemedText>
      </ThemedView>
    );
  }

  const { pedidos_habilitados } = configuracion;

  if (isLoading) {
    return (
      <ThemedView style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }
  return (
    <FlatList
      data={platos}
      keyExtractor={(item, index) => `plato-${item.id}-${index}`}
      renderItem={({ item }) => (
        <CardPlato item={item} pedidos_habilitados={pedidos_habilitados} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
