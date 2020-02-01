'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AudioClipState = require("./AudioClipState");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An audio clip represents a piece of audio, which is either an audio html element or an audio boffer, as
 * a playable clip with extra properties.
 */
var AudioClip =
/*#__PURE__*/
function () {
  /**
   * The name of the audio clip.
   * 
   * @private
   * 
   * @property {string}
   */

  /**
   * A reference to the audio to play.
   * 
   * @private
   * 
   * @property 
   */

  /**
   * The audio buffer source of the clip.
   * 
   * @private
   * 
   * @property {AudioBufferSourceNode}
   */

  /**
   * A reference to the options for this audio clip.
   * 
   * @private
   * 
   * @property {AudioClipOptions}
   */

  /**
   * The current state of this clip.
   * 
   * @private
   * 
   * @property {AudioClipState}
   */

  /**
   * The number of times this clip has been played.
   * 
   * @private
   * 
   * @property 
   */

  /**
   * The time that this clip start being played at.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * When the clip is paused, this will keep track of when it was paused so it can be resumed at that time.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The current time of the clip.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The duration of the clip.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The volume of this audio clip.
   * 
   * @private
   * 
   * @property {number}
   * 
   * @default 100
   */

  /**
   * Keeps track of the previous volume of the clip.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {string} name The name of the audio clip.
   * @param {AudioBuffer} audio The AudioBuffer that contains the audio of the clip.
   * @param {AudioClipOptions} [options] The options passed to this audio clip.
   */
  function AudioClip(name, audio, options) {
    _classCallCheck(this, AudioClip);

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "_audio", void 0);

    _defineProperty(this, "_source", void 0);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_state", _AudioClipState.AudioClipState.STOPPED);

    _defineProperty(this, "_timesPlayed", 0);

    _defineProperty(this, "_timeStartedAt", 0);

    _defineProperty(this, "_timePausedAt", 0);

    _defineProperty(this, "_currentTime", 0);

    _defineProperty(this, "_duration", void 0);

    _defineProperty(this, "_volume", 100);

    _defineProperty(this, "_previousVolume", 1);

    this._name = name;
    this._audio = audio;
    this._duration = audio.duration;
    this._options = options;
    if (!this._options.markers) this._options.markers = [];
  }
  /**
   * Gets the name of the audio clip.
   * 
   * @returns {string}
   */


  _createClass(AudioClip, [{
    key: "play",

    /**
     * Plays this audio clip.
     * 
     * @param {string} marker The name of the marker of the part of the clip to play.
     */
    value: function play(marker) {
      var _this = this;

      var offset = this._timePausedAt;
      this._options.gain.value = this._volume / 100;
      this._source = this._options.ctx.createBufferSource();
      this._source.buffer = this._audio;

      this._source.connect(this._options.gain);

      this._source.onended = function () {
        _this._state = _AudioClipState.AudioClipState.STOPPED;
        _this._source.onended = null;
      };

      if (marker) {
        var _this$_options$marker, _this$_options$marker2;

        var clipMarker = (_this$_options$marker = this._options.markers) === null || _this$_options$marker === void 0 ? void 0 : _this$_options$marker.find(function (m) {
          return m.name === marker;
        });
        if (!clipMarker) return;

        this._source.start(0, clipMarker.start / 1000, clipMarker.duration ? clipMarker.duration / 1000 : undefined);

        if (clipMarker.name === 'otic-pause') this._options.markers = (_this$_options$marker2 = this._options.markers) === null || _this$_options$marker2 === void 0 ? void 0 : _this$_options$marker2.filter(function (marker) {
          return marker.name !== 'otic-pause';
        });
      } else {
        this._source.start();
      }

      this._timeStartedAt = this._options.ctx.currentTime - offset;
      this._timePausedAt = 0;
      this._state = _AudioClipState.AudioClipState.PLAYING;
      this._timesPlayed++;
    }
    /**
     * Pause the currently playing audio.
     */

  }, {
    key: "pause",
    value: function pause() {
      var _this$_options$marker3;

      var elapsed = this._options.ctx.currentTime - this._timeStartedAt;
      this.stop();
      this._timePausedAt = elapsed;
      (_this$_options$marker3 = this._options.markers) === null || _this$_options$marker3 === void 0 ? void 0 : _this$_options$marker3.push({
        name: 'otic-pause',
        start: this._timePausedAt * 1000
      });
      this._state = _AudioClipState.AudioClipState.PAUSED;
    }
    /**
     * Resumes playing this clip from when it was paused.
     */

  }, {
    key: "resume",
    value: function resume() {
      this.play('otic-pause');
    }
    /**
     * Stops the playback of this audio.
     * 
     * @returns {AudioClip} Returns this for chaining.
     */

  }, {
    key: "stop",
    value: function stop() {
      this._source.disconnect();

      this._source = this._options.ctx.createBufferSource();
      this._timePausedAt = 0;
      this._timeStartedAt = 0;
      this._state = _AudioClipState.AudioClipState.STOPPED;
    }
    /**
     * Mutes this clip.
     */

  }, {
    key: "mute",
    value: function mute() {
      this._previousVolume = this.volume;
      this.volume = 0;
    }
    /**
     * Puts the volume back to the value it was at before the clip was muted.
     */

  }, {
    key: "unmute",
    value: function unmute() {
      this.volume = this._previousVolume;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * Gets the current state of the audio clip.
     * 
     * @returns {string}
     */

  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
    /**
     * Gets the number of times that this clip has been played.
     * 
     * @returns {number}
     */

  }, {
    key: "timesPlayed",
    get: function get() {
      return this._timesPlayed;
    }
    /**
     * Gets the current time of the clip.
     * 
     * @returns {number}
     */

  }, {
    key: "currentTime",
    get: function get() {
      if (this._state === _AudioClipState.AudioClipState.PAUSED) return this._timePausedAt;
      if (this._state === _AudioClipState.AudioClipState.PLAYING) return this._options.ctx.currentTime - this._timeStartedAt;
      return 0;
    }
    /**
     * Gets the duration of the clip.
     * 
     * @returns {number}
     */

  }, {
    key: "duration",
    get: function get() {
      return this._duration;
    }
    /**
     * Gets the volume of this clip.
     * 
     * @returns {number}
     */

  }, {
    key: "volume",
    get: function get() {
      return this._volume;
    }
    /**
     * Sets the volume of this clip.
     * 
     * @param {number} vol The new volume of the clip.
     */
    ,
    set: function set(vol) {
      this._volume = vol;
      this._options.gain.value = this._volume / 100;

      this._options.gain.gain.setValueAtTime(this._options.gain.value, this._options.ctx.currentTime);
    }
  }]);

  return AudioClip;
}();

exports["default"] = AudioClip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGlwL0F1ZGlvQ2xpcC50cyJdLCJuYW1lcyI6WyJBdWRpb0NsaXAiLCJuYW1lIiwiYXVkaW8iLCJvcHRpb25zIiwiQXVkaW9DbGlwU3RhdGUiLCJTVE9QUEVEIiwiX25hbWUiLCJfYXVkaW8iLCJfZHVyYXRpb24iLCJkdXJhdGlvbiIsIl9vcHRpb25zIiwibWFya2VycyIsIm1hcmtlciIsIm9mZnNldCIsIl90aW1lUGF1c2VkQXQiLCJnYWluIiwidmFsdWUiLCJfdm9sdW1lIiwiX3NvdXJjZSIsImN0eCIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImJ1ZmZlciIsImNvbm5lY3QiLCJvbmVuZGVkIiwiX3N0YXRlIiwiY2xpcE1hcmtlciIsImZpbmQiLCJtIiwic3RhcnQiLCJ1bmRlZmluZWQiLCJmaWx0ZXIiLCJfdGltZVN0YXJ0ZWRBdCIsImN1cnJlbnRUaW1lIiwiUExBWUlORyIsIl90aW1lc1BsYXllZCIsImVsYXBzZWQiLCJzdG9wIiwicHVzaCIsIlBBVVNFRCIsInBsYXkiLCJkaXNjb25uZWN0IiwiX3ByZXZpb3VzVm9sdW1lIiwidm9sdW1lIiwidm9sIiwic2V0VmFsdWVBdFRpbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBS0E7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlxQkEsUzs7O0FBQ25COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0FBU0E7Ozs7O0FBS0EscUJBQVlDLElBQVosRUFBMEJDLEtBQTFCLEVBQThDQyxPQUE5QyxFQUF5RTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLG9DQXhFeENDLCtCQUFlQyxPQXdFeUI7O0FBQUEsMENBL0QxQyxDQStEMEM7O0FBQUEsNENBdER4QyxDQXNEd0M7O0FB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QUFlMEIsR0FBZjtBQUVBLFdBQUtqQyxRQUFMLENBQWNLLElBQWQsQ0FBbUJDLEtBQW5CLEdBQTJCLEtBQUtDLE9BQUwsR0FBZSxHQUExQzs7QUFFQSxXQUFLUCxRQUFMLENBQWNLLElBQWQsQ0FBbUJBLElBQW5CLENBQXdCNkIsY0FBeEIsQ0FBdUMsS0FBS2xDLFFBQUwsQ0FBY0ssSUFBZCxDQUFtQkMsS0FBMUQsRUFBaUUsS0FBS04sUUFBTCxDQUFjUyxHQUFkLENBQWtCYSxXQUFuRjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgQXVkaW9DbGlwT3B0aW9ucyBmcm9tICcuL0F1ZGlvQ2xpcE9wdGlvbnMnO1xyXG5cclxuaW1wb3J0IE1hcmtlciBmcm9tICcuLi9pbnRlcmZhY2VzL01hcmtlcic7XHJcbmltcG9ydCB7IEF1ZGlvQ2xpcFN0YXRlIH0gZnJvbSAnLi9BdWRpb0NsaXBTdGF0ZSdcclxuXHJcbi8qKlxyXG4gKiBBbiBhdWRpbyBjbGlwIHJlcHJlc2VudHMgYSBwaWVjZSBvZiBhdWRpbywgd2hpY2ggaXMgZWl0aGVyIGFuIGF1ZGlvIGh0bWwgZWxlbWVudCBvciBhbiBhdWRpbyBib2ZmZXIsIGFzXHJcbiAqIGEgcGxheWFibGUgY2xpcCB3aXRoIGV4dHJhIHByb3BlcnRpZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb0NsaXAge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gdG8gcGxheS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSBcclxuICAgKi9cclxuICBwcml2YXRlIF9hdWRpbzogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXVkaW8gYnVmZmVyIHNvdXJjZSBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXVkaW9CdWZmZXJTb3VyY2VOb2RlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NvdXJjZSE6IEF1ZGlvQnVmZmVyU291cmNlTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXVkaW9DbGlwT3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0F1ZGlvQ2xpcFN0YXRlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0YXRlOiBBdWRpb0NsaXBTdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlNUT1BQRUQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBjbGlwIGhhcyBiZWVuIHBsYXllZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSBcclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lc1BsYXllZDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWUgdGhhdCB0aGlzIGNsaXAgc3RhcnQgYmVpbmcgcGxheWVkIGF0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZVN0YXJ0ZWRBdDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgY2xpcCBpcyBwYXVzZWQsIHRoaXMgd2lsbCBrZWVwIHRyYWNrIG9mIHdoZW4gaXQgd2FzIHBhdXNlZCBzbyBpdCBjYW4gYmUgcmVzdW1lZCBhdCB0aGF0IHRpbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lUGF1c2VkQXQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9jdXJyZW50VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGR1cmF0aW9uIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHVyYXRpb246IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHZvbHVtZSBvZiB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAxMDBcclxuICAgKi9cclxuICBwcml2YXRlIF92b2x1bWUgPSAxMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBwcmV2aW91cyB2b2x1bWUgb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wcmV2aW91c1ZvbHVtZTogbnVtYmVyID0gMTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICogQHBhcmFtIHtBdWRpb0J1ZmZlcn0gYXVkaW8gVGhlIEF1ZGlvQnVmZmVyIHRoYXQgY29udGFpbnMgdGhlIGF1ZGlvIG9mIHRoZSBjbGlwLlxyXG4gICAqIEBwYXJhbSB7QXVkaW9DbGlwT3B0aW9uc30gW29wdGlvbnNdIFRoZSBvcHRpb25zIHBhc3NlZCB0byB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBhdWRpbzogQXVkaW9CdWZmZXIsIG9wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnMpIHtcclxuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuX2F1ZGlvID0gYXVkaW87XHJcblxyXG4gICAgdGhpcy5fZHVyYXRpb24gPSBhdWRpby5kdXJhdGlvbjtcclxuXHJcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICBpZiAoIXRoaXMuX29wdGlvbnMubWFya2VycykgdGhpcy5fb3B0aW9ucy5tYXJrZXJzID0gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldCBzdGF0ZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fc3RhdGU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHRpbWVzIHRoYXQgdGhpcyBjbGlwIGhhcyBiZWVuIHBsYXllZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB0aW1lc1BsYXllZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdGltZXNQbGF5ZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IGN1cnJlbnRUaW1lKCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IEF1ZGlvQ2xpcFN0YXRlLlBBVVNFRCkgcmV0dXJuIHRoaXMuX3RpbWVQYXVzZWRBdDtcclxuXHJcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IEF1ZGlvQ2xpcFN0YXRlLlBMQVlJTkcpIHJldHVybiB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIHRoaXMuX3RpbWVTdGFydGVkQXQ7XHJcblxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBkdXJhdGlvbiBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBkdXJhdGlvbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZHVyYXRpb247IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgdm9sdW1lIG9mIHRoaXMgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB2b2x1bWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZvbHVtZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB2b2x1bWUgb2YgdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2b2wgVGhlIG5ldyB2b2x1bWUgb2YgdGhlIGNsaXAuXHJcbiAgICovXHJcbiAgc2V0IHZvbHVtZSh2b2w6IG51bWJlcikgeyBcclxuICAgIHRoaXMuX3ZvbHVtZSA9IHZvbDsgXHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucy5nYWluLnZhbHVlID0gdGhpcy5fdm9sdW1lIC8gMTAwO1xyXG5cclxuICAgIHRoaXMuX29wdGlvbnMuZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHRoaXMuX29wdGlvbnMuZ2Fpbi52YWx1ZSwgdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGxheXMgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZXIgVGhlIG5hbWUgb2YgdGhlIG1hcmtlciBvZiB0aGUgcGFydCBvZiB0aGUgY2xpcCB0byBwbGF5LlxyXG4gICAqL1xyXG4gIHBsYXkobWFya2VyPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuX3RpbWVQYXVzZWRBdDtcclxuXHJcbiAgICB0aGlzLl9vcHRpb25zLmdhaW4udmFsdWUgPSB0aGlzLl92b2x1bWUgLyAxMDA7XHJcblxyXG4gICAgdGhpcy5fc291cmNlID0gdGhpcy5fb3B0aW9ucy5jdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcblxyXG4gICAgdGhpcy5fc291cmNlLmJ1ZmZlciA9IHRoaXMuX2F1ZGlvO1xyXG5cclxuICAgIHRoaXMuX3NvdXJjZS5jb25uZWN0KHRoaXMuX29wdGlvbnMuZ2Fpbik7XHJcblxyXG4gICAgdGhpcy5fc291cmNlLm9uZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuU1RPUFBFRDtcclxuXHJcbiAgICAgIHRoaXMuX3NvdXJjZS5vbmVuZGVkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKG1hcmtlcikge1xyXG4gICAgICBjb25zdCBjbGlwTWFya2VyOiAoTWFya2VyIHwgdW5kZWZpbmVkKSA9IHRoaXMuX29wdGlvbnMubWFya2Vycz8uZmluZCgobTogTWFya2VyKSA9PiBtLm5hbWUgPT09IG1hcmtlcik7XHJcblxyXG4gICAgICBpZiAoIWNsaXBNYXJrZXIpIHJldHVybjtcclxuXHJcbiAgICAgIHRoaXMuX3NvdXJjZS5zdGFydCgwLCBjbGlwTWFya2VyLnN0YXJ0IC8gMTAwMCwgY2xpcE1hcmtlci5kdXJhdGlvbiA/IGNsaXBNYXJrZXIuZHVyYXRpb24gLyAxMDAwIDogdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgIGlmIChjbGlwTWFya2VyLm5hbWUgPT09ICdvdGljLXBhdXNlJykgdGhpcy5fb3B0aW9ucy5tYXJrZXJzID0gdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5maWx0ZXIoKG1hcmtlcjogTWFya2VyKSA9PiBtYXJrZXIubmFtZSAhPT0gJ290aWMtcGF1c2UnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RpbWVTdGFydGVkQXQgPSB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIG9mZnNldDtcclxuXHJcbiAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSAwO1xyXG5cclxuICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuUExBWUlORztcclxuXHJcbiAgICB0aGlzLl90aW1lc1BsYXllZCsrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF1c2UgdGhlIGN1cnJlbnRseSBwbGF5aW5nIGF1ZGlvLlxyXG4gICAqL1xyXG4gIHBhdXNlKCkge1xyXG4gICAgY29uc3QgZWxhcHNlZDogbnVtYmVyID0gdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUgLSB0aGlzLl90aW1lU3RhcnRlZEF0O1xyXG5cclxuICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgXHJcbiAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSBlbGFwc2VkXHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ290aWMtcGF1c2UnLCBzdGFydDogdGhpcy5fdGltZVBhdXNlZEF0ICogMTAwMCB9KTtcclxuICAgIFxyXG4gICAgdGhpcy5fc3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5QQVVTRUQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN1bWVzIHBsYXlpbmcgdGhpcyBjbGlwIGZyb20gd2hlbiBpdCB3YXMgcGF1c2VkLlxyXG4gICAqL1xyXG4gIHJlc3VtZSgpIHtcclxuICAgIHRoaXMucGxheSgnb3RpYy1wYXVzZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgdGhlIHBsYXliYWNrIG9mIHRoaXMgYXVkaW8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0F1ZGlvQ2xpcH0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBzdG9wKCkge1xyXG4gICAgdGhpcy5fc291cmNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX29wdGlvbnMuY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cclxuICAgIHRoaXMuX3RpbWVQYXVzZWRBdCA9IDA7XHJcbiAgICB0aGlzLl90aW1lU3RhcnRlZEF0ID0gMDtcclxuICAgIFxyXG4gICAgdGhpcy5fc3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5TVE9QUEVEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTXV0ZXMgdGhpcyBjbGlwLlxyXG4gICAqL1xyXG4gIG11dGUoKSB7XHJcbiAgICB0aGlzLl9wcmV2aW91c1ZvbHVtZSA9IHRoaXMudm9sdW1lO1xyXG5cclxuICAgIHRoaXMudm9sdW1lID0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFB1dHMgdGhlIHZvbHVtZSBiYWNrIHRvIHRoZSB2YWx1ZSBpdCB3YXMgYXQgYmVmb3JlIHRoZSBjbGlwIHdhcyBtdXRlZC5cclxuICAgKi9cclxuICB1bm11dGUoKSB7XHJcbiAgICB0aGlzLnZvbHVtZSA9IHRoaXMuX3ByZXZpb3VzVm9sdW1lO1xyXG4gIH1cclxufSJdfQ==