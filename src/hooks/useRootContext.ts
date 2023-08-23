import { useContext } from "react";
import { RootContext, RootContextType } from "../context/RootContextProvider";

export const useRootContext = (): RootContextType | null => {
  return useContext(RootContext);
};
