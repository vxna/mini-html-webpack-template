# @vxna/mini-html-webpack-template

[![Build Status](https://travis-ci.com/vxna/mini-html-webpack-template.svg)](https://travis-ci.com/vxna/mini-html-webpack-template) [![npm](https://img.shields.io/npm/v/@vxna/mini-html-webpack-template.svg)](https://www.npmjs.com/package/@vxna/mini-html-webpack-template)

Template for [mini-html-webpack-plugin](https://github.com/bebraw/mini-html-webpack-plugin) that extends default features with useful subset of options

## Warning

It does not work with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

## Common usage

**webpack.config.js**

```js
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')

module.exports = {
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'common-usage',
        favicon: 'https://assets-cdn.github.com/favicon.ico',
        container: 'root',
        trimWhitespace: true
      },
      template: require('@vxna/mini-html-webpack-template')
    })
  ]
}
```

## Common options

| Name                 | Type        | Default        | Description                        |
| -------------------- | ----------- | -------------- | ---------------------------------- |
| **`lang`**           | `{String}`  | `undefined`    | Set document language              |
| **`title`**          | `{String}`  | `'sample-app'` | Set document title                 |
| **`favicon`**        | `{String}`  | `undefined`    | Set document favicon               |
| **`container`**      | `{String}`  | `undefined`    | Set application mount point        |
| **`trimWhitespace`** | `{Boolean}` | `undefined`    | Safe document whitespace reduction |

## Extended usage

**webpack.config.js**

```js
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')

module.exports = {
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'extended-usage',
        head: {
          meta: [
            {
              name: 'description',
              content: 'mini-html-webpack-template'
            }
          ]
        },
        body: {
          raw: '<div id="root"></div>'
        },
        attrs: {
          js: {
            async: '',
            type: 'text/javascript'
          }
        }
      },
      template: require('@vxna/mini-html-webpack-template')
    })
  ]
}
```

## Extended options

| Name               | Type              | Default     | Description                               |
| ------------------ | ----------------- | ----------- | ----------------------------------------- |
| **`head.meta`**    | `{Array}`         | `undefined` | Array of objects with key + value pairs   |
| **`head.links`**   | `{Array}`         | `undefined` | Array of objects with key + value pairs   |
| **`head.scripts`** | `{Array}`         | `undefined` | Array of objects with key + value pairs   |
| **`head.raw`**     | `{Array\|String}` | `undefined` | Generates raw document markup             |
| **`body.scripts`** | `{Array}`         | `undefined` | Array of objects with key + value pairs   |
| **`body.raw`**     | `{Array\|String}` | `undefined` | Generates raw document markup             |
| **`attrs.js`**     | `{Object}`        | `undefined` | Applies html attributes to webpack output |
| **`attrs.css`**    | `{Object}`        | `undefined` | Applies html attributes to webpack output |

## Advanced minification

For custom needs [html-minifier](https://github.com/kangax/html-minifier) middleware and all of it's [options](https://github.com/kangax/html-minifier#options-quick-reference) could be used

**webpack.config.js**

```js
const { minify } = require('html-minifier')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')

module.exports = {
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'advanced-minification'
      },
      template: ctx =>
        minify(require('@vxna/mini-html-webpack-template')(ctx), {
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        })
    })
  ]
}
```

## Complex security features

[SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is out of scope of this project and it's recommended to use [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) with it's ecosystem tools.

## Inspired by

[html-webpack-template](https://github.com/jaketrent/html-webpack-template)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
