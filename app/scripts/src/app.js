import socket from './ws-client';
import { UserStore } from './storage';
import { ChatForm, ChatList, promptForUsername } from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

// let username = '';
let userStore = new UserStore('x-chatterbox/u');
let username = userStore.get();
if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

//create and handle messages

class ChatApp {
  constructor() {
    //create chatform instance
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      this.chatForm.init(data => {
        //send message from chatform to socket
        // console.log(data);
        let message = new ChatMessage({ message: data });
        socket.sendMessage(message.serialize());
      });
    });
    socket.registerMessageHandler(data => {
      console.log(data);
      //print new message when it is inputed
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    });
    // socket.registerCloseHandler(() => {});
  }
}

//class for chatting message
class ChatMessage {
  constructor({
    message: m,
    user: u = username,
    timestamp: t = new Date().getTime()
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
