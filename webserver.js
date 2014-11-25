var http = require('http');
var fs = require('fs');

var html = fs.readFileSync('test2.html');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen("80","127.0.0.1");
console.log('Server running at http://127.0.0.1/');