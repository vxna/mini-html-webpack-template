const {
  html,
  oneLineTrim,
  TemplateTag,
  trimResultTransformer,
  replaceResultTransformer
} = require('common-tags')

function template(ctx) {
  const {
    publicPath,
    css,
    js,
    lang,
    title,
    favicon,
    container,
    head = {},
    body = {},
    attrs = {},
    trimWhitespace
  } = ctx

  const doc = html`
  <!DOCTYPE html>
  ${lang ? `<html lang="${lang}">` : '<html>'}
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${title || 'sample-app'}</title>
      ${favicon && `<link rel="icon" type="image/x-icon" href="${favicon}">`}
      ${generateTags(head.meta, 'meta')}
      ${generateTags(head.links, 'link')}
      ${generateTags(head.style, 'style')}
      ${generateTags(head.scripts, 'script')}
      ${generateRawTags(head.raw)}
      ${webpackArtifacts(css, publicPath, attrs.css, 'link')}
    </head>
    <body>
      ${container && `<div id="${container}"></div>`}
      ${generateRawTags(body.raw)}
      ${generateTags(body.scripts, 'script')}
      ${webpackArtifacts(js, publicPath, attrs.js, 'script')}
    </body>
  </html>`

  return trimWhitespace ? oneLineTrim(doc) : emptyLineTrim(doc)
}

function mapAttrs(tag) {
  return Object.keys(tag)
    .map(attr => `${attr}="${tag[attr]}"`)
    .join(' ')
}

function generateTags(tags = [], type) {
  const closing = type === ('script' || 'style') ? `></${type}>` : '>'
  return tags.map(tag => `<${type} ${mapAttrs(tag)}${closing}`)
}

function generateRawTags(tags = []) {
  if (typeof tags === 'string' || tags instanceof String) {
    return tags
  }
  return tags.map(tag => tag)
}

function webpackArtifacts(files = [], publicPath = '', attrs = {}, type) {
  const tag = file =>
    type === 'script'
      ? Object.assign(attrs, { src: publicPath + file })
      : Object.assign(attrs, { rel: 'stylesheet', href: publicPath + file })

  return files.map(file => generateTags([tag(file)], type)).join('\n')
}

const emptyLineTrim = new TemplateTag(
  replaceResultTransformer(/^\s*[\r\n]/gm, ''),
  trimResultTransformer
)

module.exports = template
