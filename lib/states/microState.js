'use babel';

export default class MicroState{

    constructor(interval, duration, amount, breakInstance, passthrough = {}){
        this.interval = (interval*60);
        this.duration = (duration*60);
        this.amount = amount;
        this.breakInstance = breakInstance;
        this.secondCounter = 0;
        this.currentAmount = this._setCurrentAmount(passthrough);
    }

    watch(){

        if(this.secondCounter == this.interval){
            this.currentAmount++;

            if(this.currentAmount == this.amount){
                this.breakInstance.stateController.setMacroState();
            }else{
                console.log('Micro break Time');
                this.breakInstance.stateController.setBreakState(
                    this.duration,
                    {currentAmount: this.currentAmount}
                );
            }
        }

        this.secondCounter++;
        console.log('Micro Break Watching');
        console.log(this.currentAmount);
        console.log(this.secondCounter);
    }

    _setCurrentAmount(passthrough){

        console.log(passthrough);

        if(typeof passthrough.currentAmount === "undefined"){
            return 0;
        }else{
            return passthrough.currentAmount;
        }
    }

}
