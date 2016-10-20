'use strict';

export default class NullState{

    constructor(socketEvent){
        this.socketEvent = socketEvent;
    }

    watch(stateController = null){
        // not much to do
        this.socketEvent.emit('debug', 'Null state watching');
    }

}
