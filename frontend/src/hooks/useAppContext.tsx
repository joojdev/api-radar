import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchApiList, getLastLogs, type Api, type Log } from "../api";

interface AppContextType {
  apiList: Api[];
  setApiList: React.Dispatch<React.SetStateAction<Api[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  selectedApi: Api | null;
  setSelectedApi: React.Dispatch<React.SetStateAction<Api | null>>;
  currentPopup: Popup;
  setCurrentPopup: React.Dispatch<React.SetStateAction<Popup>>;
  dropDownSelected: number | null;
  setDropDownSelected: React.Dispatch<React.SetStateAction<number | null>>;
  currentLogList: Log[] | null;
  setCurrentLogList: React.Dispatch<React.SetStateAction<Log[]>>;
  lastTimestamp: number | null;
  setLastTimestamp: React.Dispatch<React.SetStateAction<number | null>>;
}

export enum Popup {
  NONE,
  NEW_API,
  EDIT_API,
  DELETE_API,
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [selectedApi, setSelectedApi] = useState<Api | null>(null);
  const [apiList, setApiList] = useState<Api[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPopup, setCurrentPopup] = useState<Popup>(Popup.NONE);
  const [dropDownSelected, setDropDownSelected] = useState<number | null>(null);
  const [currentLogList, setCurrentLogList] = useState<Log[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await fetchApiList();
        if (mounted) setApiList(list);
      } catch (error) {
        if (mounted) setError(error as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!selectedApi) return;

      const logs: Log[] = await getLastLogs(selectedApi, lastTimestamp ?? 0);
      if (!logs.length) return;

      setCurrentLogList((prev) => [...prev, ...logs]);
      setLastTimestamp(new Date(logs[logs.length - 1].timestamp).getTime());
    }, 20 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedApi, lastTimestamp]);

  return (
    <AppContext.Provider
      value={{
        error,
        apiList,
        setApiList,
        loading,
        setLoading,
        selectedApi,
        setSelectedApi,
        currentPopup,
        setCurrentPopup,
        dropDownSelected,
        setDropDownSelected,
        currentLogList,
        setCurrentLogList,
        lastTimestamp,
        setLastTimestamp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext needs to be used inside of AppContextProvider!",
    );
  }

  return context;
}
