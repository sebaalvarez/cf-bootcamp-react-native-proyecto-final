// Fallback for using MaterialIcons on Android and web.

import { useThemeColor } from "@/src/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

// type IconMapping = Record<
//   SymbolViewProps["name"],
//   ComponentProps<typeof MaterialIcons>["name"]
// >;

// type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
// const MAPPING = {
//   "house.fill": "home",
//   "0.circle": "restaurant-menu",
//   "0.square": "shopping-cart",
//   "00.circle": "visibility",
//   "00.square": "visibility-off",
//   "01.circle.ar": "menu",
//   person: "person",
//   "01.circle": "settings",
//   "02.circle": "check",
//   "chevron.left.forwardslash.chevron.right": "code",
//   "chevron.right": "chevron-right",
// } as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

// opciones de nombres que me va a listar el comnonente
export type IconSymbolName =
  | "inicio"
  | "menu"
  | "carrito"
  | "mas-opciones"
  | "update"
  | "pedido"
  | "perfil"
  | "flecha-adelante"
  | "flecha-atras"
  | "pass-visible"
  | "pass-oculta"
  | "salir"
  | "flecha-derecha"
  | "pedidoDetalle"
  | "pedidoHistorial"
  | "pedidosSolicitados"
  | "pedidosRecibidos"
  | "pedidosEntregados"
  | "datos-perfil"
  | "cambio-pass"
  | "borrar-cuenta"
  | "lista"
  | "configGlobal"
  | "actStockPlatos"
  | "actInfoPlatos"
  | "actEstadoCocina"
  | "actTelefono"
  | "actHorarioAtencion"
  | "0.Agregar nuevo en IconSymbol";

// Mapeo del nombre amigable con el de MaterialIcons
const MAPPING: Record<IconSymbolName, MaterialIconName> = {
  inicio: "home",
  menu: "restaurant-menu",
  carrito: "shopping-cart",
  "mas-opciones": "more-horiz",
  update: "cached",
  pedido: "shopping-cart",
  "pass-visible": "visibility",
  "pass-oculta": "visibility-off",
  perfil: "settings",
  "flecha-adelante": "code",
  "flecha-atras": "chevron-right",
  salir: "logout",
  "flecha-derecha": "chevron-right",
  pedidoDetalle: "description",
  pedidoHistorial: "list-alt",
  pedidosSolicitados: "assignment-returned",
  pedidosRecibidos: "assignment-late",
  pedidosEntregados: "assignment-turned-in",
  lista: "list",
  configGlobal: "tune",
  actStockPlatos: "inventory",
  actInfoPlatos: "edit",
  actEstadoCocina: "restaurant",
  actTelefono: "phone",
  actHorarioAtencion: "schedule",
  "datos-perfil": "person",
  "cambio-pass": "lock-reset",
  "borrar-cuenta": "delete-forever",
  "0.Agregar nuevo en IconSymbol": "more",
};

export function IconSymbol({
  name,
  size = 24,
  color,
  lightColor,
  darkColor,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const colorThemed = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const colorToUse =
    typeof color === "string" ? color : colorThemed ?? undefined;

  return (
    <MaterialIcons
      color={colorToUse}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
