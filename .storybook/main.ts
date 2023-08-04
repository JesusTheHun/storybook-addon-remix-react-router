import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  addons: ['./local-preset.js'],
};

export default config;
