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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2Rlcy9Ob2Rlcy50cyJdLCJuYW1lcyI6WyJOb2RlcyIsImN0eCIsIl9jdHgiLCJuYW1lIiwiaW5zdGFuY2UiLCJjcmVhdGVCaXF1YWRGaWx0ZXIiLCJjcmVhdGVHYWluIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7QUFDQTtBQUNBO0lBQ2FBLEs7QUFDVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDSSxpQkFBWUMsR0FBWixFQUErQjtBQUFBO0FBQUE7QUFDM0IsU0FBS0MsSUFBTCxHQUFZRCxHQUFaO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7OzttQ0FDeUI7QUFDakIsYUFBTztBQUFFRSxRQUFBQSxJQUFJLEVBQUUsY0FBUjtBQUF3QkMsUUFBQUEsUUFBUSxFQUFFLEtBQUtGLElBQUwsQ0FBVUcsa0JBQVY7QUFBbEMsT0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDaUI7QUFDVCxhQUFPO0FBQUVGLFFBQUFBLElBQUksRUFBRSxNQUFSO0FBQWdCQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0YsSUFBTCxDQUFVSSxVQUFWO0FBQTFCLE9BQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvTm9kZSc7XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBhZGRpbmcgd2ViIGF1ZGlvIG5vZGVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vZGVzIHtcclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIEF1ZGlvQ29udGV4dC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtBdWRpb0NvbnRleHR9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2N0eDogQXVkaW9Db250ZXh0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IGN0eCBBIHJlZmVyZW5jZSB0byB0aGUgQXVkaW9Db250ZXh0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjdHg6IEF1ZGlvQ29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBiaXF1YWRGaWx0ZXIgbm9kZS5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge05vZGV9XHJcbiAgICAgKi9cclxuICAgIGJpcXVhZEZpbHRlcigpOiBOb2RlIHtcclxuICAgICAgICByZXR1cm4geyBuYW1lOiAnYmlxdWFkRmlsdGVyJywgaW5zdGFuY2U6IHRoaXMuX2N0eC5jcmVhdGVCaXF1YWRGaWx0ZXIoKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGdhaW4gbm9kZS5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge05vZGV9XHJcbiAgICAgKi9cclxuICAgIGdhaW4oKTogTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogJ2dhaW4nLCBpbnN0YW5jZTogdGhpcy5fY3R4LmNyZWF0ZUdhaW4oKSB9O1xyXG4gICAgfVxyXG59Il19