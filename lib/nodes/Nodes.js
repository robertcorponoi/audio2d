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

exports["default"] = Nodes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2Rlcy9Ob2Rlcy50cyJdLCJuYW1lcyI6WyJOb2RlcyIsImN0eCIsIl9jdHgiLCJuYW1lIiwiaW5zdGFuY2UiLCJjcmVhdGVCaXF1YWRGaWx0ZXIiLCJjcmVhdGVHYWluIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7OztJQUdxQkEsSztBQUNuQjs7Ozs7Ozs7QUFTQTs7O0FBR0EsaUJBQVlDLEdBQVosRUFBK0I7QUFBQTtBQUFBO0FBQzdCLFNBQUtDLElBQUwsR0FBWUQsR0FBWjtBQUNEO0FBRUQ7Ozs7Ozs7OzttQ0FLcUI7QUFDbkIsYUFBTztBQUFFRSxRQUFBQSxJQUFJLEVBQUUsY0FBUjtBQUF3QkMsUUFBQUEsUUFBUSxFQUFFLEtBQUtGLElBQUwsQ0FBVUcsa0JBQVY7QUFBbEMsT0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7OzJCQUthO0FBQ1gsYUFBTztBQUFFRixRQUFBQSxJQUFJLEVBQUUsTUFBUjtBQUFnQkMsUUFBQUEsUUFBUSxFQUFFLEtBQUtGLElBQUwsQ0FBVUksVUFBVjtBQUExQixPQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBOb2RlIGZyb20gJy4uL2ludGVyZmFjZXMvTm9kZSc7XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBhZGRpbmcgd2ViIGF1ZGlvIG5vZGVzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZXMge1xyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBBdWRpb0NvbnRleHQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0F1ZGlvQ29udGV4dH1cclxuICAgKi9cclxuICBwcml2YXRlIF9jdHg6IEF1ZGlvQ29udGV4dDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IGN0eCBBIHJlZmVyZW5jZSB0byB0aGUgQXVkaW9Db250ZXh0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGN0eDogQXVkaW9Db250ZXh0KSB7XHJcbiAgICB0aGlzLl9jdHggPSBjdHg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgYmlxdWFkRmlsdGVyIG5vZGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge05vZGV9XHJcbiAgICovXHJcbiAgYmlxdWFkRmlsdGVyKCk6IE5vZGUge1xyXG4gICAgcmV0dXJuIHsgbmFtZTogJ2JpcXVhZEZpbHRlcicsIGluc3RhbmNlOiB0aGlzLl9jdHguY3JlYXRlQmlxdWFkRmlsdGVyKCkgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBnYWluIG5vZGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge05vZGV9XHJcbiAgICovXHJcbiAgZ2FpbigpOiBOb2RlIHtcclxuICAgIHJldHVybiB7IG5hbWU6ICdnYWluJywgaW5zdGFuY2U6IHRoaXMuX2N0eC5jcmVhdGVHYWluKCkgfTtcclxuICB9XHJcbn0iXX0=