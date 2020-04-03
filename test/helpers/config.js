const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getConfig = ({ options }, config = {}) => {
  const defaults = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [
      new MiniHtmlWebpackPlugin({
        context: options,
        template: require('../../src'),
      }),
      new MiniCssExtractPlugin(),
    ],
  }

  return { ...defaults, ...config }
}

module.exports = getConfig
