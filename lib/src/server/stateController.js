'use strict';

import BreakState from './states/breakState.js';
import MacroState from './states/macroState.js';
import MicroState from './states/microState.js';
import NullState from './states/nullState.js';

export default class StateController{

    constructor(socketEvent){

        this.config = undefined;
        this.socketEvent = socketEvent;
        this.currentState = new NullState(this.socketEvent);

    }

    setBreakState(duration, passthrough = null){
        this.currentState = new BreakState(duration, this.socketEvent, passthrough);
    }

    setMacroState(){

        if(this.config.enabledMicroBreaks){
            this.currentState = new MacroState(
                0,
                this.config.macroBreak.duration,
                this.socketEvent
            );
        }else{
            this.currentState = new MacroState(
                this.config.macroBreak.interval,
                this.config.macroBreak.duration,
                this.socketEvent
            );
        }
    }

    setMicroState(passthrough = null){
        this.currentState = new MicroState(
            this.config.microBreak.interval,
            this.config.microBreak.duration,
            this.config.microBreak.amount,
            this.socketEvent,
            passthrough
        );
    }

    setDefaultState(passthrough = null){
        if(this.config.enabledMicroBreaks){
            this.setMicroState(passthrough);
        }else{
            this.setMacroState();
        }
    }

    setConfig(config){
        this.config = config;
        this.setDefaultState();
    }

}
