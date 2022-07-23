export interface IStorage {
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
  get: (key: string) => string;
}
