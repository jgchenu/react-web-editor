const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const webpack = require('webpack');
const alias = require('./alias');
const __DEV__ = process.env.NODE_ENV === 'development';
const __MOCK__ = process.env.MOCK;

const ROOT_PATH = path.resolve(__dirname, '.');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const mode = __DEV__ ? 'development' : 'production';

const styleLoaderOrMiniCssLoader = __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader;
const config = {
  mode,
  devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',
  entry: path.resolve(ROOT_PATH, './src/index.tsx'),
  output: {
    filename: __DEV__ ? '[name].js' : '[name]-[contenthash].js',
    chunkFilename: __DEV__ ? '[name].js' : '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    compress: true,
    open: false,
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    static: {
      directory: path.resolve(ROOT_PATH, 'static'),
    },
    allowedHosts: 'all',
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [path.resolve(ROOT_PATH, 'src/styles/variables.less')],
              injector: 'append',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // ????????????less-loader@5???????????? lessOptions ??????????????????????????????
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
        include: /node_modules/,
        exclude: /node_modules\/.*\/content\.min\.css/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
        include: /node_modules\/.*\/content\.min\.css/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024, // 1kb
          },
        },
      },
      {
        test: /\.(ttf|eot|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
      __MOCK__: JSON.stringify(__MOCK__),
    }),
    new StyleLintPlugin({
      context: path.resolve(ROOT_PATH, 'src'),
      files: ['**/*.css', '**/*.less'],
    }),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(ROOT_PATH, './static/template.html'),
      minify: {
        collapseWhitespace: !__DEV__,
      },
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      failOnError: !__DEV__,
      extensions: ['js', 'ts', 'jsx', 'tsx'],
    }),
    new MiniCssExtractPlugin({
      filename: __DEV__ ? '[name].css' : '[name]-[contenthash].css',
      chunkFilename: __DEV__ ? '[name].css' : '[name]-[contenthash].css',
    }),
    new AntdDayjsWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      ...alias,
    },
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

// hmr react
if (__DEV__) {
  config.plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }));
}

module.exports = config;

console.log('current env', __DEV__, __MOCK__);
