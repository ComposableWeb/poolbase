const baseConfig = require('../../.eslintrc.js');

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...baseConfig.parserOptions,
    project: './src/functions/tsconfig.json',
  }
};
