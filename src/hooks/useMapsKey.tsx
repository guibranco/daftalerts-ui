import React, { createContext, useContext, useState, useEffect } from 'react';

interface MapsKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

const MapsKeyContext = createContext<MapsKeyContextType | undefined>(undefined);

export function MapsKeyProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyInternal] = useState<string | null>(() => {
    return localStorage.getItem('google_maps_api_key');
  });

  const setApiKey = (key: string) => {
    localStorage.setItem('google_maps_api_key', key);
    setApiKeyInternal(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem('google_maps_api_key');
    setApiKeyInternal(null);
  };

  return (
    <MapsKeyContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
      {children}
    </MapsKeyContext.Provider>
  );
}

export function useMapsKey() {
  const context = useContext(MapsKeyContext);
  if (context === undefined) {
    throw new Error('useMapsKey must be used within a MapsKeyProvider');
  }
  return context;
}
