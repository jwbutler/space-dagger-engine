import { test, expect, vi } from 'vitest';
import { getCurrentTimeSeconds } from '../../src/utils';

test('time', () => {
  vi.useFakeTimers({
    toFake: ['performance']
  });

  expect(getCurrentTimeSeconds()).toBe(0);
  vi.advanceTimersByTime(1000);
  expect(getCurrentTimeSeconds()).toBe(1);
  vi.advanceTimersByTime(100);
  expect(getCurrentTimeSeconds()).toBe(1.1);

  vi.useRealTimers();
});
