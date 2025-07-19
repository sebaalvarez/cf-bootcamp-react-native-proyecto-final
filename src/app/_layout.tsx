import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";
import { CarritoProvider } from "../context/cartContextProvider";
import { useColorScheme } from "../hooks/useColorScheme";
import { useThemeColor } from "../hooks/useThemeColor";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CarritoProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitle: "Hama",
            headerStyle: { backgroundColor },
            headerTitleStyle: { color: textColor, fontSize: 18 },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="pedidoDetalle" />
        </Stack>
        <StatusBar style="auto" />
      </CarritoProvider>
    </ThemeProvider>
  );
}
