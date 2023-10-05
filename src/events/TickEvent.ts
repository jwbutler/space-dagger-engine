import { Engine } from '../core/Engine';

export type TickEvent = Readonly<{
  engine: Engine;
  dt: number;
}>;
