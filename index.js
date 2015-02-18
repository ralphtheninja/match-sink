var through = require('through2')
var util = require('core-util-is')

function matchSink(opts, iter) {

  var regex = util.isRegExp(opts) ? opts : opts.regex
  if (!util.isRegExp(regex)) throw new Error('missing regular expression')
  if (typeof iter != 'function') throw new Error('missing callback')

  var matched = false

  return through(function (chunk, enc, callback) {
    var str = chunk.toString()
    var match = regex.exec(str)

    if (match) {
      if (true === opts.matchAll) {
        iter(match)
      }
      else if (false === matched) {
        matched = true
        iter(match)
      }
    }

    this.push(chunk)
    callback()
  })

}

module.exports = matchSink
