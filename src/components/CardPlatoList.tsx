import { usePlatos } from "@/src/hooks/usePlatos";
import { getConfig } from "@/src/services/api/supabase/configuracion";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import CardPlato from "./CardPlato";
import { EsperaCarga, ThemedText, ThemedView } from "./ui";

export default function CardPlatoList() {
  const { platos, isLoading, fetchPlatos } = usePlatos();
  const [abierto, setAbierto] = useState(true);

  const getEstado = async () => {
    const estado = await getConfig("cocina_abierta");
    setAbierto(!!estado);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPlatos();
      getEstado();
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
      keyExtractor={(item, index) => `plato-${item.id}-${index}`}
      renderItem={({ item }) => (
        <CardPlato item={item} pedidos_habilitados={abierto} />
      )}
    />
  );
}
