'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _breakState = require('./breakState.js');

var _breakState2 = _interopRequireDefault(_breakState);

var _macroState = require('./macroState.js');

var _macroState2 = _interopRequireDefault(_macroState);

var _microState = require('./microState.js');

var _microState2 = _interopRequireDefault(_microState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @TODO this state controller needs to re-created.
 */
var StateController = function () {
    function StateController() {
        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, StateController);

        this.config = null;
    }

    // setBreakState(duration, passthrough = {}){
    //     this.currentState = new BreakState(duration, this.breakInstance, passthrough);
    // }

    _createClass(StateController, [{
        key: 'setMacroState',
        value: function setMacroState() {
            if (this.config.enabledMicroBreaks) {
                this.currentState = new _macroState2.default(0, this.config.macroBreak.duration, this.breakServer);
            } else {
                this.currentState = new _macroState2.default(this.config.macroBreak.interval, this.config.macroBreak.duration, this.breakServer);
            }
        }

        // setMicroState(passthrough = {}){
        //     this.currentState = new MicroState(
        //         atom.config.get('break.microBreak.interval'),
        //         atom.config.get('break.microBreak.duration'),
        //         atom.config.get('break.microBreak.amount'),
        //         this.breakInstance,
        //         passthrough
        //     );
        // }

    }, {
        key: 'setDefaultState',
        value: function setDefaultState() {
            var passthrough = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
        }
    }]);

    return StateController;
}();

exports.default = StateController;