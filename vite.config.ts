import { UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

const config: UserConfig = {
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        'entities/index': 'src/entities/index.ts',
        'geometry/index': 'src/geometry/index.ts',
        'graphics/index': 'src/graphics/index.ts',
        'utils/index': 'src/utils/index.ts'
      },
      name: 'space-dagger-engine',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        preserveModules: true
      }
    }
  },
  plugins: [
    dts({
      rollupTypes: false,
      include: 'src/**/*.ts'
    })
  ]
};

export default config;
