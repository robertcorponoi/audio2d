'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Audio2D = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Nodes = require("./nodes/Nodes");

var _AudioClip = require("./clip/AudioClip");

/**
 * Audio2D is a web audio helper for adding sound/music to your JavaScript games.
 */
var Audio2D = /*#__PURE__*/function () {
  function Audio2D() {
    (0, _classCallCheck2["default"])(this, Audio2D);
    (0, _defineProperty2["default"])(this, "_ctx", new AudioContext());
    (0, _defineProperty2["default"])(this, "_clips", []);
    (0, _defineProperty2["default"])(this, "_nodes", new _Nodes.Nodes(this._ctx));
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
      var clip = new _AudioClip.AudioClip(name, audio, options);

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

exports.Audio2D = Audio2D;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJBdWRpbzJEIiwiQXVkaW9Db250ZXh0IiwiTm9kZXMiLCJfY3R4IiwibmFtZSIsImF1ZGlvIiwib3B0aW9ucyIsImN0eCIsImNsaXAiLCJBdWRpb0NsaXAiLCJfY2xpcHMiLCJwdXNoIiwiZmluZCIsImNsaXBzIiwiZmlsdGVyIiwiX25vZGVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0lBQ2FBLE87OzttREFRb0IsSUFBSUMsWUFBSixFO3FEQVNNLEU7cURBU1gsSUFBSUMsWUFBSixDQUFVLEtBQUtDLElBQWYsQzs7Ozs7O0FBZ0J4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7NkJBQ2FDLEksRUFBY0MsSyxFQUErRDtBQUFBLFVBQTNDQyxPQUEyQyx1RUFBZixFQUFlO0FBQ2xGQSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsR0FBYyxLQUFLSixJQUFuQjtBQUVBLFVBQU1LLElBQUksR0FBRyxJQUFJQyxvQkFBSixDQUFjTCxJQUFkLEVBQW9CQyxLQUFwQixFQUEyQkMsT0FBM0IsQ0FBYjs7QUFFQSxXQUFLSSxNQUFMLENBQVlDLElBQVosQ0FBaUJILElBQWpCOztBQUVBLGFBQU9BLElBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNhSixJLEVBQXVDO0FBQzVDLGFBQU8sS0FBS00sTUFBTCxDQUFZRSxJQUFaLENBQWlCLFVBQUNKLElBQUQ7QUFBQSxlQUFxQkEsSUFBSSxDQUFDSixJQUFMLEtBQWNBLElBQW5DO0FBQUEsT0FBakIsQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Z0NBQ2dCQSxJLEVBQXVCO0FBQy9CLFdBQUtNLE1BQUwsR0FBYyxLQUFLRyxLQUFMLENBQVdDLE1BQVgsQ0FBa0IsVUFBQ04sSUFBRDtBQUFBLGVBQXFCQSxJQUFJLENBQUNKLElBQUwsS0FBY0EsSUFBbkM7QUFBQSxPQUFsQixDQUFkO0FBRUEsYUFBTyxJQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7cUNBQzhCO0FBQ3RCLFdBQUtNLE1BQUwsR0FBYyxFQUFkO0FBRUEsYUFBTyxJQUFQO0FBQ0g7Ozs7QUFqR0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTt3QkFDa0M7QUFBRSxhQUFPLEtBQUtBLE1BQVo7QUFBcUI7QUFFckQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozt3QkFDdUI7QUFBRSxhQUFPLEtBQUtLLE1BQVo7QUFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCB7IE5vZGVzIH0gZnJvbSAnLi9ub2Rlcy9Ob2Rlcyc7XHJcbmltcG9ydCB7IEF1ZGlvQ2xpcCB9IGZyb20gJy4vY2xpcC9BdWRpb0NsaXAnO1xyXG5pbXBvcnQgeyBBdWRpb0NsaXBPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zL0F1ZGlvQ2xpcE9wdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEF1ZGlvMkQgaXMgYSB3ZWIgYXVkaW8gaGVscGVyIGZvciBhZGRpbmcgc291bmQvbXVzaWMgdG8geW91ciBKYXZhU2NyaXB0IGdhbWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1ZGlvMkQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gY29udGV4dC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtBdWRpb0NvbnRleHR9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2N0eDogQXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvYmplY3QgdGhhdCBjb250YWlucyBhbGwgb2YgdGhlIGF1ZGlvIGNsaXBzIGNyZWF0ZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXk8QXVkaW9DbGlwPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY2xpcHM6IEFycmF5PEF1ZGlvQ2xpcD4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBub2RlcyBtb2R1bGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Tm9kZXN9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX25vZGVzOiBOb2RlcyA9IG5ldyBOb2Rlcyh0aGlzLl9jdHgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3JlYXRlZCBhdWRpbyBjbGlwcy5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0FycmF5PEF1ZGlvQ2xpcD59XHJcbiAgICAgKi9cclxuICAgIGdldCBjbGlwcygpOiBBcnJheTxBdWRpb0NsaXA+IHsgcmV0dXJuIHRoaXMuX2NsaXBzOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBub2RlcyBtb2R1bGUgdG8gdXNlIGZvciBjcmVhdGluZyBub2RlcyBhbmQgYWRkaW5nIHRoZW0gdG8gY2xpcHMuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtOb2Rlc31cclxuICAgICAqL1xyXG4gICAgZ2V0IG5vZGVzKCk6IE5vZGVzIHsgcmV0dXJuIHRoaXMuX25vZGVzOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGF1ZGlvIHRvIHRoZSBtZWRpYSBsaWJyYXJ5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGlzIGF1ZGlvIGNsaXAgdXNlZCB0byByZWZlcmVuY2UgaXQuXHJcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQnVmZmVyfSBidWZmZXIgQSByZWZlcmVuY2UgdG8gdGhlIGF1ZGlvIGJ1ZmZlciBmb3IgdGhpcyBhdWRpby5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TWFya2VyPn0gW29wdGlvbnMubWFya2Vyc10gQSBicmVha2Rvd24gb2YgdGhlIGF1ZGlvIGludG8gaW5kaXZpZHVhbCBwYXJ0cyB0aGF0IGNhbiBiZSB1c2VkIGluZGVwZW5kZW50bHkuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudHJpZ2dlcl0gQW4gaWQgb3IgY2xhc3NuYW1lIG9mIGEgZG9tIGVsZW1lbnQgdGhhdCB3aGVuIGNsaWNrZWQgd2lsbCB0cmlnZ2VyIHRoZSBjbGlwIHRvIHBsYXkuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIC8vIEFkZGluZyBhbiBhdWRpbyBjbGlwIHdpdGggbm8gbWFya2Vycy5cclxuICAgICAqIGNvbnN0IGxldmVsVXAgPSBhMmQuYWRkQXVkaW8oJ2xldmVsLXVwJywgbGV2ZWxVcEJ1ZmZlcik7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEFkZGluZyBhbiBhdWRpbyBjbGlwIHdpdGggbWFya2Vycy5cclxuICAgICAqIGNvbnN0IHNmeE1hcmtlcnMgPSBbXHJcbiAgICAgKiAgIHsgbmFtZTogJ3dhbGsnLCBzdGFydDogMTUwMCwgZHVyYXRpb246IDEwMDAgfSxcclxuICAgICAqICAgeyBuYW1lOiAnZmFsbCc6IHN0YXJ0OiAyNTAwLCBkdXJhdGlvbjogMTUwMCB9LFxyXG4gICAgICogXTtcclxuICAgICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyLCB7IG1hcmtlcnM6IHN4Zk1hcmtlcnMgfSk7XHJcbiAgICAgKi9cclxuICAgIGFkZEF1ZGlvKG5hbWU6IHN0cmluZywgYXVkaW86IEF1ZGlvQnVmZmVyLCBvcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zID0ge30pOiBBdWRpb0NsaXAge1xyXG4gICAgICAgIG9wdGlvbnMuY3R4ID0gdGhpcy5fY3R4O1xyXG5cclxuICAgICAgICBjb25zdCBjbGlwID0gbmV3IEF1ZGlvQ2xpcChuYW1lLCBhdWRpbywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NsaXBzLnB1c2goY2xpcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjbGlwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBhdWRpbyBjbGlwIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwIHRvIGdldC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0F1ZGlvQ2xpcHx1bmRlZmluZWR9IFJldHVybnMgdGhlIGF1ZGlvIGNsaXAgaWYgaXRzIGZvdW5kIG9yIHVuZGVmaW5lZCBvdGhlcndpc2UuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGEyZC5hZGRBdWRpbygndHJhY2sxJywgYnVmZmVyKTtcclxuICAgICAqIFxyXG4gICAgICogY29uc3QgY2xpcCA9IGEyZC5nZXRBdWRpbygndHJhY2sxJyk7XHJcbiAgICAgKi9cclxuICAgIGdldEF1ZGlvKG5hbWU6IHN0cmluZyk6IChBdWRpb0NsaXAgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xpcHMuZmluZCgoY2xpcDogQXVkaW9DbGlwKSA9PiBjbGlwLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBhdWRpbyBjbGlwIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwIHRvIHJlbW92ZS5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0F1ZGlvMkR9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGEyZC5hZGRBdWRpbygndHJhY2sxJywgYnVmZmVyKTtcclxuICAgICAqIFxyXG4gICAgICogYTJkLnJlbW92ZUF1ZGlvKCd0cmFjazEnKTtcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQXVkaW8obmFtZTogc3RyaW5nKTogQXVkaW8yRCB7XHJcbiAgICAgICAgdGhpcy5fY2xpcHMgPSB0aGlzLmNsaXBzLmZpbHRlcigoY2xpcDogQXVkaW9DbGlwKSA9PiBjbGlwLm5hbWUgIT09IG5hbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGF1ZGlvIGNsaXBzIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtBdWRpbzJEfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBhMmQuYWRkQXVkaW8oJ3RyYWNrMScsIGJ1ZmZlcjEpO1xyXG4gICAgICogYTJkLmFkZEF1ZGlvKCd0cmFjazInLCBidWZmZXIyKTtcclxuICAgICAqIFxyXG4gICAgICogYTJkLnJlbW92ZUFsbEF1ZGlvKCk7XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbEF1ZGlvKCk6IEF1ZGlvMkQge1xyXG4gICAgICAgIHRoaXMuX2NsaXBzID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59Il19