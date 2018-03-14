# @vxna/mini-html-webpack-template

Template for [mini-html-webpack-plugin](https://github.com/bebraw/mini-html-webpack-plugin), that extends default features with html minification and useful subset of options

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
        container: 'root',
        minify: false
      },
      template: require('@vxna/mini-html-webpack-template')
    })
  ]
}
```

## Common options

|      Name       |    Type     |    Default     | Description             |
| :-------------: | :---------: | :------------: | :---------------------- |
|   **`lang`**    | `{String}`  |  `undefined`   | Document language       |
|   **`title`**   | `{String}`  | `'sample-app'` | Document title          |
| **`container`** | `{String}`  |  `undefined`   | Application mount point |
|  **`minify`**   | `{Boolean}` |     `true`     | Safe HTML minification  |

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
            },
            {
              property: 'og:description',
              content: 'mini-html-webpack-template'
            }
          ],
          links: [
            {
              rel: 'shortcut icon',
              href: 'https://assets-cdn.github.com/favicon.ico',
              type: 'image/x-icon'
            }
          ]
        },
        body: {
          raw: '<div id="root"></div>'
        }
      },
      template: require('@vxna/mini-html-webpack-template')
    })
  ]
}
```

## Extended options

|        Name        |       Type       |   Default   | Description                             |
| :----------------: | :--------------: | :---------: | :-------------------------------------- |
|  **`head.meta`**   |    `{Array}`     | `undefined` | Array of objects with key + value pairs |
|  **`head.links`**  |    `{Array}`     | `undefined` | Array of objects with key + value pairs |
| **`head.scripts`** |    `{Array}`     | `undefined` | Array of objects with key + value pairs |
|   **`head.raw`**   | `{Array\|String}` | `undefined` | Raw document markup                     |
| **`body.scripts`** |    `{Array}`     | `undefined` | Array of objects with key + value pairs |
|   **`body.raw`**   | `{Array\|String}` | `undefined` | Raw document markup                     |

## Inspired by

[html-webpack-template](https://github.com/jaketrent/html-webpack-template)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
