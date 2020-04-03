const compiler = require('./helpers/compiler')
const getConfig = require('./helpers/config')

test('options: common', async () => {
  const config = getConfig({
    options: {
      title: 'common options',
      favicon: '/favicon.ico',
      container: 'root',
    },
  })

  const stats = await compiler('base.js', config)
  const asset = stats.compilation.assets['index.html']._value

  expect(asset).toMatchSnapshot()
})

test('options: advanced', async () => {
  const config = getConfig({
    options: {
      lang: 'en',
      title: 'advanced options',
      head: {
        meta: [
          {
            name: 'description',
            content: 'mini-html-webpack-template',
          },
          {
            property: 'og:description',
            content: 'mini-html-webpack-template',
          },
        ],
        links: [
          {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico',
          },
        ],
        scripts: [
          {
            defer: '',
            type: 'text/javascript',
            src: 'https://unpkg.com/random',
          },
        ],
        raw: '<style id="head-raw-string"></style>',
      },
      body: {
        raw: [
          '<script id="body-raw-array-1"></script>',
          '<script id="body-raw-array-2"></script>',
        ],
      },
    },
  })

  const stats = await compiler('base.js', config)
  const asset = stats.compilation.assets['index.html']._value

  expect(asset).toMatchSnapshot()
})

test('options: output attrs', async () => {
  const config = getConfig({
    options: {
      title: 'output attrs',
      favicon: '/favicon.ico',
      container: 'root',
      attrs: {
        js: { async: '', type: 'text/javascript' },
        css: { type: 'text/css' },
      },
    },
  })

  const stats = await compiler('base.js', config)
  const asset = stats.compilation.assets['index.html']._value

  expect(asset).toMatchSnapshot()
})

test('options: trim whitespace', async () => {
  const config = getConfig({
    options: {
      title: 'trim whitespace',
      favicon: '/favicon.ico',
      container: 'root',
      trimWhitespace: true,
    },
  })

  const stats = await compiler('base.js', config)
  const asset = stats.compilation.assets['index.html']._value

  expect(asset).toMatchSnapshot()
})
