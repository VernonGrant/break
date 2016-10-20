'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketController = function () {
    function SocketController(eventEmiter) {
        _classCallCheck(this, SocketController);

        this.clientCount = 0;
        this.firstConnection = false;
    }

    _createClass(SocketController, [{
        key: 'setClientCount',
        value: function setClientCount(number) {
            this.clientCount = number;
        }
    }, {
        key: 'setFirstConnection',
        value: function setFirstConnection() {
            if (this.firstConnection === false) {
                this.firstConnection = true;
            }
        }
    }, {
        key: 'canAbort',
        value: function canAbort() {
            if (this.firstConnection === true && this.windowCount == 0) {
                return true;
            }
            return false;
        }
    }]);

    return SocketController;
}();

exports.default = SocketController;