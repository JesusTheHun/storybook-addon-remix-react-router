import { defineProject } from 'vitest/config';

export default defineProject({
  // The addon is built against its own react-router 7 / react 18 devDependencies.
  // When this project consumes the built addon, dedupe forces a single copy of
  // each package so the addon runs against this project's react-router 8 / react 19
  // (otherwise mismatched copies break React element identity and router context).
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router'],
  },
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
