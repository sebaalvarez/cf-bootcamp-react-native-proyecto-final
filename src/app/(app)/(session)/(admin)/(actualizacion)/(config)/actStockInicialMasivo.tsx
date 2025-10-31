import CardPlatoStockInicial from "@/src/components/CardPlatoStockInicial";
import {
  ContainerApp,
  EsperaCarga,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import { getAllPlatosConStockInicial } from "@/src/services/api/supabase/platos";
import { IPlatos } from "@/src/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function ActStockInicialMasivoScreen() {
  const [platos, setPlatos] = useState<IPlatos[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchPlatos = async () => {
        setLoading(true);
        try {
          const data = await getAllPlatosConStockInicial();
          if (isActive) {
            setPlatos(data as IPlatos[]);
          }
        } catch (error) {
          console.error("Error al cargar platos:", error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchPlatos();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (loading) {
    return <EsperaCarga text="Cargando platos..." />;
  }

  if (platos.length === 0) {
    return (
      <ContainerApp>
        <ThemedView style={styles.emptyContainer}>
          <ThemedText>No hay platos disponibles</ThemedText>
        </ThemedView>
      </ContainerApp>
    );
  }

  return (
    <ContainerApp>
      <FlatList
        data={platos}
        renderItem={({ item }) => <CardPlatoStockInicial item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
