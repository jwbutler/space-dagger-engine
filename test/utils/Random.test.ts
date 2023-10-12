import { test, expect, describe, vi, afterAll } from 'vitest';
import { Random } from '../../src/utils';

const floor = Math.floor;
// this isn't actually true but it's good enough for our purposes without looking it up
const MAX_RAND_VALUE = 0.99999999;

describe('Random', () => {
  let randValue: number = 0;
  vi.stubGlobal('Math', {
    random: () => randValue,
    floor
  });

  describe('randInt', () => {
    test('min value', () => {
      randValue = 0;
      expect(Random.randInt(10, 20)).toBe(10);
    });
    test('max value', () => {
      randValue = MAX_RAND_VALUE;
      expect(Random.randInt(10, 20)).toBe(20);
    });
  });

  describe('randFloat', () => {
    test('min value', () => {
      randValue = 0;
      expect(Random.randFloat(10, 20)).toBe(10);
    });
    test('max value', () => {
      // this is really lazy but it's better than nothing
      randValue = MAX_RAND_VALUE;
      expect(Random.randFloat(10, 20)).toSatisfy((x: number) => x > 19.9);
    });
  });

  describe('randChoice', () => {
    test('min value', () => {
      randValue = 0;
      expect(Random.randChoice(['a', 'b', 'c'])).toBe('a');
    });
    test('max value', () => {
      randValue = MAX_RAND_VALUE;
      expect(Random.randChoice(['a', 'b', 'c'])).toBe('c');
    });
  });

  describe('randBoolean', () => {
    test('min value', () => {
      randValue = 0;
      expect(Random.randBoolean()).toBe(true);
    });
    test('max value', () => {
      randValue = MAX_RAND_VALUE;
      expect(Random.randBoolean()).toBe(false);
    });
  });

  describe('randChance', () => {
    test('min value', () => {
      randValue = 0;
      expect(Random.randChance(0.6)).toBe(true);
    });
    test('max value', () => {
      randValue = MAX_RAND_VALUE;
      expect(Random.randChance(0.6)).toBe(false);
    });
    test('medium value', () => {
      randValue = 0.5;
      expect(Random.randChance(0.6)).toBe(true);
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
