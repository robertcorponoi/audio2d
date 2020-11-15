'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Audio2D = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Nodes = require("./Nodes");

var _audio_clip = require("./audio_clip");

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
      var clip = new _audio_clip.AudioClip(name, audio, options);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJBdWRpbzJEIiwiQXVkaW9Db250ZXh0IiwiTm9kZXMiLCJfY3R4IiwibmFtZSIsImF1ZGlvIiwib3B0aW9ucyIsImN0eCIsImNsaXAiLCJBdWRpb0NsaXAiLCJfY2xpcHMiLCJwdXNoIiwiZmluZCIsImNsaXBzIiwiZmlsdGVyIiwiX25vZGVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0lBQ2FBLE87OzttREFRb0IsSUFBSUMsWUFBSixFO3FEQVNNLEU7cURBU1gsSUFBSUMsWUFBSixDQUFVLEtBQUtDLElBQWYsQzs7Ozs7O0FBZ0J4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7NkJBQ2FDLEksRUFBY0MsSyxFQUErRDtBQUFBLFVBQTNDQyxPQUEyQyx1RUFBZixFQUFlO0FBQ2xGQSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsR0FBYyxLQUFLSixJQUFuQjtBQUVBLFVBQU1LLElBQUksR0FBRyxJQUFJQyxxQkFBSixDQUFjTCxJQUFkLEVBQW9CQyxLQUFwQixFQUEyQkMsT0FBM0IsQ0FBYjs7QUFDQSxXQUFLSSxNQUFMLENBQVlDLElBQVosQ0FBaUJILElBQWpCOztBQUVBLGFBQU9BLElBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNhSixJLEVBQXVDO0FBQzVDLGFBQU8sS0FBS00sTUFBTCxDQUFZRSxJQUFaLENBQWlCLFVBQUNKLElBQUQ7QUFBQSxlQUFxQkEsSUFBSSxDQUFDSixJQUFMLEtBQWNBLElBQW5DO0FBQUEsT0FBakIsQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Z0NBQ2dCQSxJLEVBQXVCO0FBQy9CLFdBQUtNLE1BQUwsR0FBYyxLQUFLRyxLQUFMLENBQVdDLE1BQVgsQ0FBa0IsVUFBQ04sSUFBRDtBQUFBLGVBQXFCQSxJQUFJLENBQUNKLElBQUwsS0FBY0EsSUFBbkM7QUFBQSxPQUFsQixDQUFkO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7cUNBQzhCO0FBQ3RCLFdBQUtNLE1BQUwsR0FBYyxFQUFkO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7Ozs7QUE5RkQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTt3QkFDa0M7QUFBRSxhQUFPLEtBQUtBLE1BQVo7QUFBcUI7QUFFckQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozt3QkFDdUI7QUFBRSxhQUFPLEtBQUtLLE1BQVo7QUFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCB7IE5vZGVzIH0gZnJvbSAnLi9Ob2Rlcyc7XHJcbmltcG9ydCB7IEF1ZGlvQ2xpcCB9IGZyb20gJy4vYXVkaW9fY2xpcCc7XHJcbmltcG9ydCB7IEF1ZGlvQ2xpcE9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvQXVkaW9DbGlwT3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogQXVkaW8yRCBpcyBhIHdlYiBhdWRpbyBoZWxwZXIgZm9yIGFkZGluZyBzb3VuZC9tdXNpYyB0byB5b3VyIEphdmFTY3JpcHQgZ2FtZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXVkaW8yRCB7XHJcbiAgICAvKipcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBhdWRpbyBjb250ZXh0LlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0F1ZGlvQ29udGV4dH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3R4OiBBdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGFsbCBvZiB0aGUgYXVkaW8gY2xpcHMgY3JlYXRlZC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtBcnJheTxBdWRpb0NsaXA+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jbGlwczogQXJyYXk8QXVkaW9DbGlwPiA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIG5vZGVzIG1vZHVsZS5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtOb2Rlc31cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbm9kZXM6IE5vZGVzID0gbmV3IE5vZGVzKHRoaXMuX2N0eCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjcmVhdGVkIGF1ZGlvIGNsaXBzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8QXVkaW9DbGlwPn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGNsaXBzKCk6IEFycmF5PEF1ZGlvQ2xpcD4geyByZXR1cm4gdGhpcy5fY2xpcHM7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5vZGVzIG1vZHVsZSB0byB1c2UgZm9yIGNyZWF0aW5nIG5vZGVzIGFuZCBhZGRpbmcgdGhlbSB0byBjbGlwcy5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge05vZGVzfVxyXG4gICAgICovXHJcbiAgICBnZXQgbm9kZXMoKTogTm9kZXMgeyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYXVkaW8gdG8gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoaXMgYXVkaW8gY2xpcCB1c2VkIHRvIHJlZmVyZW5jZSBpdC5cclxuICAgICAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IGJ1ZmZlciBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gYnVmZmVyIGZvciB0aGlzIGF1ZGlvLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNYXJrZXI+fSBbb3B0aW9ucy5tYXJrZXJzXSBBIGJyZWFrZG93biBvZiB0aGUgYXVkaW8gaW50byBpbmRpdmlkdWFsIHBhcnRzIHRoYXQgY2FuIGJlIHVzZWQgaW5kZXBlbmRlbnRseS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50cmlnZ2VyXSBBbiBpZCBvciBjbGFzc25hbWUgb2YgYSBkb20gZWxlbWVudCB0aGF0IHdoZW4gY2xpY2tlZCB3aWxsIHRyaWdnZXIgdGhlIGNsaXAgdG8gcGxheS5cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIFxyXG4gICAgICogLy8gQWRkaW5nIGFuIGF1ZGlvIGNsaXAgd2l0aCBubyBtYXJrZXJzLlxyXG4gICAgICogY29uc3QgbGV2ZWxVcCA9IGEyZC5hZGRBdWRpbygnbGV2ZWwtdXAnLCBsZXZlbFVwQnVmZmVyKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gQWRkaW5nIGFuIGF1ZGlvIGNsaXAgd2l0aCBtYXJrZXJzLlxyXG4gICAgICogY29uc3Qgc2Z4TWFya2VycyA9IFtcclxuICAgICAqICAgeyBuYW1lOiAnd2FsaycsIHN0YXJ0OiAxNTAwLCBkdXJhdGlvbjogMTAwMCB9LFxyXG4gICAgICogICB7IG5hbWU6ICdmYWxsJzogc3RhcnQ6IDI1MDAsIGR1cmF0aW9uOiAxNTAwIH0sXHJcbiAgICAgKiBdO1xyXG4gICAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIsIHsgbWFya2Vyczogc3hmTWFya2VycyB9KTtcclxuICAgICAqL1xyXG4gICAgYWRkQXVkaW8obmFtZTogc3RyaW5nLCBhdWRpbzogQXVkaW9CdWZmZXIsIG9wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnMgPSB7fSk6IEF1ZGlvQ2xpcCB7XHJcbiAgICAgICAgb3B0aW9ucy5jdHggPSB0aGlzLl9jdHg7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsaXAgPSBuZXcgQXVkaW9DbGlwKG5hbWUsIGF1ZGlvLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9jbGlwcy5wdXNoKGNsaXApO1xyXG5cclxuICAgICAgICByZXR1cm4gY2xpcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gYXVkaW8gY2xpcCBmcm9tIHRoZSBtZWRpYSBsaWJyYXJ5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcCB0byBnZXQuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtBdWRpb0NsaXB8dW5kZWZpbmVkfSBSZXR1cm5zIHRoZSBhdWRpbyBjbGlwIGlmIGl0cyBmb3VuZCBvciB1bmRlZmluZWQgb3RoZXJ3aXNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBhMmQuYWRkQXVkaW8oJ3RyYWNrMScsIGJ1ZmZlcik7XHJcbiAgICAgKiBcclxuICAgICAqIGNvbnN0IGNsaXAgPSBhMmQuZ2V0QXVkaW8oJ3RyYWNrMScpO1xyXG4gICAgICovXHJcbiAgICBnZXRBdWRpbyhuYW1lOiBzdHJpbmcpOiAoQXVkaW9DbGlwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaXBzLmZpbmQoKGNsaXA6IEF1ZGlvQ2xpcCkgPT4gY2xpcC5uYW1lID09PSBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gYXVkaW8gY2xpcCBmcm9tIHRoZSBtZWRpYSBsaWJyYXJ5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcCB0byByZW1vdmUuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtBdWRpbzJEfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBhMmQuYWRkQXVkaW8oJ3RyYWNrMScsIGJ1ZmZlcik7XHJcbiAgICAgKiBcclxuICAgICAqIGEyZC5yZW1vdmVBdWRpbygndHJhY2sxJyk7XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUF1ZGlvKG5hbWU6IHN0cmluZyk6IEF1ZGlvMkQge1xyXG4gICAgICAgIHRoaXMuX2NsaXBzID0gdGhpcy5jbGlwcy5maWx0ZXIoKGNsaXA6IEF1ZGlvQ2xpcCkgPT4gY2xpcC5uYW1lICE9PSBuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGF1ZGlvIGNsaXBzIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtBdWRpbzJEfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBhMmQuYWRkQXVkaW8oJ3RyYWNrMScsIGJ1ZmZlcjEpO1xyXG4gICAgICogYTJkLmFkZEF1ZGlvKCd0cmFjazInLCBidWZmZXIyKTtcclxuICAgICAqIFxyXG4gICAgICogYTJkLnJlbW92ZUFsbEF1ZGlvKCk7XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbEF1ZGlvKCk6IEF1ZGlvMkQge1xyXG4gICAgICAgIHRoaXMuX2NsaXBzID0gW107XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0iXX0=