import { storage } from "../components/base/localStorage"; 

describe('storage methods', () => {
  it('sets data into local storage', () => {
    const key = 'id';
    const value = '444';
    storage.set(key, value);

    expect(localStorage.getItem(key)).toEqual(value);
  });

  it('remove data into local storage', () => {
    const key = 'id';
    const value = '22';
    window.localStorage.setItem(key, value);
    storage.remove(key);

    expect(localStorage.getItem(key)).toEqual(null);
  });

  it('get data into local storage', () => {
    const key = 'id';
    const value = '3';

    window.localStorage.setItem(key, value);
    const data = storage.get(key);

    expect(localStorage.getItem(key)).toEqual(data);
  });
});


  