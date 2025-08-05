import { supabase } from "../../../config/supabase";

type TKey = "horario_atencion" | "cocina_abierta" | "numero_telefono";

interface IData {
  key: string;
  tipoValor: string;
  valueString: string | null;
  valueBoolean: boolean | null;
  valueNumber: number | null;
}

export const getConfig = async (key: TKey) => {
  try {
    const { data, error }: { data: IData[] | null; error: any } = await supabase
      .from("configuracion")
      .select("*")
      .eq("key", key);

    if (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }

    if (data && data.length > 0) {
      if (data[0].tipoValor === "string") {
        return data[0].valueString ?? "";
      }
      if (data[0].tipoValor === "boolean") {
        return data[0].valueBoolean ?? false;
      }
      if (data[0].tipoValor === "number") {
        return data[0].valueNumber ?? 0;
      }
    }

    return null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

const getTipoReg = async (key: TKey) => {
  try {
    const { data, error }: { data: IData[] | null; error: any } = await supabase
      .from("configuracion")
      .select("*")
      .eq("key", key);

    if (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }

    if (data && data.length > 0) {
      return data[0].tipoValor;
    }

    return null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const updateConfig = async (
  key: TKey,
  value: string | number | boolean
) => {
  let actualizar = {};
  try {
    const tipoValor = await getTipoReg(key);

    if (tipoValor === "string") {
      actualizar = { valueString: value };
    }
    if (tipoValor === "boolean") {
      actualizar = { valueBoolean: value };
    }
    if (tipoValor === "number") {
      actualizar = { valueNumber: value };
    }

    const { error } = await supabase
      .from("configuracion")
      .update([actualizar])
      .eq("key", key)
      .select("*");

    if (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }
  } catch (error) {
    console.error("error", error);
  }
};
