import { Engine } from '../core/Engine.ts';

export type TickEvent = Readonly<{
  engine: Engine;
  dt: number;
}>;
