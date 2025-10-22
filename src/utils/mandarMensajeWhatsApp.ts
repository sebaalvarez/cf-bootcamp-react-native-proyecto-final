import { getConfig } from "@/src/services/api/supabase/configuracion";
import * as Linking from "expo-linking";

export default async function compartirPorWhatsApp(mensaje: string) {
  const numWhatsapp = await getConfig("numero_telefono");

  const url = `https://wa.me/${numWhatsapp}?text=${encodeURIComponent(
    mensaje
  )}`;

  Linking.openURL(url);
}
