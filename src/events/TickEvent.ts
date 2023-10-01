import { Scene } from '../core/Scene.ts';
import { Keyboard } from '../input/Keyboard.ts';

export type TickEvent = Readonly<{
  scene: Scene;
  keyboard: Keyboard;
  dt: number;
}>;
