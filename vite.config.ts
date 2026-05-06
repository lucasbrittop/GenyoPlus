import { defineConfig } from 'vite';
import { resolve } from 'path';
import { cpSync } from 'fs';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: { content: resolve(__dirname, 'src/content.ts') },
      output: { entryFileNames: '[name].js', format: 'iife' },
    },
  },
  plugins: [{
    name: 'copy-manifest',
    closeBundle() {
      cpSync('public', 'dist', { recursive: true });
    },
  }],
});
