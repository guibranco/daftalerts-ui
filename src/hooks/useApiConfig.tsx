import React, { createContext, useContext, useState } from 'react';

interface ApiConfig {
  baseUrl: string | null;
  token: string | null;
}

interface ApiConfigContextType {
  config: ApiConfig;
  setConfig: (config: ApiConfig) => void;
  clearConfig: () => void;
  isMock: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ApiConfigContext = createContext<ApiConfigContextType | undefined>(undefined);

export function ApiConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigInternal] = useState<ApiConfig>(() => {
    const baseUrl = localStorage.getItem('daft_api_base_url');
    const token = localStorage.getItem('daft_api_token');
    return { baseUrl, token };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const setConfig = (newConfig: ApiConfig) => {
    if (newConfig.baseUrl) localStorage.setItem('daft_api_base_url', newConfig.baseUrl);
    else localStorage.removeItem('daft_api_base_url');
    
    if (newConfig.token) localStorage.setItem('daft_api_token', newConfig.token);
    else localStorage.removeItem('daft_api_token');
    
    setConfigInternal(newConfig);
  };

  const clearConfig = () => {
    localStorage.removeItem('daft_api_base_url');
    localStorage.removeItem('daft_api_token');
    setConfigInternal({ baseUrl: null, token: null });
  };

  const isMock = !config.baseUrl || !config.token;

  return (
    <ApiConfigContext.Provider value={{ config, setConfig, clearConfig, isMock, isModalOpen, setIsModalOpen }}>
      {children}
    </ApiConfigContext.Provider>
  );
}

export function useApiConfig() {
  const context = useContext(ApiConfigContext);
  if (context === undefined) {
    throw new Error('useApiConfig must be used within an ApiConfigProvider');
  }
  return context;
}
