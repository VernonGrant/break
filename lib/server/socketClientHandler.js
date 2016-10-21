'use strict';

/**
 * The purpose of this object it to hold conditional
 * related information about our socket connections.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketClientHandler = function () {
    function SocketClientHandler() {
        _classCallCheck(this, SocketClientHandler);

        this.hadFirstClient = false;
        this.clientCount = 0;
    }

    /**
     * Sets the client count equal to parameter
     * @param {number} number
     */


    _createClass(SocketClientHandler, [{
        key: 'setClientCount',
        value: function setClientCount(number) {
            this.clientCount = number;
        }

        /**
         * Sets the first client to true only if it's
         * current state is false
         */

    }, {
        key: 'firstClient',
        value: function firstClient() {
            if (this.hadFirstClient === false) {
                this.hadFirstClient = true;
            }
        }

        /**
         * True if there is no clients connected but only if
         * the websocket had it's first client.
         * @returns {boolean}
         */

    }, {
        key: 'notUsed',
        value: function notUsed() {
            if (this.hadFirstClient === true && this.clientCount === 0) {
                return true;
            }
            return false;
        }
    }]);

    return SocketClientHandler;
}();

exports.default = SocketClientHandler;