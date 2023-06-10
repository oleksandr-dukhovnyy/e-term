const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const { version } = require('./package.json');

const isDev = process.env.npm_lifecycle_event === 'dev';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'e-term',
    inject: 'body',
    template: path.resolve(__dirname, './src/html/index.html'),
    minify: !isDev,
    favicon: './src/imgs/favicon.ico',
  }),
  new webpack.DefinePlugin({
    $buildMode: isDev ? "'development'" : "'production'",
    VERSION: `'${version}'`,
  }),
  new MiniCssExtractPlugin(),
];

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: { terminal: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.sass', '.scss'],
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: !isDev },
            },
          ],
        },
      }),
    ],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
