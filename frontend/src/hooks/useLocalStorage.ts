import { useState, useEffect } from "react";

function getLSValue<T>(key: string, initialValue?: T) {
  const rawValue = localStorage.getItem(key);
  if (rawValue) {
    const value = JSON.parse(rawValue);
    if (initialValue instanceof Function) return initialValue();
    return value;
  }
  if (initialValue instanceof Function) return initialValue();
  if (initialValue) return initialValue;
  return null;
}

function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T>(() => getLSValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue, key]);
  return [value, setValue] as const;
}

export default useLocalStorage;
