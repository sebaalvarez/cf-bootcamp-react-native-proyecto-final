import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

import { useAuth } from "../../context/authProvider";
import { useThemeColor } from "../../hooks/useThemeColor";

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { session } = useAuth();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "Hama",
          headerStyle: { backgroundColor },
          headerTitleStyle: { color: textColor, fontSize: 18 },
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
      <StatusBar style="auto" />
    </>
  );
}
