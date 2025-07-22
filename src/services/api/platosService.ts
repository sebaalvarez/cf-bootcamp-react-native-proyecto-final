import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { IPlatos } from "../../types";

export const getPlatos = async (): Promise<IPlatos[]> => {
  try {
    const snapshot = await getDocs(collection(db, "platos"));
    const lista = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        uri_img: data.uri_img || "",
        nombre: data.nombre || "Sin nombre",
        descripcion: data.descripcion || "Sin descripción",
        precio: data.precio || 0,
        cantidad: data.cantidad || 0,
        stock: data.stock || 0,
      } as IPlatos;
    });
    return lista;
  } catch (error) {
    console.error("Error al obtener los platos:", error);
    return [];
  }
};
