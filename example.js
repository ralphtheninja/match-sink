const sink = require('.')
const spawn = require('child_process').spawn
spawn('ls', [ '-lh' ]).stdout.pipe(sink(/total\s+(\S+)/gi, match => {
  console.log(match[1])
}))
