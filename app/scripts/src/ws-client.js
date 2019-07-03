//handling communication with node websocket

let socket;

function init(url) {
  //connect websocket server
  socket = new WebSocket(url);
  console.log('connecting...');
}

//when connection created
function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

//when connection removed (disconnect)
function registerCloseHandler(handlerFunction) {
  socket.onclose = () => {
    console.log('close');
    handlerFunction();
  };
}

//handling messages received
function registerMessageHandler(handlerFunction) {
  socket.onmessage = e => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

//send message to websocket
function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerCloseHandler,
  registerMessageHandler,
  sendMessage
};
