import { CustomHeaderStack } from "@/src/components/ui";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(perfil)"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack navigation={navigation} title="Mi Perfil" />
          ),
        }}
      />
      <Stack.Screen
        name="pedidoUltimo"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack navigation={navigation} title="Ultimo Pedido" />
          ),
        }}
      />
      <Stack.Screen
        name="pedidoHistorial"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Historial de Pedidos"
            />
          ),
        }}
      />
    </Stack>
  );
}
