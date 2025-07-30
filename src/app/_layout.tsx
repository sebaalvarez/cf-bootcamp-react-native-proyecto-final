import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";
import AuthProvider, { useAuth } from "../context/authProvider";
import { CarritoProvider } from "../context/cartContextProvider";
// import { useAuth } from "../hooks/useAuth";
import { useColorScheme } from "../hooks/useColorScheme";
import { useThemeColor } from "../hooks/useThemeColor";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { loading, session } = useAuth();

  console.log("_layout entrada loading:", loading);
  console.log("_layout entrada sesión:", session);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
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
            {/* <Stack.Screen name="(tabs)" /> */}
            {/* <Stack.Screen name="index" /> */}

            {/* <Stack.Protected guard={!session}> */}
            {/* <Stack.Screen name="index" /> */}
            {/* </Stack.Protected> */}

            {/* <Stack.Protected guard={!!session}>
              <Stack.Screen name="(tabs)" />
            </Stack.Protected> */}

            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </CarritoProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
