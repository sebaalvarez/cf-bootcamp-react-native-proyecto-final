import { createContext, ReactElement, useState } from "react";

interface IContext {
  cantidad: number;
  setCantidad: (valor: number) => void;
}

export const CartContext = createContext<IContext>({
  cantidad: 0,
  setCantidad: function (valor: number): void {
    throw new Error("Función no implementada" + valor);
  },
});

interface Props {
  children: ReactElement | ReactElement[];
}

export default function CartContextProvider({ children }: Props) {
  const [cantidad, setCantidad] = useState(0);
  return (
    <CartContext.Provider value={{ cantidad, setCantidad }}>
      {children}
    </CartContext.Provider>
  );
}
