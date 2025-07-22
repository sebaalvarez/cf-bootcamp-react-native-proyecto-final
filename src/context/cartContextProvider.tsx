import React, { createContext, ReactNode, useReducer } from "react";
import { IPlatos } from "../types";

type State = {
  carrito: IPlatos[];
};

const initialState: State = {
  carrito: [],
};

type Action =
  | { type: "AGREGAR_PLATO"; payload: IPlatos }
  | { type: "QUITAR_PLATO"; payload: { id: string } }
  | { type: "MODIFICAR_CANTIDAD"; payload: { id: string; cantidad: number } }
  | { type: "VACIAR_CARRITO" };

function carritoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "AGREGAR_PLATO": {
      const existe = state.carrito.find((p) => p.id === action.payload.id);
      if (existe) {
        return {
          carrito: state.carrito.map((p) =>
            p.id === action.payload.id
              ? { ...p, cantidad: p.cantidad + action.payload.cantidad }
              : p
          ),
        };
      } else {
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
export const CarritoContext = createContext<{
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
