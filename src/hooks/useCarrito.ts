import { CarritoContext } from "@/src/context/cartContextProvider";
import { useContext } from "react";

export function useCarrito() {
  return useContext(CarritoContext);
}
