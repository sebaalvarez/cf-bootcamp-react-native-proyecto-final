import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { removeData } from "../services/local/storage";

type AuthData = {
  loading: boolean;
  session: Session | null;
  role: string | null;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthData>({
  loading: true,
  session: null,
  role: null,
  signOut: async () => {},
});

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Obtiene el perfil del usuario, se tuvo que agregar un delay debido a que cuando se registra un nuevo usuario hay un tiempo de demora hasta que se graba la información en la tabla de perfil
  const esperarCargaPerfil = async (userId: string, reintentos = 5) => {
    for (let i = 0; i < reintentos; i++) {
      const { data, error } = await supabase
        .from("perfiles")
        .select("rol")
        .eq("id", userId)
        .maybeSingle();

      if (data) {
        setRole(data?.rol || null);
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
    const { error, data } = await supabase.auth.getSession();

    if (error) {
      console.error("Error al obtener la sesión:", error.message);
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
    await supabase.auth.signOut();
    setSession(null);
    setRole(null);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Cambio de sesión: ", event);

        if (event === "INITIAL_SESSION") {
          console.log("Sesion: " + session?.user.user_metadata.sub);
          console.log("Rol: " + role);
        }

        // Maneja el evento de cierre de sesión o actualización de usuario
        if (event === "SIGNED_OUT" || event === "USER_UPDATED") {
          setRole(null);
          setSession(null);

          // Limpia el storage local
          await removeData("usuario");

          // Redirige al login
          router.replace("/signIn");
          return;
        }

        if (session) {
          setSession(session);
          await esperarCargaPerfil(session.user.id);
        } else {
          setSession(null);
          setRole(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loading, session, role, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
