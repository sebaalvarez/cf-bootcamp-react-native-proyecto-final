import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { IPlatos } from "../../types";

export const getPlatosSnapshot = (callback: (platos: IPlatos[]) => void) => {
  const unsubscribe = onSnapshot(collection(db, "platos"), (snapshot) => {
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
    callback(lista);
  });

  return unsubscribe;
};
