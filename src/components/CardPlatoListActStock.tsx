import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { usePlatos } from "../hooks/usePlatos";
import CardPlatoActStock from "./CardPlatoActStock";
import { EsperaCarga, ThemedText, ThemedView } from "./ui";

export default function CardPlatoListActStock() {
  const { platos, isLoading, fetchPlatos } = usePlatos();
  const [actList, setActList] = useState(false);

  useEffect(() => {
    fetchPlatos();
  }, [actList]);

  if (isLoading) {
    return (
      <ThemedView style={{ marginTop: 40, gap: 30 }}>
        <EsperaCarga />
        <ThemedText type="defaultSemiBold" align="center">
          Cargando listado de platos...
        </ThemedText>
      </ThemedView>
    );
  }
  return (
    <FlatList
      data={platos}
      keyExtractor={(item, index) => `plato-${item.id}-${index}`}
      renderItem={({ item }) => (
        <CardPlatoActStock
          item={item}
          actualizar={setActList}
          estado={actList}
        />
      )}
    />
  );
}
