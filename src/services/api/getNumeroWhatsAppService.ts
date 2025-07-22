import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default async function getNumeroWhatsapp() {
  try {
    const registroRef = doc(db, "configuracion", "telefono_whatsapp");
    const registroSnapshot = await getDoc(registroRef);

    if (registroSnapshot.exists()) {
      const registroData = registroSnapshot.data();

      if (registroData && registroData.numero) {
        return registroData.numero;
      } else {
        console.error("No se encontró el número de teléfono");
        return null;
      }
    } else {
      console.error("No se encontró el número de teléfono");
    }
  } catch (error) {
    console.error("Error al consultar el numero de teléfono:", error);
    return null;
  }
}
