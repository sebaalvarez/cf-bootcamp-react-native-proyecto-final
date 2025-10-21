import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, TextInputProps } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

interface Props {
  lightColor?: string;
  darkColor?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  value?: string | number;
  onBlur: () => void;
  props?: TextInputProps;
  renderRightAccessory?: () => React.ReactNode;
}

export function TextField({
  lightColor,
  darkColor,
  onChangeText,
  placeholder,
  value,
  onBlur,
  props,
  renderRightAccessory,
}: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const animatedLabel = useRef(new Animated.Value(0)).current;
  const colorText = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const colorBackgrund = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocus || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedLabel, isFocus, value]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderColor: "#a6a6a6",
      borderBottomWidth: 0.5,
      paddingHorizontal: 10,
      width: "100%",
      minHeight: props?.multiline ? "auto" : 30,
      height: props?.multiline ? "auto" : 30,
      backgroundColor: colorBackgrund, //"#ffffff",
    },
    focused: {
      backgroundColor: colorBackgrund, //"#ffffff",
    },
    input: {
      flex: 1,
      minHeight: props?.multiline ? "auto" : 40,
      height: props?.multiline ? "auto" : 40,
      fontSize: 16,
      padding: 0,
      paddingTop: props?.multiline ? 8 : 0,
      marginTop: props?.multiline ? 8 : 0,
      color: colorText,
    },
    accessory: {
      marginLeft: 10,
    },
  });

  const labelStyle = {
    position: "absolute" as const,
    left: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 0],
    }),
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [7, -10],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["#9a9999ff", colorText],
    }),
    backgroundColor: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [colorBackgrund, colorBackgrund],
    }),
    paddingHorizontal: 4,
  };

  const blur = () => {
    setIsFocus(false);
    return onBlur;
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <TextInput
        style={styles.input}
        value={value !== undefined && value !== null ? String(value) : ""}
        onChangeText={onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={blur}
        {...props}
      />
      {renderRightAccessory && (
        <ThemedView style={styles.accessory}>
          {renderRightAccessory()}
        </ThemedView>
      )}
    </ThemedView>
  );
}
