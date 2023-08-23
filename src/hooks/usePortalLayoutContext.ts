import { useContext } from "react";
import {
  PortalLayoutContext,
  PortalLayoutContextType,
} from "../context/PortalLayoutContextProvider";

export const usePortalLayoutContext = (): PortalLayoutContextType | null => {
  return useContext(PortalLayoutContext);
};
