import {
  Modal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from "react-native";

type Props = ModalProps & { isOpen: boolean; withInput?: boolean };

export const ModalCustom = ({
  isOpen,
  withInput,
  children,
  ...rest
}: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
  ) : (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>{children}</View>
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
    padding: 20,
    borderRadius: 20,
    minWidth: "100%",
  },
});
