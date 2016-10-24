'use strict';

import notifier from 'node-notifier';

export default class MacroState{

    constructor(interval, duration, socketEvent){
        this.secondCounter = 0;
        this.interval = (interval*60);
        this.duration = (duration*60);
        this.socketEvent = socketEvent;
    }

    /**
     * Gets called every secound
     *
     * @param {StateController} stateController instance of the stateController
     */
    watch(stateController = null){
        if(this.secondCounter == this.interval){
            stateController.setBreakState(this.duration);
        }else{
            this.secondCounter++;
            this.socketEvent.emit('set-status-bar-tile',{
                seconds: this.secondCounter,
                interval: this.interval,
                type: 'Macro'
            });

            // notifier
            if(stateController.config.macroBreak.enableNotifications){
                this._notify('Macro break will start in 30s');
            }
        }
    }

    /**
     * Sends a notification out 30s before break time
     *
     * @param {string} message a message to display
     */
    _notify(message){
        if((this.interval - this.secondCounter) == 30){
            notifier.notify({
                'title': 'Break;',
                'message': message
            });
        }
    }

}
