import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

import { useAuth } from "@/src/hooks/useAuth";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, "backgroundHeader");
  const textColor = useThemeColor({}, "text");
  const { session } = useAuth();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,

          headerTitle: "Hama - Comida Arabe",
          headerStyle: { backgroundColor },
          headerTitleStyle: { color: textColor, fontSize: 20, fontWeight: 500 },
          headerShadowVisible: false,

          headerTitleAlign: "center",
        }}
      >
        <Stack.Protected guard={!session}>
          <Stack.Screen name="index" />
        </Stack.Protected>

        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" translucent={false} />
    </>
  );
}
