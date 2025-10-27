import {
  ButtonCustom,
  ContainerApp,
  ThemedText,
  ThemedView,
} from "@/src/components/ui";
import { imagenes } from "@/src/services/indexImagenes";
import { router } from "expo-router";
import { Image, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ContainerApp>
      <ThemedView style={styles.container}>
        <Image source={imagenes["logo"]} style={styles.img} />
        <ThemedText type="subtitle" align="center">
          Ahora podés pedir tu plato favorito desde esta aplicación
        </ThemedText>

        <ButtonCustom
          name="Registrarse"
          width={"80%"}
          onPress={() => router.push("/signUp")}
        />

        <ButtonCustom
          name="Iniciar Sesión"
          width={"80%"}
          onPress={() => router.push("/signIn")}
        />
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
  img: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
});
