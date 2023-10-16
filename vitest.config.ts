import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Set these as high as you can
    coverage: {
      all: true,
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      include: ['src/**/*.ts'],
      exclude: [
        // exclude type definitions since they are logicless
        'src/**/*.d.ts',
        'src/vite-env.d.ts',
        // exclude some false negatives
        'src/**/index.ts',
        'src/entities/EntityProps.ts',
        'src/entities/behaviors/EntityBehavior.ts',
        'src/events/CollisionEvent.ts',
        'src/events/DestroyEvent.ts',
        'src/events/EntityInitEvent.ts',
        'src/events/EntityScript.ts',
        'src/events/GlobalScript.ts',
        'src/events/RenderEvent.ts',
        'src/events/TickEvent.ts',
        'src/events/UpdateEvent.ts',
        'src/graphics/Sprite.ts',
        'src/graphics/ui/UIElement.ts',
        // This one is just bullshit, it reports missing coverage on an empty brace.
        'src/audio/Waveform.ts'
      ]
    }
  }
});
