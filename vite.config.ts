import { UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
  },
  plugins: [dts()]
};

export default config;
