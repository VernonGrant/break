'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MicroState = function () {
    function MicroState(interval, duration, amount, socketEvent) {
        var passthrough = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        _classCallCheck(this, MicroState);

        this.interval = interval * 60;
        this.duration = duration * 60;
        this.amount = amount;
        this.secondCounter = 0;
        this.socketEvent = socketEvent;
        this._setCurrentAmount(passthrough);
    }

    _createClass(MicroState, [{
        key: 'watch',
        value: function watch() {
            var stateController = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


            if (this.secondCounter == this.interval) {
                this.currentAmount++;

                if (this.currentAmount == this.amount) {
                    stateController.setMacroState();
                    this.socketEvent.emit('debug', 'Macro break Time');
                } else {
                    this.socketEvent.emit('debug', 'Micro break Time');
                    stateController.setBreakState(this.duration, this.currentAmount);
                }
            }

            this.secondCounter++;

            this.socketEvent.emit('set-status-bar-tile', {
                seconds: this.secondCounter,
                amount: this.currentAmount,
                interval: this.interval,
                type: 'Micro'
            });

            this.socketEvent.emit('debug', 'Watch Micro state');
            this.socketEvent.emit('debug', this.currentAmount);
        }
    }, {
        key: '_setCurrentAmount',
        value: function _setCurrentAmount(passthrough) {

            if (passthrough === null) {
                this.currentAmount = 0;
            } else {
                this.currentAmount = passthrough;
            }
        }
    }]);

    return MicroState;
}();

exports.default = MicroState;