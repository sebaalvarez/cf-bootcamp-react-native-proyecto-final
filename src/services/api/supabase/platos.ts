import { supabase } from "@/src/config/supabase";
import { IPlatos } from "@/src/types";

export const updatePlatoStock = async (id: number, stock: number) => {
  try {
    const { error } = await supabase
      .from("platos")
      .update([{ stock }])
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("error", error);
  }
};

export const updatePlatoPrecio = async (id: number, precio: number) => {
  try {
    const { error } = await supabase
      .from("platos")
      .update([{ precio }])
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("error", error);
  }
};

export const updatePlatoInfo = async (
  id: number,
  nombre: string,
  descripcion: string,
  precio: number
) => {
  try {
    const { error } = await supabase
      .from("platos")
      .update([{ nombre, descripcion, precio }])
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

export const selectAllPlato = async () => {
  try {
    const { data, error }: { data: IPlatos[] | null; error: any } =
      await supabase.from("platos").select("*").order("ordenVisualizacion");

    if (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }

    if (data && data.length > 0) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const selectAllPlatoActivos = async () => {
  try {
    const { data, error }: { data: IPlatos[] | null; error: any } =
      await supabase
        .from("platos")
        .select("*")
        .eq("activo", true)
        .order("ordenVisualizacion");

    if (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }

    if (data && data.length > 0) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const selectOnePlato = async (key: number) => {
  try {
    const { data, error }: { data: IPlatos[] | null; error: any } =
      await supabase.from("platos").select("*").eq("id", key);

    if (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }

    if (data && data.length > 0) {
      return data[0];
    }

    return null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const updateStockPlato = async (id: number, nuevoStock: number) => {
  try {
    const { error } = await supabase
      .from("platos")
      .update([{ stock: nuevoStock }])
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("error", error);
  }
};
