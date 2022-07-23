import { IStorage } from '../../interfaces/storage.interface';

export const storage: IStorage = {
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  get: (key) => {
    return localStorage.getItem(key) as string;
  },
};
