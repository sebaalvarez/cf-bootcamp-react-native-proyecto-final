import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ButtonCustom,
  ContainerApp,
  ThemedText,
  ThemedView,
} from "../../../components/ui";
import {
  getConfig,
  updateConfig,
} from "../../../services/api/supabase/configuracion";

export default function ActEstadoCocina() {
  const [abierto, setAbierto] = useState(true);

  const getEstado = async () => {
    const estado = await getConfig("cocina_abierta");
    setAbierto(!!estado);
  };

  useEffect(() => {
    getEstado();
  }, [abierto]);

  const handlerActEstadoCocina = async () => {
    await updateConfig("cocina_abierta", !abierto);
    setAbierto(!abierto);
    router.back();
  };

  return (
    <ContainerApp scroll>
      <ThemedView>
        <ThemedText>Estado Actual: {abierto}</ThemedText>
        {!abierto && (
          <ThemedText type="subtitle" align="center" style={{ color: "red" }}>
            Cocina cerrada
          </ThemedText>
        )}
        {abierto && (
          <ThemedText type="subtitle" align="center" style={{ color: "green" }}>
            Cocina abierta
          </ThemedText>
        )}
      </ThemedView>
      <ButtonCustom name={"Cambiar estado"} onPress={handlerActEstadoCocina} />
    </ContainerApp>
  );
}
