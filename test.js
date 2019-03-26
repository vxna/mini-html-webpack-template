const path = require('path')
const compiler = require('@webpack-contrib/test-utils')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getConfig = (options, config = {}) =>
  Object.assign(
    {
      entry: path.resolve(__dirname, 'test', 'fixtures'),
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ],
      plugins: [
        new MiniHtmlWebpackPlugin({
          context: options,
          template: require('./')
        }),
        new MiniCssExtractPlugin()
      ]
    },
    config
  )

test('options: common', () => {
  return compiler(
    {},
    getConfig({
      title: 'common options',
      favicon: '/favicon.ico',
      container: 'root'
    })
  ).then(result => {
    expect(result.compilation.assets['index.html']._value).toMatchSnapshot()
  })
})

test('options: advanced', () => {
  return compiler(
    {},
    getConfig({
      lang: 'en',
      title: 'advanced options',
      head: {
        meta: [
          {
            name: 'description',
            content: 'mini-html-webpack-template'
          },
          {
            property: 'og:description',
            content: 'mini-html-webpack-template'
          }
        ],
        links: [
          {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
          }
        ],
        scripts: [
          {
            defer: '',
            type: 'text/javascript',
            src: 'https://unpkg.com/random'
          }
        ],
        raw: '<style id="head-raw-string"></style>'
      },
      body: {
        raw: [
          '<script id="body-raw-array-1"></script>',
          '<script id="body-raw-array-2"></script>'
        ]
      }
    })
  ).then(result => {
    expect(result.compilation.assets['index.html']._value).toMatchSnapshot()
  })
})

test('options: output attrs', () => {
  return compiler(
    {},
    getConfig({
      title: 'output attrs',
      favicon: '/favicon.ico',
      container: 'root',
      attrs: {
        js: [{ async: '', type: 'text/javascript' }],
        css: [{ type: 'text/css' }]
      }
    })
  ).then(result => {
    expect(result.compilation.assets['index.html']._value).toMatchSnapshot()
  })
})

test('options: trim whitespace', () => {
  return compiler(
    {},
    getConfig({
      title: 'trim whitespace',
      favicon: '/favicon.ico',
      container: 'root',
      trimWhitespace: true
    })
  ).then(result => {
    expect(result.compilation.assets['index.html']._value).toMatchSnapshot()
  })
})
