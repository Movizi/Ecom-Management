import { useContext } from "react";
import {
  AuthAlertContext,
  AuthAlertContextType,
} from "../context/AuthAlertContextProvider";

export const useAuthAlertContext = (): AuthAlertContextType | null => {
  return useContext(AuthAlertContext);
};
