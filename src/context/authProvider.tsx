import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../config/supabase";

type AuthData = {
  loading: boolean;
  session: Session | null;
};

const AuthContext = createContext<AuthData>({
  loading: true,
  session: null,
});

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const { error, data } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (data.session) {
        setSession(data.session);
      }
      // console.log("detecto cambio de estado", "getSession");
      // console.log(data.session, "getSession");
      // else {
      //   router.replace("/(tabs)/menu");
      // }

      setLoading(false);
    }
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setLoading(false);

        // console.log("detecto cambio de estado", "listener");
        // console.log(session, "listener");
        // if (session) {
        //   router.replace("/");
        // }
        // else {
        //   router.replace("/(tabs)/menu");
        // }
      }
    );
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loading, session }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
