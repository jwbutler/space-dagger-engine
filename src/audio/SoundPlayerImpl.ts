import { SoundPlayer, ToneSequence } from './SoundPlayer';
import { check } from '../utils';
import { Waveform } from './Waveform';

const BASE_GAIN = 0.25;

type Props = Readonly<{
  audioContext: AudioContext;
  gainNode: GainNode;
}>;

export class SoundPlayerImpl implements SoundPlayer {
  private readonly context: AudioContext;
  private readonly gainNode: GainNode;
  private readonly oscillators: Set<OscillatorNode>;
  private readonly oscillatorsById: Record<string, OscillatorNode>;

  constructor({ audioContext, gainNode }: Props) {
    this.context = audioContext;
    this.gainNode = gainNode;
    this.gainNode.gain.value = BASE_GAIN;
    this.gainNode.connect(this.context.destination);
    this.oscillators = new Set();
    this.oscillatorsById = {};
  }

  /**
   * TODO: Needs performance testing.  We're allocating a new OscillatorNode and GainNode per method call.
   */
  playToneSequence = (toneSequence: ToneSequence) => {
    const { tones, waveform, volume, id, callback } = toneSequence;
    check(volume > 0 && volume <= 1);
    if (tones.length === 0) return;
    if (id && this.oscillatorsById[id]) return;

    const { context, gainNode, oscillators, oscillatorsById } = this;

    const oscillator = context.createOscillator();
    oscillator.type = Waveform.toOscillatorType(waveform);

    const oscillatorGainNode = context.createGain();
    oscillatorGainNode.gain.value = volume;
    oscillatorGainNode.connect(gainNode);

    let nextStartTime = context.currentTime;
    oscillator.frequency.value = tones[0].frequency;
    for (let i = 0; i < tones.length; i++) {
      const { frequency, duration } = tones[i];
      oscillator.frequency.setValueAtTime(frequency, nextStartTime);
      nextStartTime += duration / 1000;
    }
    oscillator.connect(oscillatorGainNode);

    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      oscillatorGainNode.disconnect();
      oscillators.delete(oscillator);
      if (id) {
        delete oscillatorsById[id];
      }
      if (callback) {
        callback();
      }
    });

    oscillator.start();
    oscillator.stop(nextStartTime);
    oscillators.add(oscillator);
    if (id) {
      oscillatorsById[id] = oscillator;
    }
  };

  stop = (id: string) => {
    const oscillator = this.oscillatorsById[id];
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
    }
    delete this.oscillatorsById[id];
  };

  stopAllSounds = (): void => {
    for (const oscillator of this.oscillators) {
      oscillator.stop();
      oscillator.disconnect();
    }
    this.oscillators.clear();
    for (const id of Object.keys(this.oscillatorsById)) {
      delete this.oscillatorsById[id];
    }
  };
}
