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
        name="cambioPass"
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <CustomHeaderStack
              navigation={navigation}
              title="Cambio Contraseña"
            />
          ),
        }}
      />
    </Stack>
  );
}
