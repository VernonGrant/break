'use strict';

export default class MicroState{

    constructor(interval, duration, amount, socketEvent, passthrough = null){
        this.interval = (interval*60);
        this.duration = (duration*60);
        this.amount = amount;
        this.secondCounter = 0;
        this.socketEvent = socketEvent;
        this._setCurrentAmount(passthrough);
    }

    watch(stateController = null){
        this.secondCounter++;

        if(this.secondCounter == this.interval){
            this.currentAmount++;

            if(this.currentAmount == this.amount){
                stateController.setMacroState();
                this.socketEvent.emit('debug', 'Macro break Time');
            }else{
                this.socketEvent.emit('debug', 'Micro break Time');
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

        this.socketEvent.emit('debug', 'Watch Micro state');
        this.socketEvent.emit('debug', this.currentAmount);
    }

    _setCurrentAmount(passthrough){

        if(passthrough === null){
            this.currentAmount =  0;
        }else{
            this.currentAmount =  passthrough;
        }

    }

}
