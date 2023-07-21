export const storage = {
  getStorage: (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string);
  },
  setStorage: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeStorage: (key: string) => {
    localStorage.removeItem(key);
  },
};
