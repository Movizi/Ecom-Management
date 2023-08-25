/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type RootContextProviderProps = {
  children: ReactNode;
};

type UrlType = "https://localhost:44301/api";

export interface RootContextType {
  apiUrl: UrlType;
  fetchData: (
    url: string,
    config?: AxiosRequestConfig | undefined
  ) => Promise<AxiosResponse>;
  authFetch: <T>(url: string, data: T) => Promise<any>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  tokenExpires: string | null;
  setTokenExpires: React.Dispatch<React.SetStateAction<string | null>>;
}

export const RootContext = createContext<RootContextType | null>(null);

function RootContextProvider({ children }: RootContextProviderProps) {
  const apiUrl = "https://localhost:44301/api";

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenExpires, setTokenExpires] = useState<string | null>(null);

  async function fetchData(
    url: string,
    config?: AxiosRequestConfig | undefined
  ) {
    const request = await axios(url, {
      headers: { Authorization: `Bearer  ${accessToken}` },
      ...config,
    });

    return request;
  }

  async function authFetch<T>(url: string, data: T): Promise<any> {
    const request = await axios.post(url, data);
    return request.data;
  }

  return (
    <RootContext.Provider
      value={{
        apiUrl,
        fetchData,
        authFetch,
        accessToken,
        setAccessToken,
        tokenExpires,
        setTokenExpires,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}

export default RootContextProvider;
