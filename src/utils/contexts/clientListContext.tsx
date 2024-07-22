import React, {createContext, useContext, useState, ReactNode} from "react";
import { ClientDataProps } from "@/types/types";

interface ClientListContextProps {
    data: ClientDataProps[];
    setData: (data: ClientDataProps[]) => void;

}

const ClientListContext = createContext<ClientListContextProps | undefined>(undefined)

export const DataProvider: React.FC<{ children: ReactNode, initialData: ClientDataProps[] }> = ({ children, initialData }) => {
  const [data, setData] = useState<ClientDataProps[]>(initialData);

  return (
    <ClientListContext.Provider value={{ data, setData }}>
      {children}
    </ClientListContext.Provider>
  );
};

export const useData = (): ClientListContextProps => {
  const context = useContext(ClientListContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};