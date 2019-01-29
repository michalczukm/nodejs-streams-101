const { Duplex } = require('stream');

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString().toUpperCase());
    callback();
  },

  read(size) {
  }
});

inoutStream.push('first chunk\n');
inoutStream.push('second chunk\n');
inoutStream.push(null);

process.stdin.pipe(inoutStream).pipe(process.stdout);