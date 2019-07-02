var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;

var port = 3001;
var ws = new WebSocketServer({
  port: port
});

//array to store messages
var messages = [];

console.log('Websockets server started.');

//connection event handler
ws.on('connection', function(socket) {
  console.log('Client connection established.');

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('Message received: ' + data);
    messages.push(data);

    //send message to all users
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
    // socket.send(data);
  });
});
