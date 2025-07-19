import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, TextInputProps } from "react-native";
import { ThemedView } from "./ThemedView";

interface Props {
  onChangeText: (text: string) => void;
  placeholder: string;
  value?: string | number;
  onBlur: () => void;
  props?: TextInputProps;
}

export default function TextField({
  onChangeText,
  placeholder,
  value,
  onBlur,
  props,
}: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const animatedLabel = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocus || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedLabel, isFocus, value]);

  const styles = StyleSheet.create({
    container: {
      borderColor: "#a6a6a6",
      borderBottomWidth: 0.5,
      paddingHorizontal: 10,
      width: "100%",
      height: 30,
      backgroundColor: "#ffffff",
    },
    focused: {
      backgroundColor: "#ffffff",
    },
    input: {
      height: 40,
      fontSize: 16,
      padding: 0,
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
      outputRange: ["#aaaaaa", "#000000"],
    }),
    backgroundColor: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["#ffffff", "#ffffff"],
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
    </ThemedView>
  );
}
