import { supabase } from "@/src/config/supabase";
import { IAppVersion } from "@/src/types";

export const getVersionActiva = async (): Promise<IAppVersion | null> => {
  try {
    const { data, error } = await supabase
      .from("app_version")
      .select("*")
      .eq("activa", true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener versión activa:", error);
    return null;
  }
};

export const verificarActualizacion = async (
  versionCodeActual: number
): Promise<{
  hayActualizacion: boolean;
  esObligatoria: boolean;
  versionNueva?: IAppVersion;
}> => {
  try {
    const versionActiva = await getVersionActiva();

    if (!versionActiva) {
      return { hayActualizacion: false, esObligatoria: false };
    }

    const hayActualizacion = versionActiva.version_code > versionCodeActual;

    return {
      hayActualizacion,
      esObligatoria: hayActualizacion && versionActiva.es_obligatoria,
      versionNueva: hayActualizacion ? versionActiva : undefined,
    };
  } catch (error) {
    console.error("Error al verificar actualización:", error);
    return { hayActualizacion: false, esObligatoria: false };
  }
};
