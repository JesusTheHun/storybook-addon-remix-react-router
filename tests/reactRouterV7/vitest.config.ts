import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    globals: true,
    environment: 'happy-dom',
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    setupFiles: ['./setupTests.ts'],
    testTimeout: 20000,
  },
});
