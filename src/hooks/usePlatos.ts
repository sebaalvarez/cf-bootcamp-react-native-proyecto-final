import { useEffect, useState } from "react";
import { getPlatos } from "../services/api/platosService";
import { IPlatos } from "../types";

export function usePlatos() {
  const [platos, setPlatos] = useState<IPlatos[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlatos = async () => {
    setIsLoading(true);
    const lista = await getPlatos();
    setPlatos(lista);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlatos();
  }, []);

  return { platos, isLoading, fetchPlatos };
}
