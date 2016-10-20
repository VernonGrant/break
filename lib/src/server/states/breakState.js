'use strict';

export default class BreakState{

    constructor(duration, socketEvent, passthrough = null){
        this.secondCounter = 0;
        this.duration = duration;
        this.socketEvent = socketEvent;
        this.passthrough = passthrough;

        // set random quote
        this.socketEvent.emit('set-break-panel', {
            type: 'Quote'
        });

        // show panel
        this.socketEvent.emit('set-break-panel', {
            type: 'Show'
        });
    }

    watch(stateController = null){

        this.socketEvent.emit('debug', this.passthrough);

        if(this.secondCounter == this.duration){

            // hide panel
            this.socketEvent.emit('set-break-panel', {
                type: 'Hide'
            });

            stateController.setDefaultState(this.passthrough);
        }else{
            this.secondCounter++;

            this.socketEvent.emit('set-break-panel', {
                duration: this.duration,
                secondCounter: this.secondCounter,
                type: 'Process'
            });

            this.socketEvent.emit('set-status-bar-tile',{
                duration: this.duration,
                type: 'Break'
            });

            this.socketEvent.emit('debug', 'Having a wonderful break');
        }
    }

}
