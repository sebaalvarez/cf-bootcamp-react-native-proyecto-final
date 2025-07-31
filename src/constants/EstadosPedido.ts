// Definición de los posibles estados por los que pasa un pedido

export const EstadosPedido = {
  SOLICITADO: "Solicitado",
  RECIBIDO: "Recibido",
  EN_PROCESO: "En proceso",
  EN_PREPARACION: "En preparación",
  EN_CAMINO: "En camino",
  ENTREGADO: "Entregado",
} as const;

export type EstadosPedidoType =
  (typeof EstadosPedido)[keyof typeof EstadosPedido];
