'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BreakState = function () {
    function BreakState(duration, socketEvent) {
        var passthrough = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, BreakState);

        this.secondCounter = 0;
        this.duration = duration;
        this.socketEvent = socketEvent;
        this.passthrough = passthrough;

        // set quote
        this.socketEvent.emit('set-break-panel', { type: 'Quote' });

        // show panel
        this.socketEvent.emit('set-break-panel', { type: 'Show' });
    }

    /**
     * Gets called every secound
     *
     * @param {StateController} stateController instance of the stateController
     */


    _createClass(BreakState, [{
        key: 'watch',
        value: function watch() {
            var stateController = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (this.secondCounter == this.duration) {
                // hide panel
                this.socketEvent.emit('set-break-panel', { type: 'Hide' });
                stateController.setDefaultState(this.passthrough);
            } else {
                this.secondCounter++;
                this.socketEvent.emit('set-break-panel', {
                    duration: this.duration,
                    secondCounter: this.secondCounter,
                    type: 'Process'
                });
            }
        }
    }]);

    return BreakState;
}();

exports.default = BreakState;