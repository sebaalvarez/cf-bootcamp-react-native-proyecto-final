import { useAuth } from "@/src/hooks/useAuth";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

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
          <Stack.Screen name="(public)" />
        </Stack.Protected>

        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(session)" />
        </Stack.Protected>
      </Stack>
      <StatusBar style="dark" translucent={false} />
    </>
  );
}
