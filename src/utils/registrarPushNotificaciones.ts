import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("No se pudo obtener permiso para las notificaciones!");
      return;
    }

    console.log("antes de obtener token");

    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Push token:", token);
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }

    return token;
  } else {
    alert("Debe usarse en un dispositivo físico");
  }
}
