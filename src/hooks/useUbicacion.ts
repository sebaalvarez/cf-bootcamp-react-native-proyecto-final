import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const useUbicacion = () => {
  const [direccion, setDireccion] = useState("");
  const [coordenadas, setCoordenadas] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError(
          "Permiso denegado para acceder a la ubicación actual, activalo para obtener la dirección de entrega de manera automática."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCoordenadas({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      const [reverseGeocoded] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocoded) {
        const dir = `${reverseGeocoded.street || ""} ${
          reverseGeocoded.name || ""
        }, ${reverseGeocoded.city || ""}`;
        setDireccion(dir.trim());
      }
    })();
  }, []);

  return { direccion, coordenadas, error };
};
