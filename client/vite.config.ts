import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
    host: true,
    hmr: {
        port: 'localhost',
     },
  },
  plugins: [react()],
  resolve: {
    alias: {
      features: path.resolve(__dirname, 'src/features'),
      selectors: path.resolve(__dirname, 'src/selectors'),
      slices: path.resolve(__dirname, 'src/slices'),
      services: path.resolve(__dirname, 'src/services'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      components: path.resolve(__dirname, 'src/components'),
      types: path.resolve(__dirname, 'src/types'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
});
