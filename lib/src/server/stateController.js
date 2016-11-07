'use strict';

import BreakState from './states/breakState.js';
import MacroState from './states/macroState.js';
import MicroState from './states/microState.js';
import NullState from './states/nullState.js';

/**
 * Controls the application states
 */
export default class StateController{

    constructor(socketEvent){
        this.config = undefined;
        this.socketEvent = socketEvent;
        this.currentState = new NullState(this.socketEvent);
    }

    /**
     * Sets the current state to BreakState
     *
     * @param {number} duration the break duration
     * @param {any} passthrough pass a value to future state
     */
    setBreakState(duration, passthrough = null){
        this.currentState = new BreakState(duration, this.socketEvent, passthrough);
    }

    /**
     * Sets the current state to MacroState
     */
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

    /**
     * Sets the current state to MicroState
     *
     * @param {any} passthrough pass a value to future state
     */
    setMicroState(passthrough = null){
        this.currentState = new MicroState(
            this.config.microBreak.interval,
            this.config.microBreak.duration,
            this.config.microBreak.amount,
            this.socketEvent,
            passthrough
        );
    }

    /**
     * Sets the default state based on config information
     *
     * @param {any} passthrough pass a value to future state
     */
    setDefaultState(passthrough = null){
        if(this.config.enabledMicroBreaks){
            this.setMicroState(passthrough);
        }else{
            this.setMacroState();
        }
    }

    /**
     * Sets the config object
     *
     * @param {object} config Object holding configuration settings
     */
    setConfig(config){
        this.config = config;
        this.setDefaultState();
    }

}
