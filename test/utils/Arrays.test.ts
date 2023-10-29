import * as Arrays from '../../src/utils/Arrays';
import { test, expect, describe } from 'vitest';

describe('Arrays', () => {
  test('filterInPlace', () => {
    const array = [3, 5, 7, 8, 9, 1];
    Arrays.filterInPlace(array, x => x % 3 === 0);
    expect(array).toEqual([3, 9]);
  });

  describe('max', () => {
    test('first is max', () => {
      const array = ['foooooo', 'bar', 'baz'];
      expect(Arrays.max(array, x => x.length)).toBe(array[0]);
    });

    test('last is max', () => {
      const array = ['foo', 'bar', 'bazzzzz'];
      expect(Arrays.max(array, x => x.length)).toBe(array[2]);
    });

    test('max of empty array throws exception', () => {
      expect(() => Arrays.max([], () => 0)).toThrow();
    });
  });

  describe('min', () => {
    test('first is min', () => {
      const array = ['foo', 'bar', 'bazzz'];
      expect(Arrays.min(array, x => x.length)).toBe(array[0]);
    });

    test('last is min', () => {
      const array = ['fooo', 'baar', 'baz'];
      expect(Arrays.min(array, x => x.length)).toBe(array[2]);
    });

    test('max of empty array throws exception', () => {
      expect(() => Arrays.min([], () => 0)).toThrow();
    });
  });
});
