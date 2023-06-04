const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const isDev = process.env.npm_lifecycle_event === 'dev';

const plugins = [
  new webpack.DefinePlugin({
    $buildMode: isDev ? "'development'" : "'production'",
  }),
];

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index-browser',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'terminal-browser.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins,
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
