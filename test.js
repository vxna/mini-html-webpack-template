const compiler = require('@webpack-contrib/test-utils')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')

const getConfig = (options, config = {}) =>
  Object.assign(
    {
      entry: ['./index.js'],
      plugins: [
        new MiniHtmlWebpackPlugin({
          context: options,
          template: require('./')
        })
      ]
    },
    config
  )

test('common options', () => {
  return compiler(
    {},
    getConfig({
      title: 'common options',
      favicon: '/favicon.ico',
      container: 'root',
      trimWhitespace: true
    })
  ).then(result => {
    expect(result.compilation.assets['index.html']._value).toMatchSnapshot()
  })
})

test('advanced options', () => {
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
            async: '',
            type: 'text/javascript',
            src: '/bundle.js'
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
