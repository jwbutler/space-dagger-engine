import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Set these as high as you can
    coverage: {
      all: true,
      statements: 93,
      branches: 95,
      functions: 90,
      lines: 93,
      include: ['src/**/*.ts'],
      exclude: [
        // exclude specific files that only consist of type exports
        'src/**/index.ts',
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
