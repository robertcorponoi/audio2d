'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nodes = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Provides an interface for adding web audio nodes.
 */
var Nodes = /*#__PURE__*/function () {
  /**
   * A reference to the AudioContext.
   * 
   * @private
   * 
   * @property {AudioContext}
   */

  /**
   * @param {AudioContext} ctx A reference to the AudioContext.
   */
  function Nodes(ctx) {
    (0, _classCallCheck2["default"])(this, Nodes);
    (0, _defineProperty2["default"])(this, "_ctx", void 0);
    this._ctx = ctx;
  }
  /**
   * Creates a biquadFilter node.
   * 
   * @returns {Node}
   */


  (0, _createClass2["default"])(Nodes, [{
    key: "biquadFilter",
    value: function biquadFilter() {
      return {
        name: 'biquadFilter',
        instance: this._ctx.createBiquadFilter()
      };
    }
    /**
     * Creates a gain node.
     * 
     * @returns {Node}
     */

  }, {
    key: "gain",
    value: function gain() {
      return {
        name: 'gain',
        instance: this._ctx.createGain()
      };
    }
  }]);
  return Nodes;
}();

exports.Nodes = Nodes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Ob2Rlcy50cyJdLCJuYW1lcyI6WyJOb2RlcyIsImN0eCIsIl9jdHgiLCJuYW1lIiwiaW5zdGFuY2UiLCJjcmVhdGVCaXF1YWRGaWx0ZXIiLCJjcmVhdGVHYWluIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7QUFDQTtBQUNBO0lBQ2FBLEs7QUFDVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDSSxpQkFBWUMsR0FBWixFQUErQjtBQUFBO0FBQUE7QUFDM0IsU0FBS0MsSUFBTCxHQUFZRCxHQUFaO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7OzttQ0FDeUI7QUFDakIsYUFBTztBQUFFRSxRQUFBQSxJQUFJLEVBQUUsY0FBUjtBQUF3QkMsUUFBQUEsUUFBUSxFQUFFLEtBQUtGLElBQUwsQ0FBVUcsa0JBQVY7QUFBbEMsT0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDaUI7QUFDVCxhQUFPO0FBQUVGLFFBQUFBLElBQUksRUFBRSxNQUFSO0FBQWdCQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0YsSUFBTCxDQUFVSSxVQUFWO0FBQTFCLE9BQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9Ob2RlJztcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIGFkZGluZyB3ZWIgYXVkaW8gbm9kZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm9kZXMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgQXVkaW9Db250ZXh0LlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0F1ZGlvQ29udGV4dH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3R4OiBBdWRpb0NvbnRleHQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQ29udGV4dH0gY3R4IEEgcmVmZXJlbmNlIHRvIHRoZSBBdWRpb0NvbnRleHQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGN0eDogQXVkaW9Db250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJpcXVhZEZpbHRlciBub2RlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7Tm9kZX1cclxuICAgICAqL1xyXG4gICAgYmlxdWFkRmlsdGVyKCk6IE5vZGUge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWU6ICdiaXF1YWRGaWx0ZXInLCBpbnN0YW5jZTogdGhpcy5fY3R4LmNyZWF0ZUJpcXVhZEZpbHRlcigpIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZ2FpbiBub2RlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7Tm9kZX1cclxuICAgICAqL1xyXG4gICAgZ2FpbigpOiBOb2RlIHtcclxuICAgICAgICByZXR1cm4geyBuYW1lOiAnZ2FpbicsIGluc3RhbmNlOiB0aGlzLl9jdHguY3JlYXRlR2FpbigpIH07XHJcbiAgICB9XHJcbn0iXX0=