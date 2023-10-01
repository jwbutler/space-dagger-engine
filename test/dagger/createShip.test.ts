import { test, expect } from 'vitest';
import { createPlayerShip } from '../../src/dagger/playerShip';
import { Coordinates } from '../../src/geometry/Coordinates';

test('ship', async () => {
  const ship = await createPlayerShip({ centerCoordinates: Coordinates.zero() });
  expect(ship.getName()).toBe('ship');
  expect(ship.getCenterCoordinates()).toEqual(Coordinates.zero());
});
