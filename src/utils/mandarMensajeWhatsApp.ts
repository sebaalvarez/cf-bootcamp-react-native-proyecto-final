import * as Linking from "expo-linking";

export const compartirPorWhatsApp = (mensaje: string) => {
  const url = `https://wa.me/5493875898883?text=${encodeURIComponent(mensaje)}`;
  Linking.openURL(url);
};
