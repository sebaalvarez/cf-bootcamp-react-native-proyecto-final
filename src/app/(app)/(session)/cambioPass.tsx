import ChangePassForm from "@/src/components/forms/views/ChangePassForm";
import { ContainerApp } from "@/src/components/ui";

export default function CambioPassScreen() {
  return (
    <ContainerApp scroll>
      <ChangePassForm nameButton="Actualizar" />
    </ContainerApp>
  );
}
