import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { IPedido } from "../../types";

export default async function getEstadoPedido(idPedido: string) {
  try {
    const pedidoRef = doc(db, "pedidos", idPedido);
    const pedidoSnapshot = await getDoc(pedidoRef);

    if (pedidoSnapshot.exists()) {
      const pedidoData = pedidoSnapshot.data() as IPedido;

      if (pedidoData && pedidoData.estado) {
        return pedidoData.estado;
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
