const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};

const getLocal = (key) => {
  return localStorage.getItem(key);
};

const removeLocal = (key) => {
  localStorage.removeItem(key);
};

const clearLocal = () => {
  localStorage.clear();
};

export const localStorageService = { setLocal, getLocal, removeLocal, clearLocal };
