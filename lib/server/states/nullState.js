'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NullState = function () {
    function NullState(socketEvent) {
        _classCallCheck(this, NullState);

        this.socketEvent = socketEvent;
    }

    _createClass(NullState, [{
        key: 'watch',
        value: function watch() {
            var stateController = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            // not much to do
            this.socketEvent.emit('debug', 'Null state watching');
        }
    }]);

    return NullState;
}();

exports.default = NullState;