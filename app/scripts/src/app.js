import socket from './ws-client';

//create and handle messages

class ChatApp {
  constructor() {
    // console.log('Hello ES6');
    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      let message = new ChatMessage({ message: 'pow!' });
      socket.sendMessage(message.serialize());
    });
    socket.registerMessageHandler(data => {
      console.log(data);
    });
    socket.registerCloseHandler(() => {});
  }
}

//class for chatting message
class ChatMessage {
  constructor({
    message: m,
    user: u = 'batman',
    timestamp: t = new Date().getTime()
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  serialize() {
    return {
      user: this.user,
      mesage: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
