'use strict';

export default class MacroState{

    constructor(interval, duration, socketEvent){
        this.secondCounter = 0;
        this.interval = (interval*60);
        this.duration = (duration*60);
        this.socketEvent = socketEvent;;
    }

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

            this.socketEvent.emit('debug', 'Macro State Watching');
        }
    }

}
