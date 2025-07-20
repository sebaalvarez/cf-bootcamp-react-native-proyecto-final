import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export const listenConfiguracion = (callback: (data: any) => void) => {
  const docRef = doc(db, "configuracion", "cocina_abierta");

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};
