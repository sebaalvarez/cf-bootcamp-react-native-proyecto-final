import { useEffect, useState } from "react";
import { getPlatosSnapshot } from "../services/api/platosService";
import { IPlatos } from "../types";

export function usePlatos() {
  const [platos, setPlatos] = useState<IPlatos[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPlatosSnapshot((lista) => {
      setPlatos(lista);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { platos, isLoading };
}
