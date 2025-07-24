import { Stack } from "expo-router";
import "react-native-reanimated";
import { CustomHeaderStack } from "../../../components/ui";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="profileForm"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Datos Personales"
            />
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
