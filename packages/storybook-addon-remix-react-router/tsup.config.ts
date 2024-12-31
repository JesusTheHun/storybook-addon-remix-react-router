import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/manager.tsx', 'src/internals.ts'],
  splitting: false,
  minify: !options.watch,
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: 'browser',
  esbuildOptions(options) {
    options.conditions = ['module'];
    options.external = ['./package.json'];
  },
}));
