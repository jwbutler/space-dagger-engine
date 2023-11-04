import * as Preconditions from '../../src/utils/preconditions';
import { test, expect } from 'vitest';

test('checkNotNull', () => {
  expect(() => Preconditions.checkNotNull(null)).toThrow();
  expect(() => Preconditions.checkNotNull(undefined)).toThrow();
  expect(() => Preconditions.checkNotNull('')).not.toThrow();
  expect(() => Preconditions.checkNotNull([])).not.toThrow();
});

// I don't know what I'm doing with my life
test('check', () => {
  const value = 'asdf';
  expect(() => Preconditions.check(value.length === 4)).not.toThrow();
  expect(() => Preconditions.check(value.length !== 4)).toThrow();
  expect(() => Preconditions.check(value.length === 100, 'what')).toThrow('what');
});
