import { supabase } from "@/src/config/supabase";

/**
 * Crea el perfil de un usuario en la tabla perfiles
 */
export const createUserProfile = async (
  userId: string,
  nombre: string,
  apellido: string,
  telefono: string,
  mail: string,
  rol: string = "user"
) => {
  try {
    const { error } = await supabase.from("perfiles").insert({
      id: userId,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim(),
      mail: mail.trim(),
      rol,
    });

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (error: any) {
    console.error("Error al crear perfil:", error);
    return {
      error: error.message || "Error al insertar el perfil del usuario",
    };
  }
};

export const updateUser = async (
  id: string,
  nombre: string,
  apellido: string,
  telefono: string
) => {
  try {
    const { error } = await supabase
      .from("perfiles")
      .update([{ nombre, apellido, telefono }])
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("error", error);
  }
};

export const selectOneUser = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error("Error en la consulta:", error);
      throw error;
    }

    if (data && data.length > 0) {
      return data;
    }

    return null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
