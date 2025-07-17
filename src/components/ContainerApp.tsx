import { useThemeColor } from "../hooks/useThemeColor";
import { ReactElement } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

interface Props {
  children: ReactElement | ReactElement[];
  scroll?: boolean;
  lightColor?: string;
  darkColor?: string;
}

export default function ContainerApp({
  children,
  scroll,
  lightColor,
  darkColor,
}: Props) {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      padding: 10,
      height: height,
    },
  });

  if (scroll) {
    return (
      <>
        <ScrollView style={styles.container} overScrollMode="auto">
          <View>{children}</View>
        </ScrollView>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View>{children}</View>
    </View>
  );
}
