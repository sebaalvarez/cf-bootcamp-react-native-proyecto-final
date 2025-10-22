import { supabase } from "@/src/config/supabase";
import { IPedidoDetalleSupabase } from "@/src/types";

export const createPedidoDetalle = async (
  idPedido: number,
  idPlato: number,
  cantidad: number,
  precio: number
) => {
  try {
    const { data, error } = await supabase
      .from("pedidos_detalle")
      .insert([{ idPedido, idPlato, cantidad, precio }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const selectOnePedidoDetalle = async (key: number) => {
  try {
    const {
      data,
      error,
    }: { data: IPedidoDetalleSupabase[] | null; error: any } = await supabase
      .from("pedidos_detalle")
      .select("*, platos(nombre, uri_img)")
      .eq("idPedido", key);

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
