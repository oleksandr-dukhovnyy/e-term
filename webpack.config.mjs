import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';
import fs from 'node:fs';

const { version } = JSON.parse(
  fs.readFileSync(path.resolve('./package.json')).toString()
);

const isDev = process.env.npm_lifecycle_event.includes('dev');

export default {
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: { terminal: `./src/index.js` },
  output: {
    path: path.resolve('dist'),
    filename: `[name].js`,
    library: 'ETerminal',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
    clean: !isDev,
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
  plugins: [
    new webpack.DefinePlugin({
      $buildMode: isDev ? "'development'" : "'production'",
      VERSION: `'${version}'`,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.s?[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
