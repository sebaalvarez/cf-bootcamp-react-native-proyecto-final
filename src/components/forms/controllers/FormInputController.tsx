import { FC } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { StyleSheet, Text, TextInputProps } from "react-native";
import TextField from "../../TextField";

interface Props {
  control: Control;
  errors?: FieldError;
  name: string;

  placeholder: string;
  propsTextInput?: TextInputProps;
}

export const FormInputController: FC<Props> = ({
  control,
  errors,
  name,
  placeholder,
  propsTextInput,
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
          />
        )}
      />

      {errors && <Text style={styles.error}>{errors[name]?.message}</Text>}
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
