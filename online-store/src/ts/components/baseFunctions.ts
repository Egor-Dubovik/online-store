import { INITIAL_STEP } from '../constants/numbers';

export function toggleClasses(array: HTMLElement[], className: string): void {
  for (let i = INITIAL_STEP; i < array.length; i++) {
    array[i].classList.toggle(className);
  }
}

export function removeClasses(array: HTMLElement[], className: string): void {
  for (let i = INITIAL_STEP; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}

