[![Build Status](https://travis-ci.org/ralphtheninja/match-sink.svg?branch=master)](https://travis-ci.org/ralphtheninja/match-sink)

# match-sink

[![Greenkeeper badge](https://badges.greenkeeper.io/ralphtheninja/match-sink.svg)](https://greenkeeper.io/)

* Pipe data to a stream and get notified when something matches
* Match once or multiple times

Can be useful for various things. Imagine some data stream you want to react to. It could be a server listening on some port so you know when to start interacting with it.

## Install

```
$ npm install match-sink --save
```

## Usage

Print out the total file size in the current directory.

```js
var sink = require('match-sink')
var spawn = require('child_process').spawn
spawn('ls', [ '-lh' ]).stdout.pipe(sink(/total\s+(\S+)/gi, function (match) {
  console.log(match[1])
}))
```

## Api

### `sink(opts, cb)`

* opts *(object|regexp)* Either options object with `regexp` and `matchAll` properties or a single regular expression.
* cb *(function)* Callback. Will act as an iterator if there are several matches and `matchAll` property is set to `true`. If `opts` is a regular expression the callback will be called at the first match only, if ever.

## License
All code, unless stated otherwise, is licensed under the [`WTFPL`](http://www.wtfpl.net/txt/copying/).
