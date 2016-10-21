'use strict';

/**
 * The purpose of this object it to hold conditional
 * related information about our socket connections.
 */
export default class SocketClientHandler{

    constructor(){
        this.hadFirstClient = false;
        this.clientCount = 0;
    }

    /**
     * Sets the client count equal to parameter
     * @param {number} number
     */
    setClientCount(number){
        this.clientCount = number;
    }

    /**
     * Sets the first client to true only if it's
     * current state is false
     */
    firstClient(){
        if(this.hadFirstClient === false){
            this.hadFirstClient = true;
        }
    }

    /**
     * True if there is no clients connected but only if
     * the websocket had it's first client.
     * @returns {boolean}
     */
    notUsed(){
        if(this.hadFirstClient === true && this.clientCount === 0){
            return true;
        }
        return false;
    }
}
