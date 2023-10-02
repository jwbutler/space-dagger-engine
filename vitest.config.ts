import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Set these as high as you can
    coverage: {
      all: true,
      statements: 78,
      branches: 90,
      functions: 78,
      lines: 78
    }
  }
});
