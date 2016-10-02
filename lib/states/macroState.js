'use babel';

export default class MacroState{

    constructor(interval, duration, breakInstance){
        this.secondCounter = 0;
        this.interval = (interval*60);
        this.duration = (duration*60);
        this.breakInstance = breakInstance;
    }

    watch(){
        if(this.secondCounter == this.interval){
            this.breakInstance.stateController.setBreakState(this.duration);
            console.log('Macro break time');
        }else{
            this.secondCounter++;
            console.log('Macro Break Watching');
        }
    }

}
