import { TickEvent } from './TickEvent';

export type GlobalScript = Readonly<{
  onTick: (event: TickEvent) => void;
}>;
