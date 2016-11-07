'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MacroState = function () {
    function MacroState(interval, duration, socketEvent) {
        _classCallCheck(this, MacroState);

        this.secondCounter = 0;
        this.interval = interval * 60;
        this.duration = duration * 60;
        this.socketEvent = socketEvent;
    }

    /**
     * Gets called every secound
     *
     * @param {StateController} stateController instance of the stateController
     */


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

                if (stateController.config.macroBreak.enableNotifications) {
                    if (this.interval - this.secondCounter === 60) {
                        _nodeNotifier2.default.notify({
                            title: 'Break;',
                            message: 'Macro break will start in 1 minute'
                        });
                    }
                }
            }
        }
    }]);

    return MacroState;
}();

exports.default = MacroState;