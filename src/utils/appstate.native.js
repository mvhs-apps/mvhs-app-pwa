//@flow

import { AppState } from 'react-native';

export const addOnResumeListener = (listener: () => void) => {
  AppState.addEventListener('change', listener);
};
