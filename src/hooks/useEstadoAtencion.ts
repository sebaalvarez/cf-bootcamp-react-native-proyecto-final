import { useEffect, useState } from "react";
import { listenConfiguracion } from "../services/api/atencionService";

export function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = listenConfiguracion((data) => {
      setConfiguracion(data);
    });

    return () => unsubscribe();
  }, []);

  return configuracion;
}
