import { describe, expect, test, vi } from 'vitest';
import { SoundPlayer, Waveform } from '../../src/audio';
import { SoundPlayerImpl } from '../../src/audio/SoundPlayerImpl';

describe('SoundPlayer', () => {
  // TODO: reusing this between tests is causing problems
  const getMockOscillator = () => {
    let endedListener: () => void;
    return {
      frequency: {
        value: undefined,
        setValueAtTime: () => {}
      },
      connect: () => {},
      addEventListener: (_: string, listener: () => void) => {
        endedListener = listener;
      },
      start: () => {},
      stop: () => {},
      disconnect: () => {},
      dispatchEvent: () => {
        endedListener?.();
      }
    } as unknown as OscillatorNode;
  };
  let mockOscillator: OscillatorNode;
  const mockAudioContext = {
    createGain: () => ({
      gain: {
        value: undefined
      },
      connect: () => {},
      disconnect: () => {}
    }),
    createOscillator: () => mockOscillator,
    currentTime: 0
  } as unknown as AudioContext;

  const gainNode = {
    gain: {
      value: undefined
    },
    connect: () => {}
  } as unknown as GainNode;

  describe('playToneSequence', () => {
    test('empty', () => {
      const createGain_spy = vi.spyOn(mockAudioContext, 'createGain');
      const createOscillator_spy = vi.spyOn(mockAudioContext, 'createOscillator');

      const soundPlayer = new SoundPlayerImpl({
        audioContext: mockAudioContext,
        gainNode
      });
      soundPlayer.playToneSequence({
        tones: [],
        waveform: Waveform.SQUARE,
        volume: 1
      });

      expect(createGain_spy).not.toHaveBeenCalled();
      expect(createOscillator_spy).not.toHaveBeenCalled();

      createGain_spy.mockClear();
      createOscillator_spy.mockClear();
    });

    describe('non-empty', () => {
      vi.useFakeTimers();
      mockOscillator = getMockOscillator();
      const oscillator_start_spy = vi.spyOn(mockOscillator, 'start');
      const oscillator_stop_spy = vi.spyOn(mockOscillator, 'stop');
      const oscillator_disconnect_spy = vi.spyOn(mockOscillator, 'disconnect');
      const soundPlayer = new SoundPlayerImpl({
        audioContext: mockAudioContext,
        gainNode
      });

      const callback = () => {};
      soundPlayer.playToneSequence({
        tones: [{ frequency: 100, duration: 100 }],
        waveform: Waveform.SQUARE,
        volume: 1,
        id: 'test',
        callback
      });
      test('started', () => {
        expect(oscillator_start_spy).toHaveBeenCalled();
      });
      test('stop timing', () => {
        expect(oscillator_stop_spy).toHaveBeenCalledWith(0.1);
      });
      test('ended', () => {
        mockOscillator.dispatchEvent({ type: 'ended' } as Event);
        expect(oscillator_disconnect_spy).toHaveBeenCalled();
      });
    });

    test('id collision', () => {
      mockOscillator = getMockOscillator();
      const oscillator_start_spy = vi.spyOn(mockOscillator, 'start');
      const soundPlayer = new SoundPlayerImpl({
        audioContext: mockAudioContext,
        gainNode
      });
      const toneSequence = {
        tones: [{ frequency: 200, duration: 2000 }],
        waveform: Waveform.SQUARE,
        volume: 1,
        id: 'test'
      };
      soundPlayer.playToneSequence(toneSequence);
      soundPlayer.playToneSequence(toneSequence);

      expect(oscillator_start_spy).toHaveBeenCalledOnce();
    });

    test('stop', () => {
      mockOscillator = getMockOscillator();
      const oscillator_stop_spy = vi.spyOn(mockOscillator, 'stop');
      const soundPlayer = new SoundPlayerImpl({
        audioContext: mockAudioContext,
        gainNode
      });
      const toneSequence = {
        tones: [{ frequency: 200, duration: 2000 }],
        waveform: Waveform.SQUARE,
        volume: 1,
        id: 'test'
      };
      soundPlayer.playToneSequence(toneSequence);
      soundPlayer.stop(toneSequence.id);

      expect(oscillator_stop_spy).toHaveBeenCalled();
    });

    test('stopAllSounds', () => {
      const mockOscillator_1 = getMockOscillator();
      const oscillator_1_stop_spy = vi.spyOn(mockOscillator_1, 'stop');
      mockOscillator = mockOscillator_1;
      const soundPlayer = new SoundPlayerImpl({
        audioContext: mockAudioContext,
        gainNode
      });
      soundPlayer.playToneSequence({
        tones: [{ frequency: 100, duration: 1000 }],
        waveform: Waveform.SQUARE,
        volume: 1,
        id: '1'
      });
      const mockOscillator_2 = getMockOscillator();
      const oscillator_2_stop_spy = vi.spyOn(mockOscillator_2, 'stop');
      mockOscillator = mockOscillator_2;
      soundPlayer.playToneSequence({
        tones: [{ frequency: 200, duration: 2000 }],
        waveform: Waveform.SQUARE,
        volume: 1,
        id: '2'
      });
      soundPlayer.stopAllSounds();

      expect(oscillator_1_stop_spy).toHaveBeenCalledTimes(2);
      expect(oscillator_1_stop_spy).toHaveBeenLastCalledWith();
      expect(oscillator_2_stop_spy).toHaveBeenCalledTimes(2);
      expect(oscillator_2_stop_spy).toHaveBeenLastCalledWith();
    });
  });

  test('SoundPlayer#create', () => {
    class MockAudioContext {
      createGain = () => ({
        gain: {
          value: undefined
        },
        connect: () => {}
      });
    }
    vi.stubGlobal('AudioContext', MockAudioContext);
    SoundPlayer.create();
  });
});
