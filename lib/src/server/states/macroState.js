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

            if(stateController.config.macroBreak.enableNotifications){
                if((this.interval - this.secondCounter) === 60){
                    notifier.notify({
                        title: 'Break;',
                        message: 'Macro break will start in 1 minute'
                    });
                }
            }

        }
    }

}
