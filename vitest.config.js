import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    setupFiles: ['./src/setupTests.ts'],
    threads: true,
    testTimeout: 20000,
  },
});
