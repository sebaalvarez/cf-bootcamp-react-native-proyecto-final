import { supabase } from "../../../config/supabase";

// export const createUser = async ({ nombre, apellido, telefono }: IUser) => {
//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .insert([{ name: nombre, lastName: apellido, phone_number: telefono }])
//       .select("*");

//     if (error) {
//       throw error;
//     }

//     return data[0];
//   } catch (error) {
//     console.error("error", error);
//     return null;
//   }
// };

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
