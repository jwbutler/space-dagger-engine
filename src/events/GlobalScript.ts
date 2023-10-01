import { TickEvent } from './TickEvent.ts';

export type GlobalScript = Readonly<{
  onTick: (event: TickEvent) => void;
}>;
