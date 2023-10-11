export enum Waveform {
  SINE = 'SINE',
  SQUARE = 'SQUARE',
  TRIANGLE = 'TRIANGLE'
}

export namespace Waveform {
  export const toOscillatorType = (waveform: Waveform) => {
    switch (waveform) {
      case Waveform.SINE:
        return 'sine';
      case Waveform.SQUARE:
        return 'square';
      case Waveform.TRIANGLE:
        return 'triangle';
    }
  };
}
