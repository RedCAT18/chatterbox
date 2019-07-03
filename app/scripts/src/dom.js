import $ from 'jquery';
import md5 from 'crypto-js/md5';

//icon setting
function createGravatarUrl(username) {
  let userhash = md5(username);
  return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}

//get username
export function promptForUsername() {
  let username = prompt('Enter username');
  return username.toLowerCase();
}

//create object to manage form elements

//1. create ChatForm instance
//2. initialise event handler

export class ChatForm {
  constructor(formSel, inputSel) {
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  //init method: connect submit event of form and callback

  init(submitCallback) {
    this.$form.submit(event => {
      event.preventDefault();
      let val = this.$input.val();
      submitCallback(val);
      //reset form
      this.$input.val('');
    });
    this.$form.find('button').on('click', () => this.$form.submit());
  }
}

//print messages as server receiving them sequentially
export class ChatList {
  constructor(listSel, username) {
    this.$list = $(listSel);
    this.username = username;
  }

  //drawMessage method: analyse object into username, timestamp, and local variable for text
  drawMessage({ user: u, timestamp: t, message: m }) {
    let $messageRow = $('<li>', { class: 'message-row' });

    //if inputed username is same as u, add class for css
    if (this.username === u) {
      $messageRow.addClass('me');
    }

    //organise messages into a row for printing

    let $message = $('<p>');

    $message.append($('<span>', { class: 'message-username', text: u }));

    $message.append(
      $('<span>', {
        class: 'timestamp',
        'data-time': t,
        text: new Date(t).getTime()
      })
    );

    $message.append($('<span>', { class: 'message-message', text: m }));

    let $img = $('<img>', {
      src: createGravatarUrl(u),
      title: u
    });

    $messageRow.append($img);
    $messageRow.append($message);
    $(this.$list).append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }
}
