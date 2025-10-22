import { useThemeColor } from "@/src/hooks/useThemeColor";
import { updatePlatoInfo } from "@/src/services/api/supabase/platos";
import { IPlatos } from "@/src/types";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { ButtonCustom, ThemedText, ThemedView } from "./ui";

interface Props {
  item: IPlatos;
  onPress?: () => void;
}

interface FormErrors {
  nombre?: string;
  descripcion?: string;
  precio?: string;
}

export default function ModalActualizarPrecioPlato({ item, onPress }: Props) {
  const [nombre, setNombre] = useState(item.nombre);
  const [descripcion, setDescripcion] = useState(item.descripcion);
  const [precio, setPrecio] = useState(item.precio.toString());
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "icon");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    // Validar descripción
    if (!descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (descripcion.trim().length < 10) {
      newErrors.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    }

    // Validar precio
    const precioNumero = parseFloat(precio);
    if (!precio || isNaN(precioNumero) || precioNumero <= 0) {
      newErrors.precio = "Ingresa un precio válido mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleActualizar = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await updatePlatoInfo(
        Number(item.id),
        nombre.trim(),
        descripcion.trim(),
        parseFloat(precio)
      );
      onPress?.();
    } catch (err) {
      Alert.alert(
        "Error",
        "No se pudo actualizar el plato. Intenta nuevamente."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePrecio = (text: string) => {
    // Permitir solo números y un punto decimal
    const cleaned = text.replace(/[^0-9]/g, "");

    setPrecio(cleaned);
    if (errors.precio) {
      setErrors({ ...errors, precio: undefined });
    }
  };

  return (
    <ThemedView style={styles.containerModal}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.title}>Editar Plato</ThemedText>
          <ThemedText style={styles.subtitle}>
            Actualiza la información del plato
          </ThemedText>
        </ThemedView>

        {/* Campo Nombre */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Nombre del Plato:</ThemedText>
          <TextInput
            style={[
              styles.textInput,
              {
                color: textColor,
                backgroundColor: backgroundColor,
                borderColor: errors.nombre ? "red" : borderColor,
              },
            ]}
            value={nombre}
            onChangeText={(text) => {
              setNombre(text);
              if (errors.nombre) {
                setErrors({ ...errors, nombre: undefined });
              }
            }}
            placeholder="Ej: Empanada de Carne"
            placeholderTextColor={borderColor}
            maxLength={50}
          />
          {errors.nombre ? (
            <ThemedText style={styles.errorText}>{errors.nombre}</ThemedText>
          ) : null}
        </ThemedView>

        {/* Campo Descripción */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Descripción:</ThemedText>
          <TextInput
            style={[
              styles.textAreaInput,
              {
                color: textColor,
                backgroundColor: backgroundColor,
                borderColor: errors.descripcion ? "red" : borderColor,
              },
            ]}
            value={descripcion}
            onChangeText={(text) => {
              setDescripcion(text);
              if (errors.descripcion) {
                setErrors({ ...errors, descripcion: undefined });
              }
            }}
            placeholder="Descripción del plato..."
            placeholderTextColor={borderColor}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={200}
          />
          <ThemedText style={styles.charCount}>
            {descripcion.length}/200 caracteres
          </ThemedText>
          {errors.descripcion ? (
            <ThemedText style={styles.errorText}>
              {errors.descripcion}
            </ThemedText>
          ) : null}
        </ThemedView>

        {/* Campo Precio */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Precio:</ThemedText>
          <View style={styles.precioInputWrapper}>
            <ThemedText style={styles.currencySymbol}>$</ThemedText>
            <TextInput
              style={[
                styles.precioInput,
                {
                  color: textColor,
                  backgroundColor: backgroundColor,
                  borderColor: errors.precio ? "red" : borderColor,
                },
              ]}
              value={precio}
              onChangeText={handleChangePrecio}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={borderColor}
            />
          </View>
          {errors.precio ? (
            <ThemedText style={styles.errorText}>{errors.precio}</ThemedText>
          ) : null}
        </ThemedView>

        {/* Botón Actualizar */}
        <View style={styles.buttonContainer}>
          <ButtonCustom
            name="Actualizar Plato"
            onPress={handleActualizar}
            width={"100%"}
            loading={loading}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    height: "auto",
    borderRadius: 20,
    paddingVertical: 20,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  textInput: {
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  textAreaInput: {
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: "right",
  },
  precioInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "bold",
  },
  precioInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});
