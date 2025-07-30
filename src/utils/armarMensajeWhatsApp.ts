import { IPedido } from "../types";
import { calculaTotalPedido } from "./calculaTotalPedido";

export const generarMensajeWhatsApp = (pedido: IPedido) => {
  const mensaje = pedido.detalle
    .map(
      (item) =>
        `🍽️ ${item.nombre} x${item.cantidad} - $${(
          item.precio * (item.cantidad ?? 0)
        ).toLocaleString("es-AR")}`
    )
    .join("\n");

  const total = pedido?.montoTotal
    ? pedido.montoTotal.toLocaleString("es-AR")
    : calculaTotalPedido(pedido?.detalle).toLocaleString("es-AR");

  return `🧾 *Pedido de ${pedido.datosEnvio.apellido}, ${pedido.datosEnvio.nombre}* 🧾\n\n${mensaje}\n\n💰 Total: $${total}\n\n📍 Dirección: ${pedido.datosEnvio.domicilio}`;
};
