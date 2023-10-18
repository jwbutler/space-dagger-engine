import { UserConfig } from 'vite';
import vitePlugin_dts from 'vite-plugin-dts';
import vitePlugin_checker from 'vite-plugin-checker';

const config: UserConfig = {
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        'audio/index': 'src/audio/index.ts',
        'entities/index': 'src/entities/index.ts',
        'events/index': 'src/events/index.ts',
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
    vitePlugin_dts({
      rollupTypes: false,
      include: 'src/**/*.ts'
    }),
    vitePlugin_checker({
      typescript: true
    })
  ]
};

export default config;
