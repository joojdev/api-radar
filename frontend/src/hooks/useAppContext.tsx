import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { fetchApiList, type Api } from '../api';

interface AppContextType {
  apiList: Api[];
  setApiList: React.Dispatch<React.SetStateAction<Api[]>>;
  loading: boolean;
  error: Error | null;
  selectedApi: Api | null;
  setSelectedApi: React.Dispatch<React.SetStateAction<Api | null>>;
  currentPopup: Popup;
  setCurrentPopup: React.Dispatch<React.SetStateAction<Popup>>;
};

export enum Popup {
  NONE,
  NEW_API
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [selectedApi, setSelectedApi] = useState<Api | null>(null);
  const [apiList, setApiList] = useState<Api[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPopup, setCurrentPopup] = useState<Popup>(Popup.NONE);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await fetchApiList();
        if (mounted) setApiList(list);
      } catch(err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <AppContext.Provider value={{ apiList, setApiList, loading, error, selectedApi, setSelectedApi, currentPopup, setCurrentPopup }}>
      { children }
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext needs to be used inside of AppContextProvider!');
  }

  return context;
}