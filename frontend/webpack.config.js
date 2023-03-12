const path = require('path'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  Dotenv = require('dotenv-webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
require('webpack');

const isDevelopmentMode = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local',
  isProductionMode = process.env.NODE_ENV === 'production',
  isDebugMode = process.env.NODE_ENV === 'debug';

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  mode: isProductionMode || isDebugMode ? 'production' : 'development',
  output: {
    filename: 'app.js',
    path: path.resolve('..', 'backend', 'dist', 'src', 'public', 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.scss'],
    // alias: {},
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    historyApiFallback: true,
    compress: true,
    port: 80,
  },
  devtool: isDevelopmentMode ? 'eval-cheap-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1,
          },
        },
        generator: {
          filename: `assets/fonts/${isProductionMode ? '[hash]' : '[name]'}[ext]`,
        },
      },
      {
        test: /\.svg/,
        exclude: [path.resolve(__dirname, 'src/assets/image')],
        loader: 'svg-url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
      },
      templateContent: `
            <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                        <title>Face2Une</title>
                        <meta name="msapplication-TileColor" content="#da532c">
                        <meta name="theme-color" content="#ffffff">
                    </head>
                    <body>
                        <div id="root"></div>
                    </body>
                </html>
            `,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new Dotenv({ systemvars: true }),
    new CleanWebpackPlugin(),
  ],
};
