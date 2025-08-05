import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

type AuthData = {
  loading: boolean;
  session: Session | null;
  role: string | null;
};

export const AuthContext = createContext<AuthData>({
  loading: true,
  session: null,
  role: null,
});

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const { error, data } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al obtener la sesión:", error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        setSession(data.session);
        await fetchUserRole(data.session.user.id);
      }
      setLoading(false);
    }

    async function fetchUserRole(userId: string) {
      const { data, error } = await supabase
        .from("perfiles")
        .select("rol")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error al obtener el rol del usuario:", error.message);
        setRole(null);
      } else {
        setRole(data?.rol || null);
      }
    }
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        if (session) {
          await fetchUserRole(session.user.id);
        } else {
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
    <AuthContext.Provider value={{ loading, session, role }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
