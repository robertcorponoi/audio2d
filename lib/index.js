'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Nodes = _interopRequireDefault(require("./nodes/Nodes"));

var _AudioClip = _interopRequireDefault(require("./clip/AudioClip"));

/**
 * Audio2D is a web audio helper for adding sound/music to your JavaScript games.
 */
var Audio2D =
/*#__PURE__*/
function () {
  function Audio2D() {
    (0, _classCallCheck2["default"])(this, Audio2D);
    (0, _defineProperty2["default"])(this, "_ctx", new AudioContext());
    (0, _defineProperty2["default"])(this, "_clips", []);
    (0, _defineProperty2["default"])(this, "_nodes", new _Nodes["default"](this._ctx));
  }

  (0, _createClass2["default"])(Audio2D, [{
    key: "addAudio",

    /**
     * Adds audio to the media library.
     * 
     * @param {string} name The name of this audio clip used to reference it.
     * @param {AudioBuffer} buffer A reference to the audio buffer for this audio.
     * @param {Object} [options]
     * @param {Array<Marker>} [options.markers] A breakdown of the audio into individual parts that can be used independently.
     * @param {string} [options.trigger] An id or classname of a dom element that when clicked will trigger the clip to play.
     * 
     * @example
     * 
     * // Adding an audio clip with no markers.
     * const levelUp = a2d.addAudio('level-up', levelUpBuffer);
     * 
     * // Adding an audio clip with markers.
     * const sfxMarkers = [
     *   { name: 'walk', start: 1500, duration: 1000 },
     *   { name: 'fall': start: 2500, duration: 1500 },
     * ];
     * const sfx = a2d.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });
     */
    value: function addAudio(name, audio) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options.ctx = this._ctx;
      var clip = new _AudioClip["default"](name, audio, options);

      this._clips.push(clip);

      return clip;
    }
    /**
     * Gets an audio clip from the media library.
     * 
     * @param {string} name The name of the audio clip to get.
     * 
     * @returns {AudioClip|undefined} Returns the audio clip if its found or undefined otherwise.
     * 
     * @example
     * 
     * a2d.addAudio('track1', buffer);
     * 
     * const clip = a2d.getAudio('track1');
     */

  }, {
    key: "getAudio",
    value: function getAudio(name) {
      return this._clips.find(function (clip) {
        return clip.name === name;
      });
    }
    /**
     * Removes an audio clip from the media library.
     * 
     * @param {string} name The name of the audio clip to remove.
     * 
     * @returns {Audio2D} Returns this for chaining.
     * 
     * @example
     * 
     * a2d.addAudio('track1', buffer);
     * 
     * a2d.removeAudio('track1');
     */

  }, {
    key: "removeAudio",
    value: function removeAudio(name) {
      this._clips = this.clips.filter(function (clip) {
        return clip.name !== name;
      });
      return this;
    }
    /**
     * Removes all audio clips from the media library.
     * 
     * @returns {Audio2D} Returns this for chaining.
     * 
     * @example
     * 
     * a2d.addAudio('track1', buffer1);
     * a2d.addAudio('track2', buffer2);
     * 
     * a2d.removeAllAudio();
     */

  }, {
    key: "removeAllAudio",
    value: function removeAllAudio() {
      this._clips = [];
      return this;
    }
  }, {
    key: "clips",

    /**
     * Returns the created audio clips.
     * 
     * @returns {Array<AudioClip>}
     */
    get: function get() {
      return this._clips;
    }
    /**
     * Returns the nodes module to use for creating nodes and adding them to clips.
     * 
     * @returns {Nodes}
     */

  }, {
    key: "nodes",
    get: function get() {
      return this._nodes;
    }
  }]);
  return Audio2D;
}();

exports["default"] = Audio2D;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJBdWRpbzJEIiwiQXVkaW9Db250ZXh0IiwiTm9kZXMiLCJfY3R4IiwibmFtZSIsImF1ZGlvIiwib3B0aW9ucyIsImN0eCIsImNsaXAiLCJBdWRpb0NsaXAiLCJfY2xpcHMiLCJwdXNoIiwiZmluZCIsImNsaXBzIiwiZmlsdGVyIiwiX25vZGVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBR0E7OztJQUdxQkEsTzs7Ozs7bURBUVUsSUFBSUMsWUFBSixFO3FEQVNNLEU7cURBU1gsSUFBSUMsaUJBQUosQ0FBVSxLQUFLQyxJQUFmLEM7Ozs7OztBQWdCeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFxQlNDLEksRUFBY0MsSyxFQUErRDtBQUFBLFVBQTNDQyxPQUEyQyx1RUFBZixFQUFlO0FBQ3BGQSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsR0FBYyxLQUFLSixJQUFuQjtBQUVBLFVBQU1LLElBQUksR0FBRyxJQUFJQyxxQkFBSixDQUFjTCxJQUFkLEVBQW9CQyxLQUFwQixFQUEyQkMsT0FBM0IsQ0FBYjs7QUFFQSxXQUFLSSxNQUFMLENBQVlDLElBQVosQ0FBaUJILElBQWpCOztBQUVBLGFBQU9BLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7OzZCQWFTSixJLEVBQXVDO0FBQzlDLGFBQU8sS0FBS00sTUFBTCxDQUFZRSxJQUFaLENBQWlCLFVBQUNKLElBQUQ7QUFBQSxlQUFxQkEsSUFBSSxDQUFDSixJQUFMLEtBQWNBLElBQW5DO0FBQUEsT0FBakIsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBYVlBLEksRUFBdUI7QUFDakMsV0FBS00sTUFBTCxHQUFjLEtBQUtHLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQixVQUFDTixJQUFEO0FBQUEsZUFBcUJBLElBQUksQ0FBQ0osSUFBTCxLQUFjQSxJQUFuQztBQUFBLE9BQWxCLENBQWQ7QUFFQSxhQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7cUNBWTBCO0FBQ3hCLFdBQUtNLE1BQUwsR0FBYyxFQUFkO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7Ozs7QUFqR0Q7Ozs7O3dCQUs4QjtBQUFFLGFBQU8sS0FBS0EsTUFBWjtBQUFxQjtBQUVyRDs7Ozs7Ozs7d0JBS21CO0FBQUUsYUFBTyxLQUFLSyxNQUFaO0FBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgTm9kZXMgZnJvbSAnLi9ub2Rlcy9Ob2Rlcyc7XHJcbmltcG9ydCBBdWRpb0NsaXAgZnJvbSAnLi9jbGlwL0F1ZGlvQ2xpcCc7XHJcbmltcG9ydCBBdWRpb0NsaXBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9BdWRpb0NsaXBPcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBBdWRpbzJEIGlzIGEgd2ViIGF1ZGlvIGhlbHBlciBmb3IgYWRkaW5nIHNvdW5kL211c2ljIHRvIHlvdXIgSmF2YVNjcmlwdCBnYW1lcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvMkQge1xyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBhdWRpbyBjb250ZXh0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBdWRpb0NvbnRleHR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY3R4OiBBdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIG9mIHRoZSBhdWRpbyBjbGlwcyBjcmVhdGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxBdWRpb0NsaXA+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NsaXBzOiBBcnJheTxBdWRpb0NsaXA+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBub2RlcyBtb2R1bGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge05vZGVzfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25vZGVzOiBOb2RlcyA9IG5ldyBOb2Rlcyh0aGlzLl9jdHgpO1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNyZWF0ZWQgYXVkaW8gY2xpcHMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0FycmF5PEF1ZGlvQ2xpcD59XHJcbiAgICovXHJcbiAgZ2V0IGNsaXBzKCk6IEFycmF5PEF1ZGlvQ2xpcD4geyByZXR1cm4gdGhpcy5fY2xpcHM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbm9kZXMgbW9kdWxlIHRvIHVzZSBmb3IgY3JlYXRpbmcgbm9kZXMgYW5kIGFkZGluZyB0aGVtIHRvIGNsaXBzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtOb2Rlc31cclxuICAgKi9cclxuICBnZXQgbm9kZXMoKTogTm9kZXMgeyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhdWRpbyB0byB0aGUgbWVkaWEgbGlicmFyeS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGlzIGF1ZGlvIGNsaXAgdXNlZCB0byByZWZlcmVuY2UgaXQuXHJcbiAgICogQHBhcmFtIHtBdWRpb0J1ZmZlcn0gYnVmZmVyIEEgcmVmZXJlbmNlIHRvIHRoZSBhdWRpbyBidWZmZXIgZm9yIHRoaXMgYXVkaW8uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gICAqIEBwYXJhbSB7QXJyYXk8TWFya2VyPn0gW29wdGlvbnMubWFya2Vyc10gQSBicmVha2Rvd24gb2YgdGhlIGF1ZGlvIGludG8gaW5kaXZpZHVhbCBwYXJ0cyB0aGF0IGNhbiBiZSB1c2VkIGluZGVwZW5kZW50bHkuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRyaWdnZXJdIEFuIGlkIG9yIGNsYXNzbmFtZSBvZiBhIGRvbSBlbGVtZW50IHRoYXQgd2hlbiBjbGlja2VkIHdpbGwgdHJpZ2dlciB0aGUgY2xpcCB0byBwbGF5LlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogLy8gQWRkaW5nIGFuIGF1ZGlvIGNsaXAgd2l0aCBubyBtYXJrZXJzLlxyXG4gICAqIGNvbnN0IGxldmVsVXAgPSBhMmQuYWRkQXVkaW8oJ2xldmVsLXVwJywgbGV2ZWxVcEJ1ZmZlcik7XHJcbiAgICogXHJcbiAgICogLy8gQWRkaW5nIGFuIGF1ZGlvIGNsaXAgd2l0aCBtYXJrZXJzLlxyXG4gICAqIGNvbnN0IHNmeE1hcmtlcnMgPSBbXHJcbiAgICogICB7IG5hbWU6ICd3YWxrJywgc3RhcnQ6IDE1MDAsIGR1cmF0aW9uOiAxMDAwIH0sXHJcbiAgICogICB7IG5hbWU6ICdmYWxsJzogc3RhcnQ6IDI1MDAsIGR1cmF0aW9uOiAxNTAwIH0sXHJcbiAgICogXTtcclxuICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlciwgeyBtYXJrZXJzOiBzeGZNYXJrZXJzIH0pO1xyXG4gICAqL1xyXG4gIGFkZEF1ZGlvKG5hbWU6IHN0cmluZywgYXVkaW86IEF1ZGlvQnVmZmVyLCBvcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zID0ge30pOiBBdWRpb0NsaXAge1xyXG4gICAgb3B0aW9ucy5jdHggPSB0aGlzLl9jdHg7XHJcblxyXG4gICAgY29uc3QgY2xpcCA9IG5ldyBBdWRpb0NsaXAobmFtZSwgYXVkaW8sIG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX2NsaXBzLnB1c2goY2xpcCk7XHJcblxyXG4gICAgcmV0dXJuIGNsaXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIGF1ZGlvIGNsaXAgZnJvbSB0aGUgbWVkaWEgbGlicmFyeS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcCB0byBnZXQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0F1ZGlvQ2xpcHx1bmRlZmluZWR9IFJldHVybnMgdGhlIGF1ZGlvIGNsaXAgaWYgaXRzIGZvdW5kIG9yIHVuZGVmaW5lZCBvdGhlcndpc2UuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBhMmQuYWRkQXVkaW8oJ3RyYWNrMScsIGJ1ZmZlcik7XHJcbiAgICogXHJcbiAgICogY29uc3QgY2xpcCA9IGEyZC5nZXRBdWRpbygndHJhY2sxJyk7XHJcbiAgICovXHJcbiAgZ2V0QXVkaW8obmFtZTogc3RyaW5nKTogKEF1ZGlvQ2xpcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NsaXBzLmZpbmQoKGNsaXA6IEF1ZGlvQ2xpcCkgPT4gY2xpcC5uYW1lID09PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYW4gYXVkaW8gY2xpcCBmcm9tIHRoZSBtZWRpYSBsaWJyYXJ5LlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwIHRvIHJlbW92ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXVkaW8yRH0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGEyZC5hZGRBdWRpbygndHJhY2sxJywgYnVmZmVyKTtcclxuICAgKiBcclxuICAgKiBhMmQucmVtb3ZlQXVkaW8oJ3RyYWNrMScpO1xyXG4gICAqL1xyXG4gIHJlbW92ZUF1ZGlvKG5hbWU6IHN0cmluZyk6IEF1ZGlvMkQge1xyXG4gICAgdGhpcy5fY2xpcHMgPSB0aGlzLmNsaXBzLmZpbHRlcigoY2xpcDogQXVkaW9DbGlwKSA9PiBjbGlwLm5hbWUgIT09IG5hbWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgYXVkaW8gY2xpcHMgZnJvbSB0aGUgbWVkaWEgbGlicmFyeS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXVkaW8yRH0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGEyZC5hZGRBdWRpbygndHJhY2sxJywgYnVmZmVyMSk7XHJcbiAgICogYTJkLmFkZEF1ZGlvKCd0cmFjazInLCBidWZmZXIyKTtcclxuICAgKiBcclxuICAgKiBhMmQucmVtb3ZlQWxsQXVkaW8oKTtcclxuICAgKi9cclxuICByZW1vdmVBbGxBdWRpbygpOiBBdWRpbzJEIHtcclxuICAgIHRoaXMuX2NsaXBzID0gW107XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59Il19