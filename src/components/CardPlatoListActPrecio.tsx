import { usePlatos } from "@/src/hooks/usePlatos";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList } from "react-native";
import CardPlatoActInfo from "./CardPlatoActInfo";
import { EsperaCarga } from "./ui";

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
    return <EsperaCarga text="Cargando listado de platos..." />;
  }
  return (
    <FlatList
      data={platos}
      keyExtractor={(item, index) => `plato-precio-${item.id}-${index}`}
      renderItem={({ item }) => <CardPlatoActInfo item={item} />}
    />
  );
}
