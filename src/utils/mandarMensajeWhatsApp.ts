import * as Linking from "expo-linking";
import getNumeroWhatsapp from "../services/api/getNumeroWhatsAppService";

export default async function compartirPorWhatsApp(mensaje: string) {
  const numWhatsapp = await getNumeroWhatsapp();

  const url = `https://wa.me/${numWhatsapp}?text=${encodeURIComponent(
    mensaje
  )}`;

  Linking.openURL(url);
}
