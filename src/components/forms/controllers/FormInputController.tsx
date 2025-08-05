import { FC } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { StyleSheet, Text, TextInputProps } from "react-native";
import { TextField } from "../../ui";

interface Props {
  control: Control;
  errors?: Record<string, FieldError>;
  name: string;
  placeholder: string;
  propsTextInput?: TextInputProps;
  renderRightAccessory?: () => React.ReactNode;
}

export const FormInputController: FC<Props> = ({
  control,
  errors,
  name,
  placeholder,
  propsTextInput,
  renderRightAccessory,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            props={propsTextInput}
            renderRightAccessory={renderRightAccessory}
          />
        )}
      />

      {errors && errors[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 13,
    marginTop: -20,
    marginLeft: 10,
  },
});
