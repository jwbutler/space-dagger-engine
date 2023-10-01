import { test, expect } from 'vitest';
import { ShipScript } from '../../src/./dagger/ShipScript';
import { Entity } from '../../src/entities/Entity';
import { Scene } from '../../src/core/Scene';
import { Keyboard } from '../../src/input/Keyboard';

/** REALLY bad test for coverage */
test('ship script', () => {
  const script = ShipScript.create();
  const ship = {
    setMaxSpeed: () => {}
  } as unknown as Entity;
  const scene = {} as Scene;
  const inputHandler = {
    getHeldKeys: () => []
  } as unknown as Keyboard;
  expect(() => {
    script.update(ship, scene, inputHandler, 1);
  }).not.toThrow();
});
