/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['storybook-addon-remix-react-router'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
