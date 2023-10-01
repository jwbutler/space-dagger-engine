import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Set these as high as you can
    coverage: {
      all: true,
      statements: 47,
      branches: 78,
      functions: 63,
      lines: 47
    }
  }
});
