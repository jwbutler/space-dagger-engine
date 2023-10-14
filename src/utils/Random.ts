import { check } from './preconditions';

export const randInt = (min: number, maxInclusive: number): number =>
  Math.floor(Math.random() * (maxInclusive - min + 1)) + min;

export const randFloat = (min: number, maxExclusive: number): number =>
  Math.random() * (maxExclusive - min) + min;

export const randChoice = <T>(items: T[]): T => {
  check(items.length > 0);
  const index = randInt(0, items.length - 1);
  return items[index];
};

export const randBoolean = (): boolean => randChoice([true, false]);

export const randChance = (chance: number): boolean => {
  check(chance >= 0 && chance <= 1);
  return randFloat(0, 1) < chance;
};
