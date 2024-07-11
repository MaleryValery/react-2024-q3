import { useState } from 'react';

const useStorage = (key: string) => {
  const [storageValue, setStorageValue] = useState<string>('');

  const setStorage = (value: string) => {
    localStorage.setItem(key, value);
    setStorageValue(value);
  };

  const getStorage = () => {
    const storage = localStorage.getItem(key) || '';

    return storage;
  };

  return { setStorage, getStorage, storageValue };
};

export default useStorage;
