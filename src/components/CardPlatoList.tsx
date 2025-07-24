import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList } from "react-native";
import { useConfiguracion } from "../hooks/useEstadoAtencion";
import { usePlatos } from "../hooks/usePlatos";
import CardPlato from "./CardPlato";
import { EsperaCarga, ThemedText, ThemedView } from "./ui";

export default function CardPlatoList() {
  const { platos, isLoading, fetchPlatos } = usePlatos();
  const configuracion = useConfiguracion();

  useFocusEffect(
    useCallback(() => {
      fetchPlatos();
    }, [])
  );

  if (!configuracion) {
    return <EsperaCarga text={"Cargando configuración..."} />;
  }

  const { pedidos_habilitados } = configuracion;

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
        <CardPlato item={item} pedidos_habilitados={pedidos_habilitados} />
      )}
    />
  );
}
