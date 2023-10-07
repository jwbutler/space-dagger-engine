import { Engine } from '../core/Engine';

export type DestroyEvent = Readonly<{
  engine: Engine;
  dt: number;
}>;
