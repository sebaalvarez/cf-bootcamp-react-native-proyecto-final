import { supabase } from "@/src/config/supabase";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Linking } from "react-native";

export function useDeepLinking() {
  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      // console.log("Deep link recibido:", url);

      // Extrae los parámetros del hash fragment y query string
      const params = extractHashParams(url);
      // console.log("Parámetros extraídos:", params);

      // Verificar si hay un error en el deep link (ej: token expirado)
      if (params.error) {
        // console.error("Error en deep link:", params.error_description || params.error);

        let errorMessage = "Hubo un problema con el enlace de recuperación.";

        if (params.error_code === "otp_expired") {
          errorMessage =
            "El enlace de recuperación ha expirado. Por favor, solicita uno nuevo.";
        } else if (params.error === "access_denied") {
          errorMessage = "Acceso denegado. El enlace no es válido.";
        }

        Alert.alert("Error", errorMessage);
        router.replace("/signIn");
        return;
      }

      // PRIORIDAD 1: Si el URL viene con access_token y refresh_token en el hash fragment
      // (este es el flujo recomendado de Supabase después de verificación)
      if (
        params.type === "recovery" &&
        params.access_token &&
        params.refresh_token
      ) {
        try {
          // Establece la sesión con los tokens recibidos
          const { error } = await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          });

          if (error) {
            console.error("Error al establecer la sesión:", error);
            Alert.alert(
              "Error",
              "No se pudo establecer la sesión. Por favor, solicita un nuevo enlace."
            );
            router.replace("/signIn");
            return;
          }

          // Redirige a la pantalla de reseteo de contraseña
          router.replace("/reset-password");
        } catch (err) {
          console.error("Error al procesar el deep link:", err);
          Alert.alert(
            "Error",
            "Hubo un problema al procesar el enlace. Por favor, intenta nuevamente."
          );
          router.replace("/signIn");
        }
        return;
      }

      // PRIORIDAD 2: Si el URL viene de Supabase con el token en el query string
      // (fallback para deep links directos con token)
      if (params.token && params.type === "recovery") {
        try {
          // Verifica el token con Supabase usando token_hash
          const { error } = await supabase.auth.verifyOtp({
            token_hash: params.token,
            type: "recovery",
          });

          if (error) {
            console.error("Error al verificar el token:", error);
            Alert.alert(
              "Error",
              "No se pudo verificar el token de recuperación. Por favor, solicita un nuevo enlace."
            );
            router.replace("/signIn");
            return;
          }

          Alert.alert(
            "Sesión verificada",
            "Ahora puedes establecer tu nueva contraseña."
          );

          // Redirige a la pantalla de reseteo de contraseña
          router.replace("/reset-password");
        } catch (err) {
          console.error("Error al procesar el token:", err);
          Alert.alert(
            "Error",
            "Hubo un problema al procesar el enlace. Por favor, intenta nuevamente."
          );
          router.replace("/signIn");
        }
        return;
      }
    };

    const extractHashParams = (url: string): Record<string, string> => {
      const params: Record<string, string> = {};

      // Intenta extraer parámetros del hash fragment (#...)
      const hashIndex = url.indexOf("#");
      if (hashIndex !== -1) {
        const hashString = url.substring(hashIndex + 1);
        const pairs = hashString.split("&");

        pairs.forEach((pair) => {
          const [key, value] = pair.split("=");
          if (key && value) {
            params[key] = decodeURIComponent(value);
          }
        });
      }

      // También intenta extraer parámetros de query string (?...)
      // Esto es necesario cuando Supabase redirige primero a su URL de verificación
      const queryIndex = url.indexOf("?");
      if (queryIndex !== -1) {
        const queryString = url.substring(queryIndex + 1);
        // Separar el query string del posible hash
        const queryOnly = queryString.split("#")[0];
        const pairs = queryOnly.split("&");

        pairs.forEach((pair) => {
          const [key, value] = pair.split("=");
          if (key && value) {
            params[key] = decodeURIComponent(value);
          }
        });
      }

      return params;
    };

    // Maneja el URL inicial cuando se abre la app
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleDeepLink(url);
      }
    };

    // Escucha cambios de URL mientras la app está abierta
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    handleInitialURL();

    return () => {
      subscription.remove();
    };
  }, []);
}
