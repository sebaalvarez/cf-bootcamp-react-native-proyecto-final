import { useEffect, useState } from "react";
import { listenConfiguracion } from "../services/api/atencionService";

export function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = listenConfiguracion((data) => {
      setConfiguracion(data); // Actualiza el estado con los datos en tiempo real
    });

    // Limpia la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return configuracion;
}
