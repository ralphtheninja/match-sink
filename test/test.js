var sink = require('../')
var test = require('tape')
var split = require('split')
var spawn = require('child_process').spawn

test('match-sink', function (t) {
  t.throws(function () { sink() }, 'no parameters')
  t.throws(function () { sink({}) }, 'empty options')
  t.throws(function () { sink({ regex: /foo/gi }) }, 'missing callback')
  t.throws(function () { sink(/foo/gi) }, 'missing callback')
  t.throws(function () {
    sink({ regex: new RegExp('bar') })
  }, 'missing callback')
  t.throws(function () {
    sink(new RegExp('bar'))
  }, 'missing callback')
  t.doesNotThrow(function () {
    sink({ regex: /foo/gi }, function () {})
  }, 'valid parameters')
  t.doesNotThrow(function () {
    sink(/foo/gi, function () {})
  }, 'valid parameters')
  t.doesNotThrow(function () {
    sink({ regex: new RegExp('bar') }, function () {})
  }, 'valid parameters')
  t.doesNotThrow(function () {
    sink(new RegExp('bar'), function () {})
  }, 'valid parameters')
  t.end()
})

test('single match while parsing file size from from ls -lh', function (t) {
  var count = 0
  var child = spawn('ls', [ '-lh' ])
  child.stdout.pipe(split()).pipe(sink(/^total\s+(\S+)/, function (match) {
    ++count
  }))
  child.on('close', function (code) {
    t.equal(count, 1, 'should be a single match')
    t.end()
  })
})

test('multiple match while parsing output from ls -al', function (t) {
  var count = 0
  var child = spawn('ls', [ '-al' ], { cwd: __dirname })
  var opts = { regex: /^d/i, matchAll: true }
  child.stdout.pipe(split()).pipe(sink(opts, function (match) {
    ++count
  }))
  child.on('close', function (code) {
    t.equal(count, 2, 'should match folders . and ..')
    t.end()
  })
})
