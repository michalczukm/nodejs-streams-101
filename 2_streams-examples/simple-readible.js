const { Readable } = require('stream'); 

const inStream = new Readable({
  read() {
  }
});

inStream.pipe(process.stdout);

inStream.push('first chunk\n');
inStream.push('second chunk\n');
inStream.push(null);

inStream.pipe(process.stdout);












// // how to "unsubscribe" from pipe
// inStream.unpipe(process.stdout);