import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Set these as high as you can
    coverage: {
      all: true,
      statements: 94,
      branches: 97,
      functions: 92,
      lines: 94,
      include: ['src/**/*.ts'],
      exclude: [
        // exclude some false negatives
        'src/**/index.ts',
        'src/vite-env.d.ts',
        'src/entities/EntityProps.ts',
        'src/entities/EntityScript.ts',
        'src/events/GlobalScript.ts',
        'src/events/TickEvent.ts',
        'src/graphics/Sprite.ts',
        'src/graphics/ui/TextElement.ts',
        'src/graphics/ui/UIElement.ts'
      ]
    }
  }
});
