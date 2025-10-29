import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/src/constants/Colors";
import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";

export default function AdminLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="inicio" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(actualizacion)"
        options={{
          title: "Actualizaciones",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="update" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(pedidos)"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="lista" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(perfil)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="perfil" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
