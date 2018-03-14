# @vxna/mini-html-webpack-template

Minimum viable template for [mini-html-webpack-plugin](https://github.com/bebraw/mini-html-webpack-plugin)

## Warning

It does not work with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

## Usage

**webpack.config.js**

```js
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')

module.exports = {
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'sample-app',
        container: 'root',
        minify: false
      },
      template: require('@vxna/mini-html-webpack-template')
    })
  ]
}
```

## Options

|      Name       |    Type     |    Default     | Description                                            |
| :-------------: | :---------: | :------------: | :----------------------------------------------------- |
|   **`title`**   | `{String}`  | `'sample-app'` | Generated document title                               |
| **`container`** | `{String}`  |  `undefined`   | Application mount point, e.g.: `<div id="root"></div>` |
|  **`minify`**   | `{Boolean}` |     `true`     | Non-configurable & safe HTML minification              |

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
