'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Provides an interface for adding web audio nodes.
 */
var Nodes =
/*#__PURE__*/
function () {
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

exports["default"] = Nodes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2Rlcy9Ob2Rlcy50cyJdLCJuYW1lcyI6WyJOb2RlcyIsImN0eCIsIl9jdHgiLCJuYW1lIiwiaW5zdGFuY2UiLCJjcmVhdGVCaXF1YWRGaWx0ZXIiLCJjcmVhdGVHYWluIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7OztJQUdxQkEsSzs7O0FBQ25COzs7Ozs7OztBQVNBOzs7QUFHQSxpQkFBWUMsR0FBWixFQUErQjtBQUFBO0FBQUE7QUFDN0IsU0FBS0MsSUFBTCxHQUFZRCxHQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7O21DQUtxQjtBQUNuQixhQUFPO0FBQUVFLFFBQUFBLElBQUksRUFBRSxjQUFSO0FBQXdCQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0YsSUFBTCxDQUFVRyxrQkFBVjtBQUFsQyxPQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7MkJBS2E7QUFDWCxhQUFPO0FBQUVGLFFBQUFBLElBQUksRUFBRSxNQUFSO0FBQWdCQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0YsSUFBTCxDQUFVSSxVQUFWO0FBQTFCLE9BQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IE5vZGUgZnJvbSAnLi4vaW50ZXJmYWNlcy9Ob2RlJztcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIGFkZGluZyB3ZWIgYXVkaW8gbm9kZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlcyB7XHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIEF1ZGlvQ29udGV4dC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXVkaW9Db250ZXh0fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2N0eDogQXVkaW9Db250ZXh0O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0F1ZGlvQ29udGV4dH0gY3R4IEEgcmVmZXJlbmNlIHRvIHRoZSBBdWRpb0NvbnRleHQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY3R4OiBBdWRpb0NvbnRleHQpIHtcclxuICAgIHRoaXMuX2N0eCA9IGN0eDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBiaXF1YWRGaWx0ZXIgbm9kZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Tm9kZX1cclxuICAgKi9cclxuICBiaXF1YWRGaWx0ZXIoKTogTm9kZSB7XHJcbiAgICByZXR1cm4geyBuYW1lOiAnYmlxdWFkRmlsdGVyJywgaW5zdGFuY2U6IHRoaXMuX2N0eC5jcmVhdGVCaXF1YWRGaWx0ZXIoKSB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGdhaW4gbm9kZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Tm9kZX1cclxuICAgKi9cclxuICBnYWluKCk6IE5vZGUge1xyXG4gICAgcmV0dXJuIHsgbmFtZTogJ2dhaW4nLCBpbnN0YW5jZTogdGhpcy5fY3R4LmNyZWF0ZUdhaW4oKSB9O1xyXG4gIH1cclxufSJdfQ==