import { INITIAL_STEP } from '../../constants/numbers';

export const toggleClasses = (array: HTMLElement[], className: string): void => {
  for (let i = INITIAL_STEP; i < array.length; i++) {
    array[i].classList.toggle(className);
  }
};

export const removeClasses = (array: HTMLElement[], className: string): void => {
  for (let i = INITIAL_STEP; i < array.length; i++) {
    array[i].classList.remove(className);
  }
};
