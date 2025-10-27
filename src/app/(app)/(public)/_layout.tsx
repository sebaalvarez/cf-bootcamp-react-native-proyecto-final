import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <Pressable
            onPress={() => router.push("/")}
            style={{ paddingLeft: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ title: "Inicio" }} />
      <Stack.Screen name="signUp" options={{ title: "Inicio" }} />
      <Stack.Screen name="recoveryPass" options={{ title: "Inicio" }} />
    </Stack>
  );
}
