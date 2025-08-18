import { useEffect, useState } from "react";

function getSavedValue<T>(key: string, initialValue: T): T {
  if (typeof window == "undefined") {
    return initialValue;
  }

  try {
    const savedValue = window.localStorage.getItem(key);

    if (savedValue === null) {
      return initialValue;
    }

    if (savedValue) {
      return JSON.parse(savedValue);
    }
  } catch (error) {
    console.error("Failed to parse localStorage value:", error);
  }
  return initialValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to store localStorage value:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
