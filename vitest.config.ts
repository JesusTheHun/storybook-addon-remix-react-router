import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: './vitest.workspace.ts',
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
