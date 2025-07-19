import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { usePlatos } from "../hooks/usePlatos";
import CardPlato from "./CardPlato";
import { ThemedView } from "./ThemedView";

export default function Menu() {
  const { platos, isLoading } = usePlatos();

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
      renderItem={({ item }) => <CardPlato item={item} />}
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
