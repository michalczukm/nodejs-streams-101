const { Duplex } = require('stream');
const fs = require('fs');

const inOutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString().toUpperCase());
    callback();
  },

  read(size) {
  }
});

// only those are read by last write stream
inOutStream.push('readable stream: first chunk\n');
inOutStream.push('readable stream: second chunk\n');
inOutStream.push(null);


const writeToFile =  fs.createWriteStream('./dist/simple-duplex');
process.stdin.pipe(inOutStream).pipe(writeToFile);