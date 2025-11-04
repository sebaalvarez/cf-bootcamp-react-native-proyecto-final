export interface IUser {
  id?: string;
  apellido: string;
  nombre: string;
  telefono: string;
  direccion: string;
  mail?: string;
}

export interface IPlatos {
  id: string;
  uri_img: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad?: number;
  stock: number;
  stock_inicial?: number;
  ordenVisualiza?: number;
  activo?: boolean;
}

export interface IDatosEnvio {
  apellido: string;
  nombre: string;
  domicilio: string;
  telefono: number;
}

export interface IPedido {
  id?: string;
  fecha: string;
  estado:
    | "Solicitado"
    | "Recibido"
    | "En preparación"
    | "En camino"
    | "Entregado";
  montoTotal: number;
  detalle: IPlatos[];
  datosEnvio: IDatosEnvio;
}

export interface IPedidoSupabase extends IDatosEnvio {
  id?: number;
  fecha: string;
  estado:
    | "Solicitado"
    | "Recibido"
    | "En preparación"
    | "En camino"
    | "Entregado";
  montoTotal: number;
  cantidadPlatos: number;
}

export interface IPedidoDetalleSupabase {
  id?: number;
  idPedido: number;
  idPlato: number;
  cantidad: number;
  precio: number;
  platos?: IPlatos;
}

export interface IAppVersion {
  id?: number;
  version: string;
  version_code: number;
  descripcion?: string;
  url_descarga?: string;
  es_obligatoria: boolean;
  fecha_publicacion?: string;
  activa: boolean;
}
