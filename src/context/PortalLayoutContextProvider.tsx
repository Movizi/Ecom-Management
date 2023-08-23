import { ReactNode, createContext, useState } from "react";

type PortalLayoutContextProps = {
  children: ReactNode;
};

export interface PortalLayoutContextType {
  selectedKey: string | null;
  setSelectedKey: React.Dispatch<React.SetStateAction<string | null>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PortalLayoutContext = createContext<PortalLayoutContextType | null>(
  null
);

function PortalLayoutContextProvider({ children }: PortalLayoutContextProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>("");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <PortalLayoutContext.Provider
      value={{ selectedKey, setSelectedKey, collapsed, setCollapsed }}
    >
      {children}
    </PortalLayoutContext.Provider>
  );
}

export default PortalLayoutContextProvider;
