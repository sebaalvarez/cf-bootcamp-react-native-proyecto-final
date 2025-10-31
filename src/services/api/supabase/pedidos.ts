import { supabase } from "@/src/config/supabase";
import { IPedidoSupabase } from "@/src/types";

export const createPedido = async ({
  nombre,
  apellido,
  telefono,
  domicilio,
  fecha,
  estado,
  montoTotal,
  cantidadPlatos,
}: IPedidoSupabase) => {
  try {
    const { data, error } = await supabase
      .from("pedidos")
      .insert([
        {
          nombre,
          apellido,
          telefono,
          domicilio,
          fecha,
          estado,
          montoTotal,
          cantidadPlatos,
        },
      ])
      .select("*");

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const selectOnePedido = async (key: number) => {
  try {
    const { data, error }: { data: IPedidoSupabase[] | null; error: any } =
      await supabase.from("pedidos").select("*").eq("id", key);

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

export const selectAllPedidosSolicitados = async () => {
  try {
    const { data, error }: { data: IPedidoSupabase[] | null; error: any } =
      await supabase
        .from("pedidos")
        .select("*")
        .eq("estado", "Solicitado")
        .order("created_at", { ascending: true });

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

export const selectAllPedidosRecibidos = async () => {
  try {
    const { data, error }: { data: IPedidoSupabase[] | null; error: any } =
      await supabase
        .from("pedidos")
        .select("*")
        .eq("estado", "Recibido")
        .order("created_at", { ascending: true });

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

export const selectAllPedidosPorEstado = async (estado: string) => {
  try {
    const { data, error }: { data: IPedidoSupabase[] | null; error: any } =
      await supabase
        .from("pedidos")
        .select("*")
        .eq("estado", estado)
        .order("created_at", { ascending: true });

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

export const updateEstadoPedido = async (id: number, nuevoEstado: string) => {
  try {
    const { error } = await supabase
      .from("pedidos")
      .update([{ estado: nuevoEstado }])
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("error", error);
  }
};
