import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/global/variables.scss";
          @import "@/global/functions.scss";
          @import "@/global/breakpoints.scss";
          @import "@/global/animations.scss";
        `,
      },
    },
  },
});
