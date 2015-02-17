var through = require('through2')
var util = require('core-util-is')

function matchSink(opts, callback) {

  var regex = util.isRegExp(opts) ? opts : opts.regex
  if (!util.isRegExp(regex)) throw new Error('missing regular expression')
  if (typeof callback != 'function') throw new Error('missing callback')

  var matched = false

  return through(function (chunk, enc, next) {
    var str = chunk.toString()
    var match = regex.exec(str)

    // did not find it -> keep parsing
    if (!match) return next()

    // found it
    if (true === opts.matchAll) {
      return callback(match)
    }

    // match once
    if (false === matched) {
      matched = true
      return callback(match)
    }

  })

}

module.exports = matchSink
