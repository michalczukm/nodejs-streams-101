const { Readable } = require('stream'); 

const inStream = new Readable();

// inStream.pipe(process.stdout);

inStream.push('first chunk\n');
inStream.push('second chunk\n');
inStream.push(null);

// inStream.pipe(process.stdout);








// setTimeout(() => {
//   inStream.pipe(process.stdout);
// }, 1000);








// how to "unsubscribe" from pipe
// inStream.unpipe(process.stdout);