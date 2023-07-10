const webpackBase = require("../scripts/config/webpack.config.base.js");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackBase.resolve.alias,
    };

    return config;
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
