(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wsClient = _interopRequireDefault(require("./ws-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//create and handle messages
var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  // console.log('Hello ES6');
  _wsClient["default"].init('ws://localhost:3001');

  _wsClient["default"].registerOpenHandler(function () {
    var message = new ChatMessage({
      message: 'pow!'
    });

    _wsClient["default"].sendMessage(message.serialize());
  });

  _wsClient["default"].registerMessageHandler(function (data) {
    console.log(data);
  });

  _wsClient["default"].registerCloseHandler(function () {});
}; //class for chatting message


var ChatMessage =
/*#__PURE__*/
function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
        _ref$user = _ref.user,
        u = _ref$user === void 0 ? 'batman' : _ref$user,
        _ref$timestamp = _ref.timestamp,
        t = _ref$timestamp === void 0 ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  _createClass(ChatMessage, [{
    key: "serialize",
    value: function serialize() {
      return {
        user: this.user,
        mesage: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

var _default = ChatApp;
exports["default"] = _default;

},{"./ws-client":3}],2:[function(require,module,exports){
"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _app["default"]();

},{"./app":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//handling communication with node websocket
var socket;

function init(url) {
  //connect websocket server
  socket = new WebSocket(url);
  console.log('connecting...');
} //when connection created


function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
} //when connection removed (disconnect)


function registerCloseHandler(handlerFunction) {
  socket.onclose = function () {
    console.log('close');
    handlerFunction();
  };
} //handling messages received


function registerMessageHandler(handlerFunction) {
  socket.onmessage = function (e) {
    console.log('message', e.data);
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
} //send message to websocket


function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

var _default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerCloseHandler: registerCloseHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};
exports["default"] = _default;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FBRUE7SUFFTSxPLEdBQ0osbUJBQWM7QUFBQTs7QUFDWjtBQUNBLHVCQUFPLElBQVAsQ0FBWSxxQkFBWjs7QUFDQSx1QkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQy9CLFFBQUksT0FBTyxHQUFHLElBQUksV0FBSixDQUFnQjtBQUFFLE1BQUEsT0FBTyxFQUFFO0FBQVgsS0FBaEIsQ0FBZDs7QUFDQSx5QkFBTyxXQUFQLENBQW1CLE9BQU8sQ0FBQyxTQUFSLEVBQW5CO0FBQ0QsR0FIRDs7QUFJQSx1QkFBTyxzQkFBUCxDQUE4QixVQUFBLElBQUksRUFBSTtBQUNwQyxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWjtBQUNELEdBRkQ7O0FBR0EsdUJBQU8sb0JBQVAsQ0FBNEIsWUFBTSxDQUFFLENBQXBDO0FBQ0QsQyxFQUdIOzs7SUFDTSxXOzs7QUFDSiw2QkFJRztBQUFBLFFBSFEsQ0FHUixRQUhELE9BR0M7QUFBQSx5QkFGRCxJQUVDO0FBQUEsUUFGSyxDQUVMLDBCQUZTLFFBRVQ7QUFBQSw4QkFERCxTQUNDO0FBQUEsUUFEVSxDQUNWLCtCQURjLElBQUksSUFBSixHQUFXLE9BQVgsRUFDZDs7QUFBQTs7QUFDRCxTQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNEOzs7O2dDQUNXO0FBQ1YsYUFBTztBQUNMLFFBQUEsSUFBSSxFQUFFLEtBQUssSUFETjtBQUVMLFFBQUEsTUFBTSxFQUFFLEtBQUssT0FGUjtBQUdMLFFBQUEsU0FBUyxFQUFFLEtBQUs7QUFIWCxPQUFQO0FBS0Q7Ozs7OztlQUdZLE87Ozs7OztBQ3ZDZjs7OztBQUVBLElBQUksZUFBSjs7Ozs7Ozs7O0FDRkE7QUFFQSxJQUFJLE1BQUo7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNqQjtBQUNBLEVBQUEsTUFBTSxHQUFHLElBQUksU0FBSixDQUFjLEdBQWQsQ0FBVDtBQUNBLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0QsQyxDQUVEOzs7QUFDQSxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzVDLEVBQUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsWUFBTTtBQUNwQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtBQUNBLElBQUEsZUFBZTtBQUNoQixHQUhEO0FBSUQsQyxDQUVEOzs7QUFDQSxTQUFTLG9CQUFULENBQThCLGVBQTlCLEVBQStDO0FBQzdDLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsWUFBTTtBQUNyQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWjtBQUNBLElBQUEsZUFBZTtBQUNoQixHQUhEO0FBSUQsQyxDQUVEOzs7QUFDQSxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWlEO0FBQy9DLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsVUFBQSxDQUFDLEVBQUk7QUFDdEIsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxDQUFDLElBQXpCO0FBQ0EsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFDLENBQUMsSUFBYixDQUFYO0FBQ0EsSUFBQSxlQUFlLENBQUMsSUFBRCxDQUFmO0FBQ0QsR0FKRDtBQUtELEMsQ0FFRDs7O0FBQ0EsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCLEVBQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNEOztlQUVjO0FBQ2IsRUFBQSxJQUFJLEVBQUosSUFEYTtBQUViLEVBQUEsbUJBQW1CLEVBQW5CLG1CQUZhO0FBR2IsRUFBQSxvQkFBb0IsRUFBcEIsb0JBSGE7QUFJYixFQUFBLHNCQUFzQixFQUF0QixzQkFKYTtBQUtiLEVBQUEsV0FBVyxFQUFYO0FBTGEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxuLy9jcmVhdGUgYW5kIGhhbmRsZSBtZXNzYWdlc1xyXG5cclxuY2xhc3MgQ2hhdEFwcCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnSGVsbG8gRVM2Jyk7XHJcbiAgICBzb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gICAgICBsZXQgbWVzc2FnZSA9IG5ldyBDaGF0TWVzc2FnZSh7IG1lc3NhZ2U6ICdwb3chJyB9KTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKG1lc3NhZ2Uuc2VyaWFsaXplKCkpO1xyXG4gICAgfSk7XHJcbiAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihkYXRhID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KTtcclxuICAgIHNvY2tldC5yZWdpc3RlckNsb3NlSGFuZGxlcigoKSA9PiB7fSk7XHJcbiAgfVxyXG59XHJcblxyXG4vL2NsYXNzIGZvciBjaGF0dGluZyBtZXNzYWdlXHJcbmNsYXNzIENoYXRNZXNzYWdlIHtcclxuICBjb25zdHJ1Y3Rvcih7XHJcbiAgICBtZXNzYWdlOiBtLFxyXG4gICAgdXNlcjogdSA9ICdiYXRtYW4nLFxyXG4gICAgdGltZXN0YW1wOiB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICB9KSB7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtO1xyXG4gICAgdGhpcy51c2VyID0gdTtcclxuICAgIHRoaXMudGltZXN0YW1wID0gdDtcclxuICB9XHJcbiAgc2VyaWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlcjogdGhpcy51c2VyLFxyXG4gICAgICBtZXNhZ2U6IHRoaXMubWVzc2FnZSxcclxuICAgICAgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XHJcbiIsImltcG9ydCBDaGF0QXBwIGZyb20gJy4vYXBwJztcclxuXHJcbm5ldyBDaGF0QXBwKCk7XHJcbiIsIi8vaGFuZGxpbmcgY29tbXVuaWNhdGlvbiB3aXRoIG5vZGUgd2Vic29ja2V0XHJcblxyXG5sZXQgc29ja2V0O1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICAvL2Nvbm5lY3Qgd2Vic29ja2V0IHNlcnZlclxyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uLicpO1xyXG59XHJcblxyXG4vL3doZW4gY29ubmVjdGlvbiBjcmVhdGVkXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICB9O1xyXG59XHJcblxyXG4vL3doZW4gY29ubmVjdGlvbiByZW1vdmVkIChkaXNjb25uZWN0KVxyXG5mdW5jdGlvbiByZWdpc3RlckNsb3NlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25jbG9zZSA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdjbG9zZScpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuLy9oYW5kbGluZyBtZXNzYWdlcyByZWNlaXZlZFxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSBlID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlJywgZS5kYXRhKTtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vc2VuZCBtZXNzYWdlIHRvIHdlYnNvY2tldFxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxyXG4gIHJlZ2lzdGVyQ2xvc2VIYW5kbGVyLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgc2VuZE1lc3NhZ2VcclxufTtcclxuIl19
