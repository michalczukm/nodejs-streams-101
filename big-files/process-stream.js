// go for it
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big-file.txt');
  src.pipe(res);
});

server.listen(8000);