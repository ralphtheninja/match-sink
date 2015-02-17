var test = require('tape')
var wait = require('../')

test('wait-sink', function (t) {
  t.throws(function () { wait() })
  t.throws(function () { wait({}) })
  t.throws(function () { wait({ regex: /foo/gi }) })
  t.throws(function () { wait(/foo/gi) })
  t.throws(function () { wait({ regex: new RegExp('bar') }) })
  t.throws(function () { wait(new RegExp('bar')) })
  t.doesNotThrow(function () { wait({ regex: /foo/gi }, function () {}) })
  t.doesNotThrow(function () { wait(/foo/gi, function () {}) })
  t.doesNotThrow(function () { wait({ regex: new RegExp('bar') }, function () {}) })
  t.doesNotThrow(function () { wait(new RegExp('bar'), function () {}) })
  t.end()
})

var sink = require('../')
var spawn = require('child_process').spawn
spawn('ls', [ '-lh' ]).stdout.pipe(sink(/total\s+(\S+)/gi, function (match) {
  console.log(match[1])
}))

// TODO add some real parsing tests, for multiple and single matches
//test('', function (t) {
  //t.end()
//})
