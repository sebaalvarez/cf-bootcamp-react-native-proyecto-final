/**
 * Punto de entrada centralizado para todos los servicios de Supabase
 * Permite cambiar fácilmente el backend sin modificar el código de los componentes
 */

// Servicios de autenticación
export * from "./auth";

// Servicios de usuarios/perfiles
export * from "./usuarios";

// Servicios de platos
export * from "./platos";

// Servicios de pedidos
export * from "./pedidos";
export * from "./pedidosDetalle";

// Servicios de configuración
export * from "./configuracion";
