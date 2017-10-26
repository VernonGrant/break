'use strict';

import http from 'http';
import socket from 'socket.io';
import SocketClientHandler from './socketClientHandler.js';
import StateController from './stateController.js';

let httpServer = http.createServer(requestListener);
let io = socket(httpServer);
let socketClientHandler = new SocketClientHandler();
let stateController = new StateController(io);

const hostname = 'localhost';

/**
 * Starts the http server. Once the server is listening
 * it will send a message to the parent process to start
 * the socket io connection.
 *
 * @param {number} port The TCP/IP port
 * @param {string | undefined} hostname The hostname, IPv4, or IPv6 address
 * @param {Function} callback Server has begun listening
 */
httpServer.listen(31111, hostname, function(){
    process.send(httpServer.address());
});

/**
 * Emitted on each request
 *
 * @param {Object} request
 * @param {Object} response
 */
function requestListener (request, response) {
    response.writeHead(200);
    response.end();
}

/**
 * Main loop
 */
setInterval(function() {

    // set number of connected clients
    socketClientHandler.setClientCount(io.engine.clientsCount);

    // if has connected clients
    if(!socketClientHandler.notUsed()){
        stateController.currentState.watch(stateController);
    }else{
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
    socket.on('client-connected', function(dataObject){

        // set config
        if(!socketClientHandler.hadFirstClient){
            stateController.setConfig(dataObject.config);
        }

        // had client
        socketClientHandler.firstClient();

        // state constructors
        switch(stateController.currentState.constructor.name){
            case 'BreakState':

                if(stateController.currentState.passthrough !== null){
                    io.emit('set-status-bar-tile', {
                        type: 'MicroNull',
                        amount: stateController.currentState.passthrough
                    });
                }else{
                    io.emit('set-status-bar-tile', { type: 'MacroNull'});
                }

                io.emit('set-break-panel', {type: 'Quote'});
                io.emit('set-break-panel', {type: 'Show'});

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
    socket.on('client-disconnected', function(dataObject){
        if(socketClientHandler.notUsed()){
            process.abort();
        }
    });

    /**
     * Resets the config information of stateController.
     *
     * @param {Object} dataObject break's config object
     */
    socket.on('reset-config-data', function(dataObject){
        stateController.setConfig(dataObject.config);

        // reset templates
        io.emit('set-status-bar-tile', { type: 'Null'});
        io.emit('set-break-panel', {type: 'Null'});
    });

});
