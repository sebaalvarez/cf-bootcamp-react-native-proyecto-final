import { IPlatos } from "../types";

export default function calculaTotalPedido(
  detalle: IPlatos[] | undefined | null
) {
  const montoTotal = detalle
    ? detalle.reduce((acc, item) => item.precio * item.cantidad + acc, 0)
    : 0;

  return montoTotal;
}
