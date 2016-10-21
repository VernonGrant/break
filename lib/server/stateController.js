'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _breakState = require('./states/breakState.js');

var _breakState2 = _interopRequireDefault(_breakState);

var _macroState = require('./states/macroState.js');

var _macroState2 = _interopRequireDefault(_macroState);

var _microState = require('./states/microState.js');

var _microState2 = _interopRequireDefault(_microState);

var _nullState = require('./states/nullState.js');

var _nullState2 = _interopRequireDefault(_nullState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateController = function () {
    function StateController(socketEvent) {
        _classCallCheck(this, StateController);

        this.config = undefined;
        this.socketEvent = socketEvent;
        this.currentState = new _nullState2.default(this.socketEvent);
    }

    _createClass(StateController, [{
        key: 'setBreakState',
        value: function setBreakState(duration) {
            var passthrough = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.currentState = new _breakState2.default(duration, this.socketEvent, passthrough);
        }
    }, {
        key: 'setMacroState',
        value: function setMacroState() {

            if (this.config.enabledMicroBreaks) {
                this.currentState = new _macroState2.default(0, this.config.macroBreak.duration, this.socketEvent);
            } else {
                this.currentState = new _macroState2.default(this.config.macroBreak.interval, this.config.macroBreak.duration, this.socketEvent);
            }
        }
    }, {
        key: 'setMicroState',
        value: function setMicroState() {
            var passthrough = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this.currentState = new _microState2.default(this.config.microBreak.interval, this.config.microBreak.duration, this.config.microBreak.amount, this.socketEvent, passthrough);
        }
    }, {
        key: 'setDefaultState',
        value: function setDefaultState() {
            var passthrough = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (this.config.enabledMicroBreaks) {
                this.setMicroState(passthrough);
            } else {
                this.setMacroState();
            }
        }
    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            this.config = config;
            this.setDefaultState();
        }
    }]);

    return StateController;
}();

exports.default = StateController;