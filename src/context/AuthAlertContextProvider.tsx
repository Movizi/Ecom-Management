import { ReactNode, createContext, useState } from "react";

type AuthAlertContextProviderProps = {
  children: ReactNode;
};

export type AlertType = "error" | "success" | "info" | "warning" | undefined;

export interface AuthAlertContextType {
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  alertType: AlertType;
  setAlertType: React.Dispatch<React.SetStateAction<AlertType>>;
}

export const AuthAlertContext = createContext<AuthAlertContextType | null>(
  null
);

function AuthAlertContextProvider({ children }: AuthAlertContextProviderProps) {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>(undefined);
  const [message, setMessage] = useState<string>("");

  return (
    <AuthAlertContext.Provider
      value={{
        isAlertOpen,
        setIsAlertOpen,
        message,
        setMessage,
        alertType,
        setAlertType,
      }}
    >
      {children}
    </AuthAlertContext.Provider>
  );
}

export default AuthAlertContextProvider;
