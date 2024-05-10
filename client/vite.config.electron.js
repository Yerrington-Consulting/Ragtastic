import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Ensures resources are loaded relative to the index.html file
  plugins: [react()],
  build: {
    outDir: '../electron/app-dist',
    emptyOutDir: true, // Ensures the output directory is clean on every build
  }
});
