import * as Arrays from '../../src/utils/Arrays';
import { test, expect } from 'vitest';

test('filter in place', () => {
  const array = [3, 5, 7, 8, 9, 1];
  Arrays.filterInPlace(array, x => x % 3 === 0);
  expect(array).toEqual([3, 9]);
});

test('max', () => {
  const array = ['foooooo', 'bar', 'baz'];
  expect(Arrays.max(array, x => x.length)).toBe(array[0]);
});

test('max of empty array throws exception', () => {
  expect(() => Arrays.max([], () => 0)).toThrow();
});
