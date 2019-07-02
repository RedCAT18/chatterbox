var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;

var port = 3001;
var ws = new WebSocketServer({
  port: port
});

console.log('Websockets server started.');

//connection event handler
ws.on('connection', function(socket) {
  console.log('Client connection established.');

  socket.on('message', function(data) {
    console.log('Message received: ' + data);
    socket.send(data);
  });
});
