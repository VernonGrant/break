'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MacroState = function () {
    function MacroState(interval, duration, socketEvent) {
        _classCallCheck(this, MacroState);

        this.secondCounter = 0;
        this.interval = interval * 60;
        this.duration = duration * 60;
        this.socketEvent = socketEvent;;
    }

    _createClass(MacroState, [{
        key: 'watch',
        value: function watch() {
            var stateController = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


            if (this.secondCounter == this.interval) {
                stateController.setBreakState(this.duration);
            } else {
                this.secondCounter++;

                this.socketEvent.emit('set-status-bar-tile', {
                    seconds: this.secondCounter,
                    interval: this.interval,
                    type: 'Macro'
                });

                this.socketEvent.emit('debug', 'Macro State Watching');
            }
        }
    }]);

    return MacroState;
}();

exports.default = MacroState;