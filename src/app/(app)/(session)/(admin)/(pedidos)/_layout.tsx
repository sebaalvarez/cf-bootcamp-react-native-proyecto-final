import { CustomHeaderStack } from "@/src/components/ui";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
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
      <Stack.Screen
        name="PedidosEntregados"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Pedidos Entregados"
            />
          ),
        }}
      />
    </Stack>
  );
}
