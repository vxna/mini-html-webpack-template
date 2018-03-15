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
  let { css, js, lang, title, head = [], body = [], container, minify } = ctx

  const doc = html`
  <!DOCTYPE html>
  <html ${lang && `lang=${lang}`}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${title || 'sample-app'}</title>
      ${generateMetaTags(head.meta)}
      ${generateLinkTags(head.links)}
      ${generateRawTags(head.raw)}
      ${generateScriptTags(head.scripts)}
      ${generateCSSReferences(css)}
    </head>
    <body>
      ${container && `<div id="${container}"></div>`}
      ${generateRawTags(body.raw)}
      ${generateScriptTags(body.scripts)}
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

const wrap = item =>
  Object.entries(item)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ')

function generateMetaTags(items = []) {
  return items.map(item => `<meta ${wrap(item)}>`)
}

function generateLinkTags(items = []) {
  return items.map(item => `<link ${wrap(item)}>`)
}

function generateScriptTags(items = []) {
  return items.map(item => `<script ${wrap(item)}></script>`)
}

function generateRawTags(items = [] || '') {
  if (typeof items === 'string' || items instanceof String) {
    return items
  }
  return items.map(item => item)
}

module.exports = template
