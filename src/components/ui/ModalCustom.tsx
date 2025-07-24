import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  StyleSheet,
  View,
} from "react-native";
import { ButtonCustom } from "./ButtonCustom";
import { ThemedView } from "./ThemedView";

type Props = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
  visibleClose?: boolean;
  onPress?: () => void;
};

export const ModalCustom = ({
  isOpen,
  withInput,
  visibleClose = true,
  onPress,
  children,
  ...rest
}: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
  ) : (
    <View style={styles.overlay}>
      <ThemedView style={styles.modalContent}>
        {visibleClose ? (
          <ThemedView style={styles.containerClose}>
            <ButtonCustom
              name="X"
              onPress={onPress}
              height={40}
              width={40}
              props={{ style: { borderRadius: 50, margin: 5 } }}
            />
          </ThemedView>
        ) : (
          <></>
        )}
        {children}
      </ThemedView>
    </View>
  );

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // El 0.5 te da ese oscurecido, podés ajustarlo
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 5,
    borderRadius: 20,
    width: "90%",
    minWidth: "80%",
    maxHeight: "80%",
  },
  containerClose: {
    alignItems: "flex-end",
  },
});
