'use strict';

import notifier from 'node-notifier';

export default class MicroState{

    constructor(interval, duration, amount, socketEvent, passthrough = null){
        this.interval = (interval*60);
        this.duration = (duration*60);
        this.amount = amount;
        this.secondCounter = 0;
        this.socketEvent = socketEvent;
        this._setCurrentAmount(passthrough);
    }

    /**
     * Gets called every secound
     *
     * @param {StateController} stateController instance of the stateController
     */
    watch(stateController = null){
        this.secondCounter++;

        if(this.secondCounter == this.interval){
            this.currentAmount++;

            if(this.currentAmount == this.amount){
                stateController.setMacroState();
            }else{
                stateController.setBreakState(
                    this.duration,
                    this.currentAmount
                );
            }
        }

        this.socketEvent.emit('set-status-bar-tile',{
            seconds: this.secondCounter,
            amount: this.currentAmount,
            interval: this.interval,
            type: 'Micro'
        });


        if(stateController.config.microBreak.enableNotifications && !this._onlastMicroBreak()){
            if((this.interval - this.secondCounter) === 60){
                notifier.notify({
                    title: 'Break;',
                    message: 'Micro break will start in 1 minute'
                });
            }
        }

        if(stateController.config.macroBreak.enableNotifications && this._onlastMicroBreak()){
            if((this.interval - this.secondCounter) === 60){
                notifier.notify({
                    title: 'Break;',
                    message: 'Macro break will start in 1 minute'
                });
            }
        }

    }

    /**
     * Gets called every secound
     *
     * @param {any} passthrough value from previous state
     */
    _setCurrentAmount(passthrough){
        if(passthrough === null){
            this.currentAmount =  0;
        }else{
            this.currentAmount =  passthrough;
        }
    }

    /**
     * Returns true if on the last micro break
     */
    _onlastMicroBreak(){
        if(this.amount === this.currentAmount + 1){
            return true;
        }
        return false;
    }

}
