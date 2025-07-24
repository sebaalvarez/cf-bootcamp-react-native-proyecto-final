import { HeaderBackButton } from "@react-navigation/elements";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function CustomHeaderStack({
  navigation,
  title,
}: {
  navigation: any;
  title: string;
}) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView
      style={{
        height: 60,
        backgroundColor: backgroundColor,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
      }}
    >
      <HeaderBackButton
        tintColor={textColor}
        onPress={() => navigation.goBack()}
      />
      <ThemedText
        type="defaultSemiBold"
        style={{ color: textColor, marginLeft: 10 }}
      >
        {title}
      </ThemedText>
    </ThemedView>
  );
}
