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
        name="actTelefono"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Actualizar Teléfono"
            />
          ),
        }}
      />
      <Stack.Screen
        name="actHorario"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Actualizar Horario"
            />
          ),
        }}
      />
    </Stack>
  );
}
