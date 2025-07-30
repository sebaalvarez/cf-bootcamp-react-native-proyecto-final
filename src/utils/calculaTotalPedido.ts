import { IPlatos } from "../types";

export function calculaTotalPedido(detalle: IPlatos[] | undefined | null) {
  const montoTotal = detalle
    ? detalle.reduce((acc, item) => item.precio * (item.cantidad ?? 0) + acc, 0)
    : 0;

  return montoTotal;
}
