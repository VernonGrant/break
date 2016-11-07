'use strict';

export default class NullState{

    constructor(socketEvent){
        this.socketEvent = socketEvent;
    }

    /**
     * Gets called every secound
     *
     * @param {StateController} stateController instance of the stateController
     */
    watch(stateController = null){
        // not much to do
    }

}
