// sessionStorageService.js

const sessionStorageService = {
  get(key) {
    const serializedValue = sessionStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  },

  set(key, value) {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  },

  delete(key) {
    sessionStorage.removeItem(key);
  },
};

export default sessionStorageService;
