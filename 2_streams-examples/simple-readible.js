const { Readable } = require('stream'); 
const inStream = new Readable({
  read() {
  }
});
inStream.push('first chunk\n');
inStream.push('sedond chunk\n');
inStream.push(null);


inStream.pipe(process.stdout);
inStream.pipe(process.stdout);

inStream.unpipe(process.stdout);

inStream.pipe(process.stdout);
