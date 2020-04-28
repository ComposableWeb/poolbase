const baseConfig = require('../../.eslintrc.js');

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...baseConfig.parserOptions,
    project: './src/app/tsconfig.json',
  }
};
