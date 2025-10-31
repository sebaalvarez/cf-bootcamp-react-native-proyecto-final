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

// Funciones para actualización masiva de stock inicial
export const getAllPlatosConStockInicial = async () => {
  try {
    const { data, error } = await supabase
      .from("platos")
      .select("id, nombre, uri_img, stock, stock_inicial")
      .order("ordenVisualizacion");

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("error getAllPlatosConStockInicial:", error);
    return [];
  }
};

export const updateStockInicial = async (id: number, stockInicial: number) => {
  try {
    const { error } = await supabase
      .from("platos")
      .update({ stock_inicial: stockInicial })
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("error updateStockInicial:", error);
    return { success: false, error };
  }
};

export const actualizarStockMasivo = async () => {
  try {
    // Obtener todos los platos
    const { data: platos, error: fetchError } = await supabase
      .from("platos")
      .select("id, stock_inicial");

    if (fetchError) throw fetchError;
    if (!platos || platos.length === 0) {
      return { success: false, message: "No hay platos para actualizar" };
    }

    // Actualizar el stock de cada plato individualmente
    let successCount = 0;
    let errorCount = 0;

    for (const plato of platos) {
      const { error } = await supabase
        .from("platos")
        .update({ stock: plato.stock_inicial ?? 0 })
        .eq("id", plato.id);

      if (error) {
        console.error(`Error al actualizar plato ${plato.id}:`, error);
        errorCount++;
      } else {
        successCount++;
      }
    }

    if (errorCount > 0) {
      return {
        success: false,
        message: `Se actualizaron ${successCount} platos, pero ${errorCount} fallaron`,
      };
    }

    return {
      success: true,
      message: `Se actualizaron ${successCount} platos correctamente`,
    };
  } catch (error) {
    console.error("error actualizarStockMasivo:", error);
    return {
      success: false,
      error,
      message: "Error al actualizar el stock masivamente",
    };
  }
};
