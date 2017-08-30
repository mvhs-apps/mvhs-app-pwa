//@flow

export const addOnResumeListener = (listener: () => void) => {
  window.addEventListener('focus', listener);
};
