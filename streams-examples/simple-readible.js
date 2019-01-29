const { Readable } = require('stream'); 
const inStream = new Readable({
  read() {
  }
});
inStream.push('first chunk\n');
inStream.push('sedond chunk\n');
inStream.push(null);

setTimeout(() => {
    inStream.pipe(process.stdout);
}, 2000);