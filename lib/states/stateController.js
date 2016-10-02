'use babel';

import BreakState from './breakState.js';
import MacroState from './macroState.js';
import MicroState from './microState.js';

export default class StateController{

    constructor(breakInstance){
        this.breakInstance = breakInstance;
        this.setDefaultState();
    }

    setBreakState(duration, passthrough = {}){
        this.currentState = new BreakState(duration, this.breakInstance, passthrough);
    }

    setMacroState(){
        if(atom.config.get('break.enabledMicroBreaks')){
            this.currentState = new MacroState(
                0,
                atom.config.get('break.macroBreak.duration'),
                this.breakInstance
            ); 
        }else{
            this.currentState = new MacroState(
                atom.config.get('break.macroBreak.interval'),
                atom.config.get('break.macroBreak.duration'),
                this.breakInstance
            );
        }
    }

    setMicroState(passthrough = {}){
        this.currentState = new MicroState(
            atom.config.get('break.microBreak.interval'),
            atom.config.get('break.microBreak.duration'),
            atom.config.get('break.microBreak.amount'),
            this.breakInstance,
            passthrough
        );
    }

    setDefaultState(passthrough = {}){
        if(atom.config.get('break.enabledMicroBreaks')){
            this.setMicroState(passthrough);
        }else{
            this.setMacroState();
        }
    }
}
