const { Writable } = require('stream');
const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(outStream);










// outStream.write('hello!');



// outStream.end('just like `res.end(...)` in http.ServerResponse!');
