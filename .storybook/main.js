module.exports = {
  titlePrefix: "ReactRouterAddon",
  stories: [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["../preset.js", "@storybook/addon-essentials"],
    features: {
        storyStoreV7: false,
    }
};
