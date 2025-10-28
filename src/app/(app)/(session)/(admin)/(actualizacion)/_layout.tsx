import { CustomHeaderStack } from "@/src/components/ui";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function AdminActLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(config)"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Configuración global"
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
        name="actInfoPlato"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Actualizar Información Platos"
            />
          ),
        }}
      />
      <Stack.Screen
        name="editarPlato"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack navigation={navigation} title="Editar Plato" />
          ),
        }}
      />
    </Stack>
  );
}
