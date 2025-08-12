import ChangePassForm from "../../../../../components/forms/views/ChangePassForm";
import { ContainerApp } from "../../../../../components/ui";

export default function ProfileFormScreen() {
  // const handlerCreateUser = async () => {
  //   router.back();
  // };
  return (
    <ContainerApp scroll>
      {/* <ChangePassForm onPress={handlerCreateUser} nameButton="Actualizar" /> */}
      <ChangePassForm nameButton="Actualizar" />
    </ContainerApp>
  );
}
