const localStorageService = {
  get(key) {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  },

  set(key, value) {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  },

  delete(key) {
    localStorage.removeItem(key);
  },
};

export default localStorageService;
