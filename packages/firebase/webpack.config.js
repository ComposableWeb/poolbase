const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');

module.exports = {
  entry: './functions/index.ts',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'inline-source-map',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals({ modulesFromFile: true }), 'firebase-functions', 'firebase-admin', 'firebase'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/functions'),
    libraryTarget: 'commonjs',
  },
  plugins: [
    new CopyPkgJsonPlugin({
      remove: ['devDependencies'],
    }),
  ],
};
