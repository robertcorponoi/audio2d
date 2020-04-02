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
var Audio2D = /*#__PURE__*/function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJBdWRpbzJEIiwiQXVkaW9Db250ZXh0IiwiTm9kZXMiLCJfY3R4IiwibmFtZSIsImF1ZGlvIiwib3B0aW9ucyIsImN0eCIsImNsaXAiLCJBdWRpb0NsaXAiLCJfY2xpcHMiLCJwdXNoIiwiZmluZCIsImNsaXBzIiwiZmlsdGVyIiwiX25vZGVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBR0E7OztJQUdxQkEsTzs7O21EQVFVLElBQUlDLFlBQUosRTtxREFTTSxFO3FEQVNYLElBQUlDLGlCQUFKLENBQVUsS0FBS0MsSUFBZixDOzs7Ozs7QUFnQnhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBcUJTQyxJLEVBQWNDLEssRUFBK0Q7QUFBQSxVQUEzQ0MsT0FBMkMsdUVBQWYsRUFBZTtBQUNwRkEsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLEdBQWMsS0FBS0osSUFBbkI7QUFFQSxVQUFNSyxJQUFJLEdBQUcsSUFBSUMscUJBQUosQ0FBY0wsSUFBZCxFQUFvQkMsS0FBcEIsRUFBMkJDLE9BQTNCLENBQWI7O0FBRUEsV0FBS0ksTUFBTCxDQUFZQyxJQUFaLENBQWlCSCxJQUFqQjs7QUFFQSxhQUFPQSxJQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFhU0osSSxFQUF1QztBQUM5QyxhQUFPLEtBQUtNLE1BQUwsQ0FBWUUsSUFBWixDQUFpQixVQUFDSixJQUFEO0FBQUEsZUFBcUJBLElBQUksQ0FBQ0osSUFBTCxLQUFjQSxJQUFuQztBQUFBLE9BQWpCLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O2dDQWFZQSxJLEVBQXVCO0FBQ2pDLFdBQUtNLE1BQUwsR0FBYyxLQUFLRyxLQUFMLENBQVdDLE1BQVgsQ0FBa0IsVUFBQ04sSUFBRDtBQUFBLGVBQXFCQSxJQUFJLENBQUNKLElBQUwsS0FBY0EsSUFBbkM7QUFBQSxPQUFsQixDQUFkO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O3FDQVkwQjtBQUN4QixXQUFLTSxNQUFMLEdBQWMsRUFBZDtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7O0FBakdEOzs7Ozt3QkFLOEI7QUFBRSxhQUFPLEtBQUtBLE1BQVo7QUFBcUI7QUFFckQ7Ozs7Ozs7O3dCQUttQjtBQUFFLGFBQU8sS0FBS0ssTUFBWjtBQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IE5vZGVzIGZyb20gJy4vbm9kZXMvTm9kZXMnO1xyXG5pbXBvcnQgQXVkaW9DbGlwIGZyb20gJy4vY2xpcC9BdWRpb0NsaXAnO1xyXG5pbXBvcnQgQXVkaW9DbGlwT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvQXVkaW9DbGlwT3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogQXVkaW8yRCBpcyBhIHdlYiBhdWRpbyBoZWxwZXIgZm9yIGFkZGluZyBzb3VuZC9tdXNpYyB0byB5b3VyIEphdmFTY3JpcHQgZ2FtZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpbzJEIHtcclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gY29udGV4dC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXVkaW9Db250ZXh0fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2N0eDogQXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGFsbCBvZiB0aGUgYXVkaW8gY2xpcHMgY3JlYXRlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8QXVkaW9DbGlwPn1cclxuICAgKi9cclxuICBwcml2YXRlIF9jbGlwczogQXJyYXk8QXVkaW9DbGlwPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgbm9kZXMgbW9kdWxlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtOb2Rlc31cclxuICAgKi9cclxuICBwcml2YXRlIF9ub2RlczogTm9kZXMgPSBuZXcgTm9kZXModGhpcy5fY3R4KTtcclxuICBcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjcmVhdGVkIGF1ZGlvIGNsaXBzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxBdWRpb0NsaXA+fVxyXG4gICAqL1xyXG4gIGdldCBjbGlwcygpOiBBcnJheTxBdWRpb0NsaXA+IHsgcmV0dXJuIHRoaXMuX2NsaXBzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG5vZGVzIG1vZHVsZSB0byB1c2UgZm9yIGNyZWF0aW5nIG5vZGVzIGFuZCBhZGRpbmcgdGhlbSB0byBjbGlwcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Tm9kZXN9XHJcbiAgICovXHJcbiAgZ2V0IG5vZGVzKCk6IE5vZGVzIHsgcmV0dXJuIHRoaXMuX25vZGVzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYXVkaW8gdG8gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhpcyBhdWRpbyBjbGlwIHVzZWQgdG8gcmVmZXJlbmNlIGl0LlxyXG4gICAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IGJ1ZmZlciBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gYnVmZmVyIGZvciB0aGlzIGF1ZGlvLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcGFyYW0ge0FycmF5PE1hcmtlcj59IFtvcHRpb25zLm1hcmtlcnNdIEEgYnJlYWtkb3duIG9mIHRoZSBhdWRpbyBpbnRvIGluZGl2aWR1YWwgcGFydHMgdGhhdCBjYW4gYmUgdXNlZCBpbmRlcGVuZGVudGx5LlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50cmlnZ2VyXSBBbiBpZCBvciBjbGFzc25hbWUgb2YgYSBkb20gZWxlbWVudCB0aGF0IHdoZW4gY2xpY2tlZCB3aWxsIHRyaWdnZXIgdGhlIGNsaXAgdG8gcGxheS5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIC8vIEFkZGluZyBhbiBhdWRpbyBjbGlwIHdpdGggbm8gbWFya2Vycy5cclxuICAgKiBjb25zdCBsZXZlbFVwID0gYTJkLmFkZEF1ZGlvKCdsZXZlbC11cCcsIGxldmVsVXBCdWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIC8vIEFkZGluZyBhbiBhdWRpbyBjbGlwIHdpdGggbWFya2Vycy5cclxuICAgKiBjb25zdCBzZnhNYXJrZXJzID0gW1xyXG4gICAqICAgeyBuYW1lOiAnd2FsaycsIHN0YXJ0OiAxNTAwLCBkdXJhdGlvbjogMTAwMCB9LFxyXG4gICAqICAgeyBuYW1lOiAnZmFsbCc6IHN0YXJ0OiAyNTAwLCBkdXJhdGlvbjogMTUwMCB9LFxyXG4gICAqIF07XHJcbiAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIsIHsgbWFya2Vyczogc3hmTWFya2VycyB9KTtcclxuICAgKi9cclxuICBhZGRBdWRpbyhuYW1lOiBzdHJpbmcsIGF1ZGlvOiBBdWRpb0J1ZmZlciwgb3B0aW9uczogQXVkaW9DbGlwT3B0aW9ucyA9IHt9KTogQXVkaW9DbGlwIHtcclxuICAgIG9wdGlvbnMuY3R4ID0gdGhpcy5fY3R4O1xyXG5cclxuICAgIGNvbnN0IGNsaXAgPSBuZXcgQXVkaW9DbGlwKG5hbWUsIGF1ZGlvLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9jbGlwcy5wdXNoKGNsaXApO1xyXG5cclxuICAgIHJldHVybiBjbGlwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhbiBhdWRpbyBjbGlwIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAgdG8gZ2V0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBdWRpb0NsaXB8dW5kZWZpbmVkfSBSZXR1cm5zIHRoZSBhdWRpbyBjbGlwIGlmIGl0cyBmb3VuZCBvciB1bmRlZmluZWQgb3RoZXJ3aXNlLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogYTJkLmFkZEF1ZGlvKCd0cmFjazEnLCBidWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIGNvbnN0IGNsaXAgPSBhMmQuZ2V0QXVkaW8oJ3RyYWNrMScpO1xyXG4gICAqL1xyXG4gIGdldEF1ZGlvKG5hbWU6IHN0cmluZyk6IChBdWRpb0NsaXAgfCB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiB0aGlzLl9jbGlwcy5maW5kKChjbGlwOiBBdWRpb0NsaXApID0+IGNsaXAubmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFuIGF1ZGlvIGNsaXAgZnJvbSB0aGUgbWVkaWEgbGlicmFyeS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcCB0byByZW1vdmUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0F1ZGlvMkR9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBhMmQuYWRkQXVkaW8oJ3RyYWNrMScsIGJ1ZmZlcik7XHJcbiAgICogXHJcbiAgICogYTJkLnJlbW92ZUF1ZGlvKCd0cmFjazEnKTtcclxuICAgKi9cclxuICByZW1vdmVBdWRpbyhuYW1lOiBzdHJpbmcpOiBBdWRpbzJEIHtcclxuICAgIHRoaXMuX2NsaXBzID0gdGhpcy5jbGlwcy5maWx0ZXIoKGNsaXA6IEF1ZGlvQ2xpcCkgPT4gY2xpcC5uYW1lICE9PSBuYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYWxsIGF1ZGlvIGNsaXBzIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0F1ZGlvMkR9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBhMmQuYWRkQXVkaW8oJ3RyYWNrMScsIGJ1ZmZlcjEpO1xyXG4gICAqIGEyZC5hZGRBdWRpbygndHJhY2syJywgYnVmZmVyMik7XHJcbiAgICogXHJcbiAgICogYTJkLnJlbW92ZUFsbEF1ZGlvKCk7XHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsQXVkaW8oKTogQXVkaW8yRCB7XHJcbiAgICB0aGlzLl9jbGlwcyA9IFtdO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufSJdfQ==