import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keep a single copy of react / react-router so the prebuilt addon shares this
  // project's react-router 8 + react 19 instead of its own build-time devDependencies.
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router'],
  },
});
