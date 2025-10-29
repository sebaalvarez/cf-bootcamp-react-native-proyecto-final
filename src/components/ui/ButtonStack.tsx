import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { IconSymbol, IconSymbolName } from "./IconSymbol";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  name: string;
  icon?: IconSymbolName;
  iconSize?: number;
  lightColor?: string;
  darkColor?: string;
  height?: string | number;
  width?: string | number;
  onPress?: () => void;
  props?: TouchableOpacityProps;
}

export function ButtonStack({
  name,
  icon,
  iconSize = 40,
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
      {...props}
      style={[styles.container, dinamicStyle, props?.style]}
      onPress={onPress}
    >
      <ThemedView style={styles.leftGroup}>
        {icon && <IconSymbol name={icon} size={iconSize} />}
        <ThemedText style={styles.text}> {name} </ThemedText>
      </ThemedView>
      <IconSymbol name="flecha-derecha" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.2,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontWeight: "600",
  },
  textFlecha: {
    fontSize: 24,
    fontWeight: "600",
  },
});
