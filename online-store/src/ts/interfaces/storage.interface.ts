export interface IStorage {
  set: (key: string, value: string) => void;
  remove: (key: string) => string;
  get: (key: string) => string;
}
