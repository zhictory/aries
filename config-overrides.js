/* config-overrides.js */

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    loader: "eslint-loader",
  });
  return config;
};
