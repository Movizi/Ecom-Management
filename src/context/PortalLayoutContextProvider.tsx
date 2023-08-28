import { ReactNode, createContext, useState } from "react";

type PortalLayoutContextProps = {
  children: ReactNode;
};

export interface PortalLayoutContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PortalLayoutContext =
  createContext<PortalLayoutContextType | null>(null);

function PortalLayoutContextProvider({ children }: PortalLayoutContextProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <PortalLayoutContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </PortalLayoutContext.Provider>
  );
}

export default PortalLayoutContextProvider;
