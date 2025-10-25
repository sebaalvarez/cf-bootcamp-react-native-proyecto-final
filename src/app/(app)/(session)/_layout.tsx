import { ThemedView } from "@/src/components/ui";
import { useAuth } from "@/src/hooks/useAuth";

import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function TabLayout() {
  const { session, role } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [role]);

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!!session && role === "admin"}>
          <Stack.Screen name="(admin)" />
        </Stack.Protected>

        <Stack.Protected guard={!!session && role !== "admin"}>
          <Stack.Screen name="(user)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
