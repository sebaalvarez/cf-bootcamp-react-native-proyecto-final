import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    // const jsonValue = JSON.stringify(value);
    // console.log(key);
    // console.log(value);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Se produjo un error al guardar la información" + e);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Se produjo un error al guardar la información" + e);
  }
};
