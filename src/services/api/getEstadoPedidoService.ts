import { IPedidoSupabase } from "@/src/types";
import { selectOnePedido } from "./supabase/pedidos";

export async function getEstadoPedido(idPedido: number) {
  try {
    const pedidoId: IPedidoSupabase | null = await selectOnePedido(idPedido);

    if (pedidoId) {
      if (pedidoId.estado) {
        return pedidoId.estado;
      } else {
        return "No se encontró el estado";
      }
    } else {
      return "Este pedido fue eliminado";
    }
  } catch (error) {
    console.error("Error al consultar el estado del pedido:", error);
    return "";
  }
}
