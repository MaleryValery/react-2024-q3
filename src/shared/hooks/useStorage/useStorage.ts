const useStorage = (key: string) => {
  const setStorage = (value: string) => {
    localStorage.setItem(key, value);
  };

  const getStorage = () => {
    const storage = localStorage.getItem(key) || '';

    return storage;
  };

  return { setStorage, getStorage };
};

export default useStorage;
