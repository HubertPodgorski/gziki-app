import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { AuthContextType } from "../contexts/types";

export const useAuthContext = (): Partial<AuthContextType> => {
  const context = useContext<Partial<AuthContextType>>(AuthContext);

  return context;
};
