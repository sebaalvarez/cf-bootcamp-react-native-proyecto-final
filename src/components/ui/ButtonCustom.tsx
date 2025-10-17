import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

interface Props {
  name: string;
  lightColor?: string;
  darkColor?: string;
  height?: string | number;
  width?: string | number;
  onPress?: () => void;
  loading?: boolean;
  props?: TouchableOpacityProps;
}

export function ButtonCustom({
  name,
  lightColor,
  darkColor,
  height,
  width,
  onPress,
  props,
  loading,
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
  const spinnerBtnColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "spinnerBtn"
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
      {...props}
      style={[styles.container, dinamicStyle, props?.style]}
      onPress={onPress}
      disabled={props?.disabled || loading}
    >
      {/* <ThemedText style={styles.text}>{name}</ThemedText> */}
      {loading ? (
        <ActivityIndicator color={spinnerBtnColor} />
      ) : (
        <ThemedText style={styles.text}>{name}</ThemedText>
      )}
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
