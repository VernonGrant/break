'use strict';

export default class BreakState{

    constructor(duration, socketEvent, passthrough = null){
        this.secondCounter = 0;
        this.duration = duration;
        this.socketEvent = socketEvent;
        this.passthrough = passthrough;

        // set quote
        this.socketEvent.emit('set-break-panel', { type: 'Quote' });

        // show panel
        this.socketEvent.emit('set-break-panel', { type: 'Show' });
    }

    /**
     * Gets called every secound
     *
     * @param {StateController} stateController instance of the stateController
     */
    watch(stateController = null){
        if(this.secondCounter == this.duration){
            // hide panel
            this.socketEvent.emit('set-break-panel', { type: 'Hide' });
            stateController.setDefaultState(this.passthrough);
        }else{
            this.secondCounter++;
            this.socketEvent.emit('set-break-panel', {
                duration: this.duration,
                secondCounter: this.secondCounter,
                type: 'Process'
            });
        }
    }

}
