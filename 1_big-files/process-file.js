// don't do this at home
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('./sample-file.txt', (err, data) => {
    if (err) throw err;
  
    res.end(data);
  });
});

server.listen(8000);
console.log('=== process-file.js, listening on port 8000');