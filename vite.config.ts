import { UserConfig } from 'vite';

const config: UserConfig = {
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'space-engine',
      formats: ['es']
    }
  }
};

export default config;
