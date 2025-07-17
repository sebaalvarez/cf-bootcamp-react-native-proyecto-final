import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
  DimensionValue,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props {
  name: string;
  lightColor?: string;
  darkColor?: string;
  height?: string | number;
  width?: string | number;
  onPress?: () => void;
  props?: TouchableOpacityProps;
}

export default function ButtonCustom({
  name,
  lightColor,
  darkColor,
  height,
  width,
  onPress,
  props,
}: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundBtn"
  );
  const backgroundColorDisabled = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundBtnDisabled"
  );
  const borderBtnColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "borderBtnColor"
  );

  const getValidWidth = (w: unknown): DimensionValue => {
    if (typeof w === "number") return w;
    if (typeof w === "string" && w.trim().endsWith("%"))
      return w as DimensionValue;
    return "100%";
  };

  const dinamicStyle: ViewStyle = {
    backgroundColor: props?.disabled
      ? backgroundColorDisabled
      : backgroundColor,
    borderBlockColor: borderBtnColor,
    width: getValidWidth(width),
    height: typeof height === "number" ? height : 30,
  };

  return (
    <TouchableOpacity
      style={[styles.container, dinamicStyle]}
      onPress={onPress}
      {...props}
    >
      <ThemedText style={styles.text}> {name} </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  text: {
    fontWeight: "500",
  },
});
