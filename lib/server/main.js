'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _socketClientHandler = require('./socketClientHandler.js');

var _socketClientHandler2 = _interopRequireDefault(_socketClientHandler);

var _stateController = require('./stateController.js');

var _stateController2 = _interopRequireDefault(_stateController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpServer = _http2.default.createServer(requestListener);
var io = (0, _socket2.default)(httpServer);
var socketClientHandler = new _socketClientHandler2.default();
var stateController = new _stateController2.default(io);

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
 *
 * @param {Object} request
 * @param {Object} response
 */
function requestListener(request, response) {
    response.writeHead(200);
    response.end();
}

/**
 * Main loop emitted every second
 */
setInterval(function () {

    // set the number of connected clients
    socketClientHandler.setClientCount(io.engine.clientsCount);

    // if a first connection was already made
    if (socketClientHandler.hadFirstClient) {

        // stateController.currentState.watch();
        stateController.currentState.watch(stateController);
    }

    // close process when not in use
    if (socketClientHandler.notUsed()) {
        process.abort();
    }
}, 1000);

/**
 * Holds the events that can be called by the client.
 *
 * @param {Object} socket
 */
io.on('connection', function (socket) {

    socketClientHandler.firstClient();

    /**
     * Fire when client connects to server
     *
     * @param {Object} dataObject
     */
    socket.on('client-connected', function (dataObject) {});

    /**
     * Resets the config information and state.
     *
     * @param {Object} dataObject holds the brake's config object
     */
    socket.on('reset-config-data', function (dataObject) {

        io.emit('debug', 'reset config called');
        io.emit('debug', socketClientHandler.clientCount);
        stateController.setConfig(dataObject.config);
    });

    /**
     * Sets the config information and state only once.
     *
     * @param {Object} dataObject holds the brake's config object
     */
    socket.on('set-config-data', function (dataObject) {

        // first client only
        if (socketClientHandler.clientCount == 0) {
            stateController.setConfig(dataObject.config);
        }
    });
});

io.on('disconnect', function (socket) {});