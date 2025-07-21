import AsyncStorage from "@react-native-async-storage/async-storage";

import { KeyStorage } from "../../constants/KeyStorage";

export const storeData = async (
  key: (typeof KeyStorage)[number],
  value: string
) => {
  try {
    // const jsonValue = JSON.stringify(value);
    // console.log(key);
    // console.log(value);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Se produjo un error al guardar la información" + e);
  }
};

export const getData = async (key: (typeof KeyStorage)[number]) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Se produjo un error al recuperar la información" + e);
  }
};

export const removeData = async (key: (typeof KeyStorage)[number]) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Datos eliminados para la clave: ${key}`);
  } catch (error) {
    console.error(`Error al eliminar los datos para la clave: ${key}`, error);
  }
};
