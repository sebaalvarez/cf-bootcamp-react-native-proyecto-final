export interface IPlatos {
  id: string;
  uri_img: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  stock: number;
}

export interface IDatosEnvio {
  apellido: string;
  nombre: string;
  domicilio: string;
  telefono: number;
}

export interface IPedido {
  fecha: string;
  estado:
    | "Solicitado"
    | "Recibido"
    | "En preparación"
    | "En camino"
    | "Entregado";
  detalle: IPlatos[];
  datosEnvio: IDatosEnvio;
}
