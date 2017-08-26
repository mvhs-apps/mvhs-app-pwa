// @flow

import { AsyncStorage } from 'react-native';

export const getItem = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const setItem = async (key: string, item: string) => {
  await AsyncStorage.setItem(key, item);
};
