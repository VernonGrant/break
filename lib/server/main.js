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
    process.send('null');
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
 * Main loop
 */
setInterval(function () {

    // set number of connected clients
    socketClientHandler.setClientCount(io.engine.clientsCount);

    // if has connected clients
    if (!socketClientHandler.notUsed()) {
        stateController.currentState.watch(stateController);
    } else {
        process.abort();
    }
}, 1000);

/**
 * Client events
 *
 * @param {Object} socket
 */
io.on('connection', function (socket) {

    /**
     * Called on client connection
     *
     * @param {Object} data
     */
    socket.on('client-connected', function (dataObject) {

        // set config
        if (!socketClientHandler.hadFirstClient) {
            stateController.setConfig(dataObject.config);
        }

        // had client
        socketClientHandler.firstClient();

        // state constructors
        switch (stateController.currentState.constructor.name) {
            case 'BreakState':

                if (stateController.currentState.passthrough !== null) {
                    io.emit('set-status-bar-tile', {
                        type: 'MicroNull',
                        amount: stateController.currentState.passthrough
                    });
                } else {
                    io.emit('set-status-bar-tile', { type: 'MacroNull' });
                }

                io.emit('set-break-panel', { type: 'Quote' });
                io.emit('set-break-panel', { type: 'Show' });

                break;
            case 'NullState':
            default:
                break;
        }
    });

    /**
     * Called when a client disconnects, closes window
     *
     * @param {Object} dataObject
     */
    socket.on('client-disconnected', function (dataObject) {
        io.emit('debug', 'client disconnected');
        if (socketClientHandler.notUsed()) {
            process.abort();
        }
    });

    /**
     * Resets the config information of stateController.
     *
     * @param {Object} dataObject break's config object
     */
    socket.on('reset-config-data', function (dataObject) {
        stateController.setConfig(dataObject.config);

        // reset templates
        io.emit('set-status-bar-tile', { type: 'Null' });
        io.emit('set-break-panel', { type: 'Null' });
    });
});