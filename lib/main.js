'use babel';

import settings from './settings.js';
import StateController from './states/stateController.js';

export default {

    config: settings.config,
    stateController: null,
    interval: null,

    activate(state) {

        // Set the application state controller
        this.stateController = new StateController(this);

        // Start the one secound interval
        this.interval = setInterval(() => {
            this.stateController.currentState.watch();
        }, 1000);

        // Settings changed... reset
        atom.config.observe('break', (value) => {
            this.stateController.setDefaultState();
        });
    },

    consumeStatusBar(statusBar) {},

    deactivate(){
        clearInterval(this.interval);
    },

    serialize() {}

};
