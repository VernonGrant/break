'use babel';

export default class BreakState{

    constructor(duration, breakInstance,  passthrough = {}){
        this.secondCounter = 0;
        this.duration = duration;
        this.breakInstance = breakInstance;
        this.passthrough = passthrough;
    }

    watch(){

        console.log(this.passthrough);

        if(this.secondCounter == this.duration){
            this.breakInstance.stateController.setDefaultState(this.passthrough);
        }else{
            this.secondCounter++;
            console.log('Having an amazing and relaxing time');
        }
    }

}
