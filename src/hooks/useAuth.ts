import { AuthContext } from "@/src/context/authProvider";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
