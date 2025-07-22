import { useContext } from "react";
import { CarritoContext } from "../context/cartContextProvider";

export function useCarrito() {
  return useContext(CarritoContext);
}
