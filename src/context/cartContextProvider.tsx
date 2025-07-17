import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { IPlatos } from "../types";
// --- Definición de tipos ---
// type Plato = {
//   id: string;
//   nombre: string;
//   descripcion: string;
//   precio: number;
//   imagen: string;
//   cantidad: number;
// };

type State = {
  carrito: IPlatos[];
};

const initialState: State = {
  carrito: [],
};

// --- Reducer ---
type Action =
  | { type: "AGREGAR_PLATO"; payload: IPlatos }
  | { type: "QUITAR_PLATO"; payload: { id: number } }
  | { type: "MODIFICAR_CANTIDAD"; payload: { id: number; cantidad: number } }
  | { type: "VACIAR_CARRITO" };

function carritoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "AGREGAR_PLATO": {
      const existe = state.carrito.find((p) => p.id === action.payload.id);
      if (existe) {
        // Si ya está, sumo cantidad
        return {
          carrito: state.carrito.map((p) =>
            p.id === action.payload.id
              ? { ...p, cantidad: p.cantidad + action.payload.cantidad }
              : p
          ),
        };
      } else {
        // Si no está, lo agrego
        return { carrito: [...state.carrito, action.payload] };
      }
    }
    case "QUITAR_PLATO": {
      return {
        carrito: state.carrito.filter((p) => p.id !== action.payload.id),
      };
    }
    case "MODIFICAR_CANTIDAD": {
      return {
        carrito: state.carrito.map((p) =>
          p.id === action.payload.id
            ? { ...p, cantidad: action.payload.cantidad }
            : p
        ),
      };
    }
    case "VACIAR_CARRITO":
      return { carrito: [] };
    default:
      return state;
  }
}

// --- Contexto y provider ---
const CarritoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface Props {
  children: ReactNode;
}

export const CarritoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(carritoReducer, initialState);
  return (
    <CarritoContext.Provider value={{ state, dispatch }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para consumirlo
export function useCarrito() {
  return useContext(CarritoContext);
}
