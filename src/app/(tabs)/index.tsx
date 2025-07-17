import { Image, StyleSheet } from "react-native";
import ContainerApp from "../../components/ContainerApp";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { imagenes } from "../../services/indexImagenes";

export default function HomeScreen() {
  return (
    <ContainerApp>
      <ThemedView style={styles.container}>
        <Image source={imagenes["logo"]} style={styles.img} />
        <ThemedText type="title">¡Bienvenido!</ThemedText>
        <ThemedText type="subtitle">Pedí tu plato favorito</ThemedText>
        <ThemedText type="defaultSemiBold">
          Atendemos solamente los Miércoles y Viernes
        </ThemedText>
      </ThemedView>
    </ContainerApp>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
});
