var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websocket-server');

//handling exception
var handleError = function(err, res) {
  res.writeHead(404);
  res.end(err.message);
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      console.log(err.message);
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
});

server.listen(3000);
