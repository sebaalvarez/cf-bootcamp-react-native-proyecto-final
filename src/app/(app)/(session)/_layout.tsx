import { CustomHeaderStack, EsperaCarga } from "@/src/components/ui";
import { useAuth } from "@/src/hooks/useAuth";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const { role } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [role]);

  if (loading) {
    return <EsperaCarga text="Iniciando" />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={role === "admin"}>
          <Stack.Screen name="(admin)" />
        </Stack.Protected>

        <Stack.Protected guard={role === "user"}>
          <Stack.Screen name="(user)" />
        </Stack.Protected>

        <Stack.Screen name="resetPass" options={{ headerShown: false }} />
        <Stack.Screen
          name="cambioPass"
          options={{
            headerShown: true,
            header: ({ navigation }) => (
              <CustomHeaderStack
                navigation={navigation}
                title="Cambio Contraseña"
              />
            ),
          }}
        />
        <Stack.Screen
          name="profileForm"
          options={{
            headerShown: true,
            header: ({ navigation }) => (
              <CustomHeaderStack
                navigation={navigation}
                title="Datos Personales"
              />
            ),
          }}
        />
      </Stack>
    </>
  );
}
