import { UserConfig } from 'vite';

const config: UserConfig = {
  build: {
    lib: {
      entry: [
        'src/index.ts',
        'src/entities/index.ts',
        'src/geometry/index.ts',
        'src/graphics/index.ts',
        'src/utils/index.ts'
      ],
      name: 'space-dagger-engine',
      formats: ['es']
    }
  }
};

export default config;
