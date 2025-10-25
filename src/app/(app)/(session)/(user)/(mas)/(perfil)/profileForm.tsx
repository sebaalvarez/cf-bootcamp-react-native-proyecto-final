import { router } from "expo-router";
import ProfileForm from "@/src/components/forms/views/ProfileForm";
import { ContainerApp } from "@/src/components/ui";

export default function ProfileFormScreen() {
  const handlerCreateUser = async () => {
    router.back();
  };
  return (
    <ContainerApp scroll>
      <ProfileForm onPress={handlerCreateUser} nameButton="Actualizar" />
    </ContainerApp>
  );
}
