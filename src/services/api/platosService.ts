import { IPlatos } from "@/src/types";
import { selectAllPlatoActivos } from "./supabase/platos";

export const getPlatos = async (): Promise<IPlatos[]> => {
  try {
    const lista = await selectAllPlatoActivos();
    if (lista === null) {
      return [];
    }

    return lista;
  } catch (error) {
    console.error("Error al obtener los platos:", error);
    return [];
  }
};
