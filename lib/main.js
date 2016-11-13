'use babel';

import io from 'socket.io-client';
import settings from './settings.js';
import ServerProcess from './serverProcess.js';
import {secondsToTime, getRandomArrayItem} from './helpers.js';
import {statusTile, topPanelTemplate} from './templates.js';

let breakServerProcess = new ServerProcess(31111);
let socket = io(breakServerProcess.getUrl(), { autoConnect : false });

let breakPackage = {

    config: settings.config,

    activate(state) {

        // start break server if not running
        breakServerProcess.checkRunningState().then(

            // server running
            (response) => {
                switch(response.statusCode){
                case 200:
                case 201:
                case 202:
                    socket.open();
                    break;
                default:
                    atom.notifications.addWarning('There was a problem connecting to Break;');
                    break;
                }
            },

            // server not running
            (error) =>{

                breakServerProcess.startServer().on('message', function(m) {
                    socket.open();
                }).on('error', function(err){

                    // alert user if an error is recieved
                    atom.notifications.addError(
                        'Break;',
                        {
                            description: 'If this error continues please help us by opening an issue **[Here](https://github.com/VernonGrant/break/issues)**',
                            detail: 'Failed to start child process.',
                            dismissable: true
                        }
                    );

                });

            }
        );

        // observe config changes
        atom.config.onDidChange('break', (event) => {
            socket.emit('reset-config-data', {
                config: atom.config.get('break')
            });
        });

        // add the break panel
        this.topPanel = atom.workspace.addTopPanel({
            item: topPanelTemplate,
            visible: false
        });

        // set panel size and resize event
        this._resizePanel();
        window.onresize = this._resizePanel;

    },

    /**
     * Sets the break status bar tile.
     */
    consumeStatusBar(statusBar) {
        this.statusBarTile = statusBar.addRightTile({
            item: statusTile,
            priority: 0
        });
    },

    /**
     * Calls the disconnected event when
     * a window is closed.
     */
    deactivate(){
        socket.emit('client-disconnected', {});
    },

    serialize(){
        return {};
    },

    /**
     * Sets the top panels height. emitted
     * once the atom window is resized.
     */
    _resizePanel(){
        let panel = document.getElementById('break-cover-window');
        panel.style.height = window.innerHeight + 'px';
    }

};
export default breakPackage;

/**
 * Calls all the server side events needed
 * on client connection attempt.
 */
socket.on('connect', function(){

    // constructor event
    socket.emit('client-connected', {
        config: atom.config.get('break')
    });

});

/**
 * Event that controls multiple changes
 * of the top panel element.
 *
 * @param {Object} data {type} must be set.
 */
socket.on('set-status-bar-tile', function(data){

    let tileElement = document.getElementById('break-interval-timer');
    let time = 0;

    switch(data.type){
    case 'Macro':
        time = Math.round(data.interval - data.seconds);
        tileElement.innerHTML = secondsToTime(time);
        break;
    case 'Micro':
        time = Math.round(data.interval - data.seconds);
        tileElement.innerHTML = data.amount + ' | ' + secondsToTime(time);
        break;
    case 'MacroNull':
        tileElement.innerHTML = '00:00:00';
        break;
    case 'MicroNull':
        tileElement.innerHTML = data.amount + ' | 00:00:00';
        break;
    case 'Null':
    default:
        tileElement.innerHTML = '00:00:00';
        break;
    }

});

/**
 * Event that controls multiple changes
 * of the top panel element.
 *
 * @param {Object} data  {type} must be set
 */
socket.on('set-break-panel', function(data){

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
        quoteElement.innerHTML = getRandomArrayItem(settings.quotes);
        break;
    case 'Null':
    default:
        breakPackage.topPanel.hide();
        processElement.value = 0;
        break;
    }

});

socket.on('debug', function(data){ console.log(data); });
