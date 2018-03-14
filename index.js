const {
  html,
  oneLineTrim,
  TemplateTag,
  trimResultTransformer,
  replaceResultTransformer
} = require('common-tags')

const {
  generateCSSReferences,
  generateJSReferences
} = require('mini-html-webpack-plugin')

function template(ctx) {
  const { css, js, title, container, minify } = ctx

  const doc = html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>${title || 'default'}</title>
      ${generateCSSReferences(css)}
    </head>
    <body>
      ${container && `<div id="${container}"></div>`}
      ${generateJSReferences(js)}
    </body>
  </html>`

  return minify || process.env.NODE_ENV === 'production'
    ? oneLineTrim(doc)
    : emptyLineTrim(doc)
}

const emptyLineTrim = new TemplateTag(
  replaceResultTransformer(/^\s*[\r\n]/gm, ''),
  trimResultTransformer
)

module.exports = template
