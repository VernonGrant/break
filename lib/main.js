'use babel';

import {default as settings} from './settings.js';

export default {

    config: settings.config,

    activate(state) {

        // some debug stuff
        // console.log(state);
        // console.log(settings.config);
        // console.log('Break has been activated');
        // console.log(atom.config.get('break'));
        
        // Settings changed... reset
        atom.config.observe('break', this.reset);
    },

    consumeStatusBar(statusBar) {
        console.log(statusBar);
    },

    deactivate() {},

    reset() {
        console.log('Break has been reset');
    },

    serialize() {}

};
