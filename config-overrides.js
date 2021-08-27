/* config-overrides.js */

module.exports = function override(config, env) {
  config.entry = './src/index.tsx';
  config.module.rules.push(
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      loader: 'eslint-loader',
      options: {
        // fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
      }
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        compilerOptions: {
          noEmit: false
        }
      }
    }
  );

  return config;
};
