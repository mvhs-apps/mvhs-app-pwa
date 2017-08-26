// @flow

export const getItem = async (key: string) => {
  return localStorage.getItem(key);
};

export const setItem = async (key: string, item: string) => {
  localStorage.setItem(key, item);
};
