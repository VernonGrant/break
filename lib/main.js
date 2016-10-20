'use babel';

import io from 'socket.io-client';
import settings from './settings.js';
import ServerProcess from './serverProcess.js';
import {secondsToTime, getRandomArrayItem} from './helpers.js';
import {statusTile, topPanelTemplate} from './templates.js';

let breakServerProcess = new ServerProcess(7455);
let socket = io(breakServerProcess.getUrl(), { autoConnect : false });

breakServerProcess.checkRunningState().then(

    /**
     * Server is already running. Make socket connection
     * @param {number} statusCode The http response code
     *
     * @TODO Find the diffirince status codes needed
     */
    function(statusCode){
        switch(statusCode){
            case 200:
            console.log('Server running');
            socket.open();
            break;

            default:
            console.log('Message about server');
            break;
        }
    },

    /**
     * Server is not running. Start server ChildProcess
     * and wait for message event to fire before starting
     * the web socket connection.
     * @param {} error
     */
    function(error){

        breakServerProcess.startServer().on('message', function() {
            console.log('Server is not running');
            socket.open();
        });

    }
);

let breakPackage = {

    config: settings.config,

    activate(state) {

        // observe config changes
        atom.config.onDidChange('break', (event) => {

            socket.emit('reset-config-data', {
                config: atom.config.get('break')
            });

        });

        // add the top panel
        this.topPanel = atom.workspace.addTopPanel({
            item: topPanelTemplate,
            visible: false
        });

    },

    consumeStatusBar(statusBar) {
        this.statusBarTile = statusBar.addRightTile({
            item: statusTile,
            priority: 0
        });
    },

    deactivate(){},

    serialize(){}
};

// Break Package
export default breakPackage;

socket.on('connect', function(){

    // socket.emit('client-connected', {});
    // sets the config data only once
    socket.emit('set-config-data', {
        config: atom.config.get('break')
    });

});

socket.on('set-status-bar-tile', function(data){

    let tileElement = document.getElementById('break-interval-timer');

    switch(data.type){
    case 'Macro':
        tileElement.innerHTML = secondsToTime(data.seconds);
        break;
    case 'Micro':
        tileElement.innerHTML = data.amount + ' | ' + secondsToTime(data.seconds);
        break;
    case 'Break':
    default:
        tileElement.innerHTML = '--:--:--';
        break;
    }

});

socket.on('set-break-panel', function(data){

    // breakPackage.topPanel.show();
    let processElement = document.getElementById('break-progress');
    let quoteElement = document.getElementById('break-quote');

    switch(data.type){
    case 'Process':
        processElement.value = Math.round((data.secondCounter / data.duration) * 100);
        break;
    case 'Show':
        breakPackage.topPanel.show();
        break;
    case 'Hide':
        breakPackage.topPanel.hide();
        processElement.value = 0;
        break;
    case 'Quote':
        //quoteElement.innerHtml = getRandomArrayItem(settings.quotes);
        break;
    default:
        break;
    }

});

socket.on('debug', function(data){ console.log(data); });
socket.on('reconnecting', function(){});
socket.on('reconnect_error', function(error){});
socket.on('connect_error', function(error){});
