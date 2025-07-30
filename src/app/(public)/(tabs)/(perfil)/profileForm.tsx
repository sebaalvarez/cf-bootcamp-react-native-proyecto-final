import { router } from "expo-router";
// import { Alert } from "react-native";
import ProfileForm from "../../../../components/forms/views/ProfileForm";
import { ContainerApp } from "../../../../components/ui";
// import { createUser } from "../../../services/api/supabase/usuarios";
// import { getData } from "../../../services/local/storage";
// import { IUser } from "../../../types";

export default function ProfileFormScreen() {
  const handlerCreateUser = async () => {
    // crea usuario en supabase
    // const dataUser: IUser = await getData("usuario");
    // const user: IUser | null = await createUser(dataUser);
    // if (user) {
    //   Alert.alert("Usuario actualizado", JSON.stringify(user));
    // }

    // const datos1 = await getConfig("horario_atencion");
    // console.log(datos1, "horario_atencion");

    // const datos2 = await getConfig("cocina_abierta");
    // console.log(datos2, "cocina_abierta");

    // const datos3 = await getConfig("numero_telefono");
    // console.log(datos3, "numero_telefono");

    router.back();
  };
  return (
    <ContainerApp scroll>
      <ProfileForm onPress={handlerCreateUser} />
    </ContainerApp>
  );
}
