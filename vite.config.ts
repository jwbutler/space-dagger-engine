import vitePlugin_checker from 'vite-plugin-checker';
import { UserConfig } from 'vite';

const config: UserConfig = {
  assetsInclude: 'png/**/*.png',
  build: {
    assetsInlineLimit: 0
  },
  plugins: [
    vitePlugin_checker({
      typescript: true
    })
  ]
};

export default config;
