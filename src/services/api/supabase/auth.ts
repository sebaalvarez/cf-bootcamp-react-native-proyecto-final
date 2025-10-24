import { supabase } from "@/src/config/supabase";

/**
 * Servicio de autenticación
 * Centraliza todas las operaciones relacionadas con auth de Supabase
 */

/**
 * Inicia sesión con email y contraseña
 */
export const signInWithPassword = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    // Traducir mensajes comunes de error
    let errorMessage = error.message || "Error al iniciar sesión";

    if (error.message?.includes("Invalid")) {
      errorMessage =
        "Credenciales inválidas. Por favor, verifica tu email y contraseña";
    }

    return { data: null, error: errorMessage };
  }
};

/**
 * Registra un nuevo usuario con metadatos adicionales
 */
export const signUp = async (
  email: string,
  password: string,
  metadata?: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
  }
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: metadata
        ? {
            data: metadata,
          }
        : undefined,
    });

    if (error) {
      throw error;
    }

    if (data) {
      return { data, error: null };
    } else {
      return { data, error: "Error al registrar el usuario" };
    }
  } catch (error: any) {
    // Traducir mensajes comunes de error
    let errorMessage =
      error.message ||
      "Error al registrar usuario, Por favor, intenta nuevamente";

    if (
      error.message?.includes("already registered") ||
      error.message?.includes("already exists")
    ) {
      errorMessage =
        "Este email ya está registrado. Por favor, intenta con otro email o inicia sesión";
    }

    return { data: null, error: errorMessage };
  }
};

/**
 * Cierra la sesión actual
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (error: any) {
    return { error: error.message || "Error al cerrar sesión" };
  }
};

/**
 * Obtiene la sesión actual
 */
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Error al obtener sesión" };
  }
};

/**
 * Verifica si la contraseña actual es correcta
 */
export const verifyCurrentPassword = async (currentPassword: string) => {
  try {
    // Esta función devuelve true o false dependiendo si la contraseña es correcta
    const { data, error } = await supabase.rpc("verify_current_password", {
      current_password: currentPassword,
    });

    if (error) {
      throw error;
    }

    if (data) {
      return { error: null };
    } else {
      return { error: "La contraseña actual es incorrecta" };
    }
  } catch (error: any) {
    // Traducir mensajes comunes de error
    return { error: error.message || "Error al verificar contraseña" };
  }
};

/**
 * Actualiza la contraseña del usuario actual
 */
export const updatePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    // Traducir mensajes comunes de error
    let errorMessage = error.message || "Error al actualizar contraseña";

    if (error.message?.includes("New password should be different")) {
      errorMessage = "La nueva contraseña debe ser diferente a la actual";
    }

    return { data: null, error: errorMessage };
  }
};

/**
 * Envía un email de recuperación de contraseña
 */
export const resetPasswordForEmail = async (
  email: string,
  redirectTo?: string
) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        redirectTo || "hamaapp:///(public)/(tabs)/(mas)/(perfil)/cambioPass",
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "Error al enviar email de recuperación",
    };
  }
};

/**
 * Actualiza el email del usuario actual
 */
export const updateEmail = async (newEmail: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Error al actualizar email" };
  }
};

/**
 * Elimina la cuenta del usuario actual
 * Utiliza una función RPC de Supabase para eliminar todos los datos relacionados
 */
export const deleteUserAccount = async () => {
  try {
    // Llama a la función RPC para eliminar la cuenta
    const { error: rpcError } = await supabase.rpc("delete_user_account");

    if (rpcError) {
      throw rpcError;
    }

    // Cierra la sesión después de eliminar la cuenta
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      throw signOutError;
    }

    return { error: null };
  } catch (error: any) {
    return {
      error: error.message || "Error al eliminar la cuenta",
    };
  }
};
