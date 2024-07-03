export const getLocalStoreItem = (key: string) => {
  const searchValue = localStorage.getItem(key);

  if (!searchValue) return null;

  return searchValue;
};

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
