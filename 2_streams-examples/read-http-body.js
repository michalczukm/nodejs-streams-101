const http = require('http');

const server = http.createServer((req, res) => {

  let body = '';
  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    body += chunk;
  });
  
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      res.write(typeof data);
      res.end(JSON.stringify(data));
    } catch (er) {
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

console.log('=== read-http-body.js, listening on port 8000');
server.listen(8000);