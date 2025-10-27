import { supabase } from "@/src/config/supabase";
import { useDeepLinking } from "@/src/hooks/useDeepLinking";
import {
  getSession,
  signOut as signOutService,
} from "@/src/services/api/supabase";
import { removeData } from "@/src/services/local/storage";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthData = {
  loading: boolean;
  session: Session | null;
  role: string | null;
  name: string | null;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthData>({
  loading: true,
  session: null,
  role: null,
  name: null,
  signOut: async () => {},
});

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  // Hook para manejar deep linking
  useDeepLinking();

  // Obtiene el perfil del usuario, el delay controla la demora cuando se registra un nuevo usuario hasta que se graba la información en la tabla de perfil
  const esperarCargaPerfil = async (userId: string, reintentos = 5) => {
    for (let i = 0; i < reintentos; i++) {
      const { data, error } = await supabase
        .from("perfiles")
        .select("rol,nombre,apellido")
        .eq("id", userId)
        .maybeSingle();

      if (data) {
        setRole(data?.rol);
        setName(data?.apellido + ", " + data?.nombre);
        return;
      }

      if (
        error &&
        error.message !==
          "JSON object requested, multiple (or no) rows returned"
      ) {
        setRole(null);
        return { error };
      }

      await new Promise((res) => setTimeout(res, 300));
    }

    return {
      error: new Error(
        "No se encontró el perfil del usuario después de varios intentos."
      ),
    };
  };

  const fetchSession = async () => {
    const { error, data } = await getSession();

    if (error || !data) {
      console.error("Error al obtener la sesión:", error);
      setLoading(false);
      return;
    }

    if (data.session) {
      setSession(data.session);
      await esperarCargaPerfil(data.session.user.id);
    }
    setLoading(false);
  };

  const signOut = async () => {
    await signOutService();
    setSession(null);
    setRole(null);
    setName(null);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Maneja el evento de cierre de sesión
        if (event === "SIGNED_OUT" || event === "USER_UPDATED") {
          setRole(null);
          setSession(null);
          setName(null);

          // Limpia el storage local
          await removeData("usuario");

          if (event === "USER_UPDATED") {
            // Redirige al login
            router.push("/signIn");
          } else {
            // Redirige al inicio
            router.push("/");
          }

          return;
        }

        // Si es un evento PASSWORD_RECOVERY, no cargar el perfil aún
        if (event === "PASSWORD_RECOVERY") {
          setSession(session);
          setRole(null); // No cargar el rol hasta que se complete el cambio de contraseña
          setName(null);
          setLoading(false);
          return;
        }

        if (session) {
          setSession(session);

          // Intenta cargar el perfil pero no bloquea si falla
          try {
            await Promise.race([
              esperarCargaPerfil(session.user.id),
              new Promise((_, reject) =>
                setTimeout(
                  () => reject(new Error("Timeout al cargar perfil")),
                  3000
                )
              ),
            ]);
          } catch (error) {
            console.log("No se pudo cargar el perfil: ", error);
            setRole(null);
            setName(null);
          }
        } else {
          setSession(null);
          setRole(null);
          setName(null);
        }
        // console.log("Cambio de sesión: ", event);
        // console.log("Sesion: " + session?.user.user_metadata.sub);
        // console.log("Rol: " + role);
        // console.log("Nombre: " + name);
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ loading, session, role, name, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
