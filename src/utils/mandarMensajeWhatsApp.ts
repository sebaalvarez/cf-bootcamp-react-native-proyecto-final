import * as Linking from "expo-linking";
import { getConfig } from "../services/api/supabase/configuracion";

export default async function compartirPorWhatsApp(mensaje: string) {
  const numWhatsapp = await getConfig("numero_telefono");

  const url = `https://wa.me/${numWhatsapp}?text=${encodeURIComponent(
    mensaje
  )}`;

  Linking.openURL(url);
}
