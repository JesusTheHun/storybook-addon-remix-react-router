module.exports = {
  titlePrefix: "ReactRouterAddon",
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["../preset.js", "@storybook/addon-essentials"],
    features: {
        storyStoreV7: false,
    }
};
