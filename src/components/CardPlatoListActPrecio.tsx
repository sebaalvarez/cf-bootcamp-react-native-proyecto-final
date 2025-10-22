import { usePlatos } from "@/src/hooks/usePlatos";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList } from "react-native";
import CardPlatoActInfo from "./CardPlatoActInfo";
import { EsperaCarga, ThemedText, ThemedView } from "./ui";

export default function CardPlatoListActPrecio() {
  const { platos, isLoading, fetchPlatos } = usePlatos();

  // Refrescar al enfocar la pantalla (cuando se vuelve de editar)
  useFocusEffect(
    useCallback(() => {
      fetchPlatos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

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
      keyExtractor={(item, index) => `plato-precio-${item.id}-${index}`}
      renderItem={({ item }) => <CardPlatoActInfo item={item} />}
    />
  );
}
