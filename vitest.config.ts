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
        // exclude some false negatives
        'src/**/index.ts',
        'src/vite-env.d.ts',
        'src/entities/EntityProps.ts',
        'src/entities/EntityScript.ts',
        'src/entities/behaviors/EntityBehavior.ts',
        'src/events/GlobalScript.ts',
        'src/events/TickEvent.ts',
        'src/graphics/Sprite.ts',
        'src/graphics/ui/TextElement.ts',
        'src/graphics/ui/UIElement.ts'
      ]
    }
  }
});
