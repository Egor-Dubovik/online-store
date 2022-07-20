import { IStorage } from '../../interfaces/storage.interface';

export const storage: IStorage = {
  set: function (key, value) {
    localStorage.setItem(key, value);
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
  get: (key) => {
    return localStorage.getItem(key);
  },
};
