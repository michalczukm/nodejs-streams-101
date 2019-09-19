// go for it
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big-file.txt');
  src.pipe(res);
});

server.listen(8000);
console.log('=== process-stream.js, listening on port 8000');