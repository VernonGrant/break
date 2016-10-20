'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _stateController = require('./states/stateController.js');

var _stateController2 = _interopRequireDefault(_stateController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var httpServer = _http2.default.createServer(requestListener);
var io = (0, _socket2.default)(httpServer);

/**
 * Starts the http server. Once the server is listening
 * it will send a message to the parent process to start
 * the socket io connection.
 *
 * @param {number} port The TCP/IP port
 * @param {string | undefined} hostname The hostname, IPv4, or IPv6 address
 * @param {Function} callback Server has begun listening
 */
httpServer.listen(7455, undefined, function () {
    process.send('hello world');
});

/**
 * Emitted on each request
 * @param {Object} request
 * @param {Object} response
 */
function requestListener(request, response) {
    response.writeHead(200);
    response.end();
}

var BreakServer = function () {
    function BreakServer(StateController, eventEmiter) {
        _classCallCheck(this, BreakServer);

        this.firstConnection = false;
        this.clientCount = 0;
        this.eventEmiter = eventEmiter;
        // this.stateController = new StateController();
    }

    _createClass(BreakServer, [{
        key: 'setClientCount',
        value: function setClientCount(number) {
            this.clientCount = number;
        }
    }, {
        key: 'setFirstConnection',
        value: function setFirstConnection() {
            if (this.firstConnection === false) {
                this.firstConnection = true;
            }
        }
    }, {
        key: 'canAbort',
        value: function canAbort() {
            if (this.firstConnection === true && this.windowCount == 0) {
                process.abort();
            }
        }
    }, {
        key: 'canDoEvent',
        value: function canDoEvent() {
            this.eventEmiter.emit('debug', 'calling event from diferent instance');
        }
    }]);

    return BreakServer;
}();

var breakServer = new BreakServer(_stateController2.default, io);

/**
 * Emitted every secound
 */
function everySecound() {

    breakServer.setClientCount(io.engine.clientsCount);
    breakServer.canAbort();
    breakServer.canDoEvent();

    // io.emit('debug', breakServer);
    // io.emit('debug', breakServer.stateController.currentState);
}
setInterval(everySecound, 1000);

/**
 * Called everytime a client connects to 
 * the server
 * @param {Object} socket
 */
io.on('connection', function (socket) {

    breakServer.setFirstConnection();

    /**
     * This event gets called once a connection is made
     * by the client
     * @param {Object} data
     */
    socket.on('set-config', function (data) {
        // breakServer.setConfig(data);
    });
});
io.on('disconnect', function (socket) {});