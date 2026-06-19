import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'components/index.ts'),
      name: 'PlantFaced',
      formats: ['es'],
      fileName: () => 'components.es.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
    },
    outDir: 'dist/lib',
    emptyOutDir: true,
  },
});
