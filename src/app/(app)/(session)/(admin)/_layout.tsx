import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/src/constants/Colors";
import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import "react-native-reanimated";

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
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(actualizacion)"
        options={{
          title: "Actualizaciones",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="02.circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(pedidos)"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="0.circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(perfil)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="01.circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
