'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    /**
     * Gets called every secound
     *
     * @param {StateController} stateController instance of the stateController
     */


    _createClass(MicroState, [{
        key: 'watch',
        value: function watch() {
            var stateController = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this.secondCounter++;

            if (this.secondCounter == this.interval) {
                this.currentAmount++;

                if (this.currentAmount == this.amount) {
                    stateController.setMacroState();
                } else {
                    stateController.setBreakState(this.duration, this.currentAmount);
                }
            }

            this.socketEvent.emit('set-status-bar-tile', {
                seconds: this.secondCounter,
                amount: this.currentAmount,
                interval: this.interval,
                type: 'Micro'
            });

            if (stateController.config.microBreak.enableNotifications && !this._onlastMicroBreak()) {
                if (this.interval - this.secondCounter === 60) {
                    _nodeNotifier2.default.notify({
                        title: 'Break;',
                        message: 'Micro break will start in 1 minute'
                    });
                }
            }

            if (stateController.config.macroBreak.enableNotifications && this._onlastMicroBreak()) {
                if (this.interval - this.secondCounter === 60) {
                    _nodeNotifier2.default.notify({
                        title: 'Break;',
                        message: 'Macro break will start in 1 minute'
                    });
                }
            }
        }

        /**
         * Gets called every secound
         *
         * @param {any} passthrough value from previous state
         */

    }, {
        key: '_setCurrentAmount',
        value: function _setCurrentAmount(passthrough) {
            if (passthrough === null) {
                this.currentAmount = 0;
            } else {
                this.currentAmount = passthrough;
            }
        }

        /**
         * Returns true if on the last micro break
         */

    }, {
        key: '_onlastMicroBreak',
        value: function _onlastMicroBreak() {
            if (this.amount === this.currentAmount + 1) {
                return true;
            }
            return false;
        }
    }]);

    return MicroState;
}();

exports.default = MicroState;