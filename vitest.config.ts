import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'packages/*/vitest.config.ts',
      'tests/*/vitest.config.ts',
    ],
    sequence: {
      setupFiles: 'list',
      hooks: 'stack',
    },
    reporters: ['default', 'html'],
    outputFile: {
      html: './tests-report/index.html',
    },
  },
});
