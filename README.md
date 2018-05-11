# match-sink

> Pipe data to a stream and react to single or multiple matches

[![npm](https://img.shields.io/npm/v/match-sink.svg)](https://www.npmjs.com/package/match-sink)
![Node version](https://img.shields.io/node/v/match-sink.svg)
[![Build Status](https://travis-ci.org/ralphtheninja/match-sink.svg?branch=master)](https://travis-ci.org/ralphtheninja/match-sink)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

* Pipe data to a stream and get notified when something matches
* Match once or multiple times

Can be useful for various things. Imagine some data stream you want to react to. It could be a server listening on some port so you know when to start interacting with it.

## Install

```
$ npm install match-sink -S
```

## Usage

The following example prints out the total file size in the current directory:

```js
const sink = require('match-sink')
const spawn = require('child_process').spawn
spawn('ls', [ '-lh' ]).stdout.pipe(sink(/total\s+(\S+)/gi, match => {
  console.log(match[1])
}))
```

## Api

### `const sink = require('match-sink')`

Returns a stream constructor.

### `const stream = sink(opts, cb)`

Returns a writable stream.

* `opts` *(object|regexp)* Either options object with `regexp` and `matchAll` properties or a single regular expression.
* `cb` *(function)* Callback. Will act as an iterator if there are several matches and `matchAll` property is set to `true`. If `opts` is a regular expression the callback will be called at the first match only, if ever.

## License

All code, unless stated otherwise, is licensed under the [`WTFPL`](http://www.wtfpl.net/txt/copying/).
