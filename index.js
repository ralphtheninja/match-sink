const through = require('through2')
const util = require('core-util-is')

function matchSink (opts, iter) {
  const regex = util.isRegExp(opts) ? opts : opts.regex
  if (!util.isRegExp(regex)) throw new Error('missing regular expression')
  if (typeof iter !== 'function') throw new Error('missing callback')

  let matched = false

  return through(function (chunk, enc, callback) {
    const match = regex.exec(chunk.toString())

    if (match) {
      if (opts.matchAll === true) {
        iter(match)
      } else if (matched === false) {
        matched = true
        iter(match)
      }
    }

    this.push(chunk)
    callback()
  })
}

module.exports = matchSink
