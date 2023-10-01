import { check } from './preconditions';

type Predicate<T> = (t: T) => boolean;
export const filterInPlace = <T>(array: T[], predicate: Predicate<T>): void => {
  const tmp = [...array];
  array.splice(0, array.length);
  for (const item of tmp) {
    if (predicate(item)) {
      array.push(item);
    }
  }
};

type KeyFunction<T> = (t: T) => number;
export const max = <T>(array: T[], keyFunction: KeyFunction<T>): T => {
  check(array.length > 0);
  let maxItem = array[0];
  for (let i = 1; i < array.length; i++) {
    const item = array[i];
    if (keyFunction(item) > keyFunction(maxItem)) {
      maxItem = item;
    }
  }
  return maxItem!;
};
