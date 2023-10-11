import { describe, expect, test } from 'vitest';
import { Waveform } from '../../src/audio';

describe('Waveform', () => {
  test('toOscillatorType', () => {
    expect(Waveform.toOscillatorType(Waveform.SQUARE)).toBe('square');
    expect(Waveform.toOscillatorType(Waveform.SINE)).toBe('sine');
    expect(Waveform.toOscillatorType(Waveform.TRIANGLE)).toBe('triangle');
  });
});
