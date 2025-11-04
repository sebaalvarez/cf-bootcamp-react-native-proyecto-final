import { VersionChecker } from "@/src/components/VersionChecker";
import AuthProvider from "@/src/context/authProvider";
import { CarritoProvider } from "@/src/context/cartContextProvider";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <VersionChecker>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <CarritoProvider>
            <Slot />
          </CarritoProvider>
        </ThemeProvider>
      </AuthProvider>
    </VersionChecker>
  );
}
