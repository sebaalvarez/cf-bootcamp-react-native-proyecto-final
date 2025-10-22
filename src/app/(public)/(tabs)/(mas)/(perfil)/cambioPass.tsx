import ChangePassForm from "@/src/components/forms/views/ChangePassForm";
import { ContainerApp } from "@/src/components/ui";

export default function ProfileFormScreen() {
  return (
    <ContainerApp scroll>
      <ChangePassForm nameButton="Actualizar" />
    </ContainerApp>
  );
}
