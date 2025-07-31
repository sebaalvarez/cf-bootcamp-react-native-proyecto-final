import { Stack } from "expo-router";
import "react-native-reanimated";
import { CustomHeaderStack } from "../../../../components/ui";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="actEstadoCocina"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Actualizar Estado Cocina"
            />
          ),
        }}
      />
      <Stack.Screen
        name="actStockPlato"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Actualizar Stock Platos"
            />
          ),
        }}
      />
      <Stack.Screen
        name="PedidosSolicitados"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Pedidos Solicitados"
            />
          ),
        }}
      />
      <Stack.Screen
        name="PedidosRecibidos"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Pedidos Recibidos"
            />
          ),
        }}
      />
    </Stack>
  );
}
