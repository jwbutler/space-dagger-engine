import { test, expect, describe, vi, afterAll } from 'vitest';
import { Random } from '../../src/utils';

const floor = Math.floor;

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
      randValue = 0.9999999999;
      expect(Random.randInt(10, 20)).toBe(20);
    });
  });
  describe('randFloat', () => {
    test('min value', () => {
      randValue = 0;
      expect(Random.randFloat(10, 20)).toBe(10);
    });
    test('max value', () => {
      randValue = 1;
      expect(Random.randFloat(10, 20)).toBe(20);
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
