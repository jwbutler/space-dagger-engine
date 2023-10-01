import { Keyboard } from '../input/Keyboard.ts';
import { Entity } from './Entity';
import { Scene } from '../core/Scene';

/**
 * TODO: This is an implicit "handleTickEvent"
 */
export type EntityScript = Readonly<{
  update: (entity: Entity, scene: Scene, keyboard: Keyboard, dt: number) => void;
}>;
