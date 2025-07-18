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
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              title: "Hama",
              headerStyle: { backgroundColor },
              headerTitleAlign: "center",
              headerTitleStyle: { color: textColor },
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </CarritoProvider>
    </ThemeProvider>
  );
}
