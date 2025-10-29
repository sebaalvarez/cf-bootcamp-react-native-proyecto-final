import CartCardDetalle from "@/src/components/CartCardDetalle";
import {
  ButtonCustom,
  ContainerApp,
  EsperaCarga,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { getEstadoPedido } from "@/src/services/api/getEstadoPedidoService";
import { getConfig } from "@/src/services/api/supabase/configuracion";
import { getData } from "@/src/services/local/storage";
import { IPedido } from "@/src/types";
import { generarMensajeWhatsApp } from "@/src/utils/armarMensajeWhatsApp";
import { calculaTotalPedido } from "@/src/utils/calculaTotalPedido";
import compartirPorWhatsApp from "@/src/utils/mandarMensajeWhatsApp";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export default function PedidoDetalleScreen({ lightColor, darkColor }: Props) {
  const [pedido, setPedido] = useState<IPedido | null>(null);
  const [estadoAct, setEstadoAct] = useState("");
  const [abierto, setAbierto] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const backgroundColorTitle = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundTitle"
  );

  const getEstado = async () => {
    const estado = await getConfig("cocina_abierta");
    setAbierto(!!estado);
  };

  async function getPedido() {
    const ped = await getData("pedido");
    if (ped?.id) {
      if (typeof ped.id === "number") {
        const estAct = await getEstadoPedido(ped.id);
        setEstadoAct(estAct);
      } else {
        setEstadoAct("");
      }
    } else {
      setEstadoAct("");
    }
    setPedido(ped);
    setLoading(false);
  }

  useEffect(() => {
    getEstado();
    getPedido();
  }, []);

  const mensaje = pedido
    ? generarMensajeWhatsApp(pedido)
    : "pedido no disponible";

  const handlePress = () => {
    if (!pedido) {
      Alert.alert("No se encontró el pedido");
      return;
    }
    compartirPorWhatsApp(mensaje);
  };

  const sumarTotal = pedido?.montoTotal
    ? pedido.montoTotal.toLocaleString("es-AR")
    : calculaTotalPedido(pedido?.detalle).toLocaleString("es-AR");

  if (isLoading) {
    return <EsperaCarga />;
  }

  return (
    <ContainerApp>
      <ThemedView style={styles.container}>
        <ThemedText
          type="subtitle"
          align="center"
          style={{
            backgroundColor: backgroundColorTitle,
          }}
        >
          Datos del Pedido
        </ThemedText>

        <>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Fecha: </ThemedText>
            <ThemedText>{pedido?.fecha}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Estado: </ThemedText>
            <ThemedText>{estadoAct}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Nombre: </ThemedText>
            <ThemedText>
              {pedido?.datosEnvio.apellido}, {pedido?.datosEnvio.nombre}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Teléfono: </ThemedText>
            <ThemedText>{pedido?.datosEnvio.telefono} </ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Dir. entrega: </ThemedText>
            <ThemedText>{pedido?.datosEnvio.domicilio}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.linea}>
            <ThemedText type="defaultSemiBold">Total: $</ThemedText>
            <ThemedText>{sumarTotal}</ThemedText>
          </ThemedView>

          <ThemedText
            type="subtitle"
            align="center"
            style={{ backgroundColor: backgroundColorTitle }}
          >
            Detalle
          </ThemedText>
          <FlatList
            data={pedido?.detalle}
            keyExtractor={(item, index) => `plato-${item.id}-${index}`}
            renderItem={({ item }) => <CartCardDetalle item={item} />}
          />
          <ButtonCustom
            name={"Mandar por WhatsApp"}
            onPress={handlePress}
            props={{
              disabled: !abierto || !pedido,
              style: { marginTop: 10 },
            }}
          />
        </>
      </ThemedView>
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  container: { height: "94%" },
  linea: {
    flexDirection: "row",
  },
  lineaGral: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
