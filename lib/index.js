'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AudioClip = _interopRequireDefault(require("./clip/AudioClip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Otic is a web audio helper for adding sound/music to your JavaScript games.
 */
var Otic =
/*#__PURE__*/
function () {
  function Otic() {
    _classCallCheck(this, Otic);

    _defineProperty(this, "_ctx", new AudioContext());

    _defineProperty(this, "_gain", this._ctx.createGain().connect(this._ctx.destination));

    _defineProperty(this, "_clips", {});
  }

  _createClass(Otic, [{
    key: "addAudio",

    /**
     * Adds audio to the media library.
     * 
     * @param {string} name The name of this audio clip used to reference it.
     * @param {AudioBuffer} buffer A reference to the audio buffer for this audio.
     * @param {Array<Marker>} [markers] A breakdown of the audio into individual parts that can be used independently.
     */
    value: function addAudio(name, audio) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options.gain = this._gain;
      var clip = new _AudioClip["default"](name, audio, options);
      this._clips[clip.name] = clip;
      return clip;
    }
  }]);

  return Otic;
}();

exports["default"] = Otic;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJPdGljIiwiQXVkaW9Db250ZXh0IiwiX2N0eCIsImNyZWF0ZUdhaW4iLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJuYW1lIiwiYXVkaW8iLCJvcHRpb25zIiwiZ2FpbiIsIl9nYWluIiwiY2xpcCIsIkF1ZGlvQ2xpcCIsIl9jbGlwcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBS0E7OztJQUdxQkEsSTs7Ozs7O2tDQVFVLElBQUlDLFlBQUosRTs7bUNBU0YsS0FBS0MsSUFBTCxDQUFVQyxVQUFWLEdBQXVCQyxPQUF2QixDQUErQixLQUFLRixJQUFMLENBQVVHLFdBQXpDLEM7O29DQVNFLEU7Ozs7OztBQUU3Qjs7Ozs7Ozs2QkFPU0MsSSxFQUFjQyxLLEVBQStEO0FBQUEsVUFBM0NDLE9BQTJDLHVFQUFmLEVBQWU7QUFDcEZBLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixHQUFlLEtBQUtDLEtBQXBCO0FBRUEsVUFBTUMsSUFBSSxHQUFHLElBQUlDLHFCQUFKLENBQWNOLElBQWQsRUFBb0JDLEtBQXBCLEVBQTJCQyxPQUEzQixDQUFiO0FBRUEsV0FBS0ssTUFBTCxDQUFZRixJQUFJLENBQUNMLElBQWpCLElBQXlCSyxJQUF6QjtBQUVBLGFBQU9BLElBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEF1ZGlvQ2xpcCBmcm9tICcuL2NsaXAvQXVkaW9DbGlwJztcclxuXHJcbmltcG9ydCBBdWRpb0NsaXBzIGZyb20gJy4vaW50ZXJmYWNlcy9BdWRpb0NsaXBzJztcclxuaW1wb3J0IEF1ZGlvQ2xpcE9wdGlvbnMgZnJvbSAnLi9jbGlwL0F1ZGlvQ2xpcE9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIE90aWMgaXMgYSB3ZWIgYXVkaW8gaGVscGVyIGZvciBhZGRpbmcgc291bmQvbXVzaWMgdG8geW91ciBKYXZhU2NyaXB0IGdhbWVzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3RpYyB7XHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGF1ZGlvIGNvbnRleHQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0F1ZGlvQ29udGV4dH1cclxuICAgKi9cclxuICBwcml2YXRlIF9jdHg6IEF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBnYWluIG5vZGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0dhaW5Ob2RlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dhaW46IEF1ZGlvTm9kZSA9IHRoaXMuX2N0eC5jcmVhdGVHYWluKCkuY29ubmVjdCh0aGlzLl9jdHguZGVzdGluYXRpb24pO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIG9mIHRoZSBhdWRpbyBjbGlwcyBjcmVhdGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBdWRpb0NsaXBzfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NsaXBzOiBBdWRpb0NsaXBzID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYXVkaW8gdG8gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhpcyBhdWRpbyBjbGlwIHVzZWQgdG8gcmVmZXJlbmNlIGl0LlxyXG4gICAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IGJ1ZmZlciBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gYnVmZmVyIGZvciB0aGlzIGF1ZGlvLlxyXG4gICAqIEBwYXJhbSB7QXJyYXk8TWFya2VyPn0gW21hcmtlcnNdIEEgYnJlYWtkb3duIG9mIHRoZSBhdWRpbyBpbnRvIGluZGl2aWR1YWwgcGFydHMgdGhhdCBjYW4gYmUgdXNlZCBpbmRlcGVuZGVudGx5LlxyXG4gICAqL1xyXG4gIGFkZEF1ZGlvKG5hbWU6IHN0cmluZywgYXVkaW86IEF1ZGlvQnVmZmVyLCBvcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zID0ge30pOiBBdWRpb0NsaXAge1xyXG4gICAgb3B0aW9ucy5nYWluID0gdGhpcy5fZ2FpbjtcclxuXHJcbiAgICBjb25zdCBjbGlwID0gbmV3IEF1ZGlvQ2xpcChuYW1lLCBhdWRpbywgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5fY2xpcHNbY2xpcC5uYW1lXSA9IGNsaXA7XHJcblxyXG4gICAgcmV0dXJuIGNsaXA7XHJcbiAgfVxyXG59Il19