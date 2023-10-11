import { SoundPlayerImpl } from './SoundPlayerImpl';
import { Waveform } from './Waveform';

export type Tone = {
  /**
   * frequency in Hz
   */
  frequency: number;
  /**
   * duration in milliseconds
   */
  duration: number;
};

export type ToneSequence = Readonly<{
  tones: Tone[];
  waveform: Waveform;
  volume: number;
  /**
   * Used to uniquely identify a tone sequence.
   * If a tone sequence with the same ID is already playing, we will not play this one.
   */
  id?: string;
  callback?: () => void;
}>;

export interface SoundPlayer {
  playToneSequence: (toneSequence: ToneSequence) => void;
  stop: (id: string) => void;
  stopAllSounds: () => void;
}

export namespace SoundPlayer {
  export const create = (): SoundPlayer => {
    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    return new SoundPlayerImpl({ audioContext, gainNode });
  };
}
