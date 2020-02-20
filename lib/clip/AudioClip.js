'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _AudioClipState = require("../enums/AudioClipState");

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
   * A reference to the gain node for this clip.
   * 
   * @private
   * 
   * @property {GainNode}
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
   * A reference to the nodes that have been added for this clip.
   * 
   * @private
   * 
   * @property {Array<Node>}
   */

  /**
   * A reference to the nodes that have been added in a way that allows them to be retrieved easily.
   * 
   * @private
   * 
   * @property {*}
   */

  /**
   * Indicates whether this audio clip is played on a loop or not.
   * 
   * @property {boolean}
   * 
   * @default false
   */

  /**
   * @param {string} name The name of the audio clip.
   * @param {AudioBuffer} audio The AudioBuffer that contains the audio of the clip.
   * @param {AudioClipOptions} [options] The options passed to this audio clip.
   */
  function AudioClip(name, audio, options) {
    (0, _classCallCheck2["default"])(this, AudioClip);
    (0, _defineProperty2["default"])(this, "_name", void 0);
    (0, _defineProperty2["default"])(this, "_audio", void 0);
    (0, _defineProperty2["default"])(this, "_source", void 0);
    (0, _defineProperty2["default"])(this, "_options", void 0);
    (0, _defineProperty2["default"])(this, "_gain", void 0);
    (0, _defineProperty2["default"])(this, "_state", _AudioClipState.AudioClipState.STOPPED);
    (0, _defineProperty2["default"])(this, "_timesPlayed", 0);
    (0, _defineProperty2["default"])(this, "_timeStartedAt", 0);
    (0, _defineProperty2["default"])(this, "_timePausedAt", 0);
    (0, _defineProperty2["default"])(this, "_currentTime", 0);
    (0, _defineProperty2["default"])(this, "_duration", void 0);
    (0, _defineProperty2["default"])(this, "_volume", 100);
    (0, _defineProperty2["default"])(this, "_previousVolume", 1);
    (0, _defineProperty2["default"])(this, "_nodesref", []);
    (0, _defineProperty2["default"])(this, "_nodes", {});
    (0, _defineProperty2["default"])(this, "_effects", {});
    (0, _defineProperty2["default"])(this, "loop", false);
    this._name = name;
    this._audio = audio;
    this._duration = audio.duration;
    this._options = options;
    this._gain = this._options.ctx.createGain();

    this._gain.connect(this._options.ctx.destination);

    if (this._options.trigger) this._setupTrigger();
    if (!this._options.markers) this._options.markers = [];
  }
  /**
   * Gets the name of the audio clip.
   * 
   * @returns {string}
   */


  (0, _createClass2["default"])(AudioClip, [{
    key: "addNode",

    /**
     * Adds a custom node from `app.nodes[nodeName]`.
     * 
     * @param {Node} node The node to add to this clip.
     * 
     * @example
     * 
     * const track = a2d.addAudio('track-1', track1Buffer);
     * 
     * const bf = a2d.nodes.biquadFilter();
     * track.addNode(bf);
     */
    value: function addNode(node) {
      this._nodes[node.name] = node.instance;

      this._nodesref.push(node);

      if (this._nodesref.length === 1) return;
      var latestNode = this._nodesref[this._nodesref.length - 2];
      node.instance.connect(latestNode.instance);
    }
    /**
     * Plays this audio clip.
     * 
     * @param {string} marker The name of the marker of the part of the clip to play.
     * 
     * @example
     * 
     * const sfxMarkers = [{ name: 'walk', start: 1500, duration: 1000 }, { name: 'fall': start: 2500, duration: 1500 }];
     * const sfx = a2d.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });
     * 
     * // play just the falling sound.
     * sfx.play('fall');
     */

  }, {
    key: "play",
    value: function play(marker) {
      var offset = this._timePausedAt;
      this._source = this._options.ctx.createBufferSource();
      this._source.buffer = this._audio;
      this._source.loop = this.loop;

      this._connectNodes();

      this._oncomplete();

      if (marker) {
        var _this$_options$marker;

        var clipMarker = (_this$_options$marker = this._options.markers) === null || _this$_options$marker === void 0 ? void 0 : _this$_options$marker.find(function (m) {
          return m.name === marker;
        });
        if (!clipMarker) return;

        this._source.start(0, clipMarker.start / 1000, clipMarker.duration ? clipMarker.duration / 1000 : undefined);

        this._resetA2DMarkers(clipMarker);
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
     * 
     * @example
     * 
     * const sfx = a2d.addAudio('sfx', sfxBuffer);
     * sfx.play();
     * 
     * setTimeout(() => {
     *   sfx.pause();
     * }, 1000);
     */

  }, {
    key: "pause",
    value: function pause() {
      var _this$_options$marker2;

      var elapsed = this._options.ctx.currentTime - this._timeStartedAt;
      this.stop();
      this._timePausedAt = elapsed;
      (_this$_options$marker2 = this._options.markers) === null || _this$_options$marker2 === void 0 ? void 0 : _this$_options$marker2.push({
        name: 'a2d-pause',
        start: this._timePausedAt * 1000
      });
      this._state = _AudioClipState.AudioClipState.PAUSED;
    }
    /**
     * Resumes playing this clip from when it was paused.
     * 
     * @example
     * 
     * const sfx = a2d.addAudio('sfx', sfxBuffer);
     * sfx.play();
     * sfx.pause();
     * 
     * setTimeout(() => {
     *   sfx.resume();
     * }, 1000);
     */

  }, {
    key: "resume",
    value: function resume() {
      this.play('a2d-pause');
    }
    /**
     * Stops the playback of this audio.
     * 
     * @returns {AudioClip} Returns this for chaining.
     * 
     * @example
     * 
     * const sfx = a2d.addAudio('sfx', sfxBuffer);
     * 
     * sfx.play();
     * sfx.stop();
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
     * Seeks to a specific time in the clip.
     * 
     * @param {number} time The time, in milliseconds, to seek to.
     */

  }, {
    key: "seek",
    value: function seek(time) {
      var _this$_options$marker3;

      if (!time) return;

      if (time > this.duration * 1000) {
        console.warn('The time to seek to is greater than the duration of the clip.');
        return;
      }

      if (this._state === _AudioClipState.AudioClipState.PLAYING) {
        this.stop();
      }

      (_this$_options$marker3 = this._options.markers) === null || _this$_options$marker3 === void 0 ? void 0 : _this$_options$marker3.push({
        name: 'a2d-seek',
        start: time
      });
      this.play('a2d-seek');
    }
    /**
     * Mutes this clip.
     * 
     * @example
     * 
     * const sfx = a2d.addAudio('sfx', sfxBuffer);
     * 
     * sfx.play();
     * sfx.mute();
     */

  }, {
    key: "mute",
    value: function mute() {
      this._previousVolume = this.volume;
      this.volume = 0;
    }
    /**
     * Puts the volume back to the value it was at before the clip was muted.
     * 
     * @example
     * 
     * const sfx = a2d.addAudio('sfx', sfxBuffer);
     * sfx.play();
     * 
     * sfx.mute();
     * sfx.unmute();
     */

  }, {
    key: "unmute",
    value: function unmute() {
      this.volume = this._previousVolume;
    }
    /**
     * Sets up an onclick event on a trigger element if one was provided in the options.
     * 
     * @private
     */

  }, {
    key: "_setupTrigger",
    value: function _setupTrigger() {
      var _this = this;

      var el = document.querySelector(this._options.trigger);
      if (!el) return;
      el.addEventListener('click', function () {
        return _this.play();
      });
    }
    /**
     * Connects the nodes that have been added through `addNode`.
     * 
     * @private
     */

  }, {
    key: "_connectNodes",
    value: function _connectNodes() {
      if (this._nodesref.length > 0) {
        var firstNode = this._nodesref[0];
        var latestNode = this._nodesref[this._nodesref.length - 1];

        this._source.connect(latestNode.instance);

        firstNode.instance.connect(this._gain);
      } else {
        this._source.connect(this._gain);
      }
    }
    /**
     * Specify what happens when a clip is finished playing.
     * 
     * @private
     */

  }, {
    key: "_oncomplete",
    value: function _oncomplete() {
      var _this2 = this;

      this._source.onended = function () {
        _this2._state = _AudioClipState.AudioClipState.STOPPED;
        _this2._source.onended = null;
      };
    }
    /**
     * Resets any markers set internally.
     * 
     * @private
     * 
     * @param {Marker} clipMarker The marker to check if should be removed.
     */

  }, {
    key: "_resetA2DMarkers",
    value: function _resetA2DMarkers(clipMarker) {
      var _this$_options$marker4;

      if (clipMarker.name.includes('a2d')) this._options.markers = (_this$_options$marker4 = this._options.markers) === null || _this$_options$marker4 === void 0 ? void 0 : _this$_options$marker4.filter(function (marker) {
        return !marker.name.includes('a2d');
      });
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

      this._gain.gain.setValueAtTime(this._volume / 100, this._options.ctx.currentTime);
    }
    /**
     * Gets the created nodes.
     * 
     * @returns {*}
     */

  }, {
    key: "nodes",
    get: function get() {
      return this._nodes;
    }
  }]);
  return AudioClip;
}();

exports["default"] = AudioClip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGlwL0F1ZGlvQ2xpcC50cyJdLCJuYW1lcyI6WyJBdWRpb0NsaXAiLCJuYW1lIiwiYXVkaW8iLCJvcHRpb25zIiwiQXVkaW9DbGlwU3RhdGUiLCJTVE9QUEVEIiwiX25hbWUiLCJfYXVkaW8iLCJfZHVyYXRpb24iLCJkdXJhdGlvbiIsIl9vcHRpb25zIiwiX2dhaW4iLCJjdHgiLCJjcmVhdGVHYWluIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwidHJpZ2dlciIsIl9zZXR1cFRyaWdnZXIiLCJtYXJrZXJzIiwibm9kZSIsIl9ub2RlcyIsImluc3RhbmNlIiwiX25vZGVzcmVmIiwicHVzaCIsImxlbmd0aCIsImxhdGVzdE5vZGUiLCJtYXJrZXIiLCJvZmZzZXQiLCJfdGltZVBhdXNlZEF0IiwiX3NvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImJ1ZmZlciIsImxvb3AiLCJfY29ubmVjdE5vZGVzIiwiX29uY29tcGxldGUiLCJjbGlwTWFya2VyIiwiZmluZCIsIm0iLCJzdGFydCIsInVuZGVmaW5lZCIsIl9yZXNldEEyRE1hcmtlcnMiLCJfdGltZVN0YXJ0ZWRBdCIsImN1cnJlbnRUaW1lIiwiX3N0YXRlIiwiUExBWUlORyIsIl90aW1lc1BsYXllZCIsImVsYXBzZWQiLCJzdG9wIiwiUEFVU0VEIiwicGxheSIsImRpc2Nvbm5lY3QiLCJ0aW1lIiwiY29uc29sZSIsIndhcm4iLCJfcHJldmlvdXNWb2x1bWUiLCJ2b2x1bWUiLCJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJmaXJzdE5vZGUiLCJvbmVuZGVkIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJfdm9sdW1lIiwidm9sIiwiZ2FpbiIsInNldFZhbHVlQXRUaW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7O0FBRUE7Ozs7SUFJcUJBLFM7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFT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QUwsS0FBZ0J2QywrQkFBZXdDLE9BQW5DLEVBQTRDLE9BQU8sS0FBS2xDLFFBQUwsQ0FBY0UsR0FBZCxDQUFrQjhCLFdBQWxCLEdBQWdDLEtBQUtELGNBQTVDO0FBRTVDLGFBQU8sQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O3dCQUt1QjtBQUFFLGFBQU8sS0FBS2pDLFNBQVo7QUFBd0I7QUFFakQ7Ozs7Ozs7O3dCQUtxQjtBQUFFLGFBQU8sS0FBS3dELE9BQVo7QUFBc0I7QUFFN0M7Ozs7OztzQkFLV0MsRyxFQUFhO0FBQ3RCLFdBQUtELE9BQUwsR0FBZUMsR0FBZjs7QUFFQSxXQUFLdEQsS0FBTCxDQUFXdUQsSUFBWCxDQUFnQkMsY0FBaEIsQ0FBK0IsS0FBS0gsT0FBTCxHQUFlLEdBQTlDLEVBQW1ELEtBQUt0RCxRQUFMLENBQWNFLEdBQWQsQ0FBa0I4QixXQUFyRTtBQUNEO0FBRUQ7Ozs7Ozs7O3dCQUtpQjtBQUFFLGFBQU8sS0FBS3RCLE1BQVo7QUFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBBdWRpb0NsaXBPcHRpb25zIGZyb20gJy4uL29wdGlvbnMvQXVkaW9DbGlwT3B0aW9ucyc7XHJcblxyXG5pbXBvcnQgTm9kZSBmcm9tICcuLi9pbnRlcmZhY2VzL05vZGUnO1xyXG5pbXBvcnQgTWFya2VyIGZyb20gJy4uL2ludGVyZmFjZXMvTWFya2VyJztcclxuXHJcbmltcG9ydCB7IEF1ZGlvQ2xpcFN0YXRlIH0gZnJvbSAnLi4vZW51bXMvQXVkaW9DbGlwU3RhdGUnXHJcblxyXG4vKipcclxuICogQW4gYXVkaW8gY2xpcCByZXByZXNlbnRzIGEgcGllY2Ugb2YgYXVkaW8sIHdoaWNoIGlzIGVpdGhlciBhbiBhdWRpbyBodG1sIGVsZW1lbnQgb3IgYW4gYXVkaW8gYm9mZmVyLCBhc1xyXG4gKiBhIHBsYXlhYmxlIGNsaXAgd2l0aCBleHRyYSBwcm9wZXJ0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9DbGlwIHtcclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGF1ZGlvIHRvIHBsYXkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXVkaW86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF1ZGlvIGJ1ZmZlciBzb3VyY2Ugb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0F1ZGlvQnVmZmVyU291cmNlTm9kZX1cclxuICAgKi9cclxuICBwcml2YXRlIF9zb3VyY2UhOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25zIGZvciB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0F1ZGlvQ2xpcE9wdGlvbnN9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogQXVkaW9DbGlwT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGdhaW4gbm9kZSBmb3IgdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtHYWluTm9kZX1cclxuICAgKi9cclxuICBwcml2YXRlIF9nYWluOiBHYWluTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBdWRpb0NsaXBTdGF0ZX1cclxuICAgKi9cclxuICBwcml2YXRlIF9zdGF0ZTogQXVkaW9DbGlwU3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5TVE9QUEVEO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoaXMgY2xpcCBoYXMgYmVlbiBwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZXNQbGF5ZWQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0aW1lIHRoYXQgdGhpcyBjbGlwIHN0YXJ0IGJlaW5nIHBsYXllZCBhdC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVTdGFydGVkQXQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGNsaXAgaXMgcGF1c2VkLCB0aGlzIHdpbGwga2VlcCB0cmFjayBvZiB3aGVuIGl0IHdhcyBwYXVzZWQgc28gaXQgY2FuIGJlIHJlc3VtZWQgYXQgdGhhdCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZVBhdXNlZEF0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB0aW1lIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY3VycmVudFRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkdXJhdGlvbiBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2R1cmF0aW9uOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB2b2x1bWUgb2YgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgMTAwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdm9sdW1lOiBudW1iZXIgPSAxMDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBwcmV2aW91cyB2b2x1bWUgb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wcmV2aW91c1ZvbHVtZTogbnVtYmVyID0gMTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIGZvciB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PE5vZGU+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25vZGVzcmVmOiBBcnJheTxOb2RlPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgbm9kZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgaW4gYSB3YXkgdGhhdCBhbGxvd3MgdGhlbSB0byBiZSByZXRyaWV2ZWQgZWFzaWx5LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHsqfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25vZGVzOiBhbnkgPSB7fTtcclxuXHJcbiAgcHJpdmF0ZSBfZWZmZWN0czogYW55ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgYXVkaW8gY2xpcCBpcyBwbGF5ZWQgb24gYSBsb29wIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgKi9cclxuICBsb29wOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IGF1ZGlvIFRoZSBBdWRpb0J1ZmZlciB0aGF0IGNvbnRhaW5zIHRoZSBhdWRpbyBvZiB0aGUgY2xpcC5cclxuICAgKiBAcGFyYW0ge0F1ZGlvQ2xpcE9wdGlvbnN9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBwYXNzZWQgdG8gdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgYXVkaW86IEF1ZGlvQnVmZmVyLCBvcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zKSB7XHJcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuXHJcbiAgICB0aGlzLl9hdWRpbyA9IGF1ZGlvO1xyXG5cclxuICAgIHRoaXMuX2R1cmF0aW9uID0gYXVkaW8uZHVyYXRpb247XHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcblxyXG4gICAgdGhpcy5fZ2FpbiA9IHRoaXMuX29wdGlvbnMuY3R4LmNyZWF0ZUdhaW4oKTtcclxuXHJcbiAgICB0aGlzLl9nYWluLmNvbm5lY3QodGhpcy5fb3B0aW9ucy5jdHguZGVzdGluYXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLl9vcHRpb25zLnRyaWdnZXIpIHRoaXMuX3NldHVwVHJpZ2dlcigpO1xyXG5cclxuICAgIGlmICghdGhpcy5fb3B0aW9ucy5tYXJrZXJzKSB0aGlzLl9vcHRpb25zLm1hcmtlcnMgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZ2V0IHN0YXRlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9zdGF0ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCB0aGlzIGNsaXAgaGFzIGJlZW4gcGxheWVkLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IHRpbWVzUGxheWVkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90aW1lc1BsYXllZDsgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgY3VycmVudFRpbWUoKTogbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gQXVkaW9DbGlwU3RhdGUuUEFVU0VEKSByZXR1cm4gdGhpcy5fdGltZVBhdXNlZEF0O1xyXG5cclxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gQXVkaW9DbGlwU3RhdGUuUExBWUlORykgcmV0dXJuIHRoaXMuX29wdGlvbnMuY3R4LmN1cnJlbnRUaW1lIC0gdGhpcy5fdGltZVN0YXJ0ZWRBdDtcclxuXHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGR1cmF0aW9uIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IGR1cmF0aW9uKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kdXJhdGlvbjsgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSB2b2x1bWUgb2YgdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IHZvbHVtZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdm9sdW1lOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHZvbHVtZSBvZiB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZvbCBUaGUgbmV3IHZvbHVtZSBvZiB0aGUgY2xpcC5cclxuICAgKi9cclxuICBzZXQgdm9sdW1lKHZvbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl92b2x1bWUgPSB2b2w7XHJcblxyXG4gICAgdGhpcy5fZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHRoaXMuX3ZvbHVtZSAvIDEwMCwgdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgY3JlYXRlZCBub2Rlcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKi9cclxuICBnZXQgbm9kZXMoKTogYW55IHsgcmV0dXJuIHRoaXMuX25vZGVzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBjdXN0b20gbm9kZSBmcm9tIGBhcHAubm9kZXNbbm9kZU5hbWVdYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgVGhlIG5vZGUgdG8gYWRkIHRvIHRoaXMgY2xpcC5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHRyYWNrID0gYTJkLmFkZEF1ZGlvKCd0cmFjay0xJywgdHJhY2sxQnVmZmVyKTtcclxuICAgKiBcclxuICAgKiBjb25zdCBiZiA9IGEyZC5ub2Rlcy5iaXF1YWRGaWx0ZXIoKTtcclxuICAgKiB0cmFjay5hZGROb2RlKGJmKTtcclxuICAgKi9cclxuICBhZGROb2RlKG5vZGU6IE5vZGUpIHtcclxuICAgIHRoaXMuX25vZGVzW25vZGUubmFtZV0gPSBub2RlLmluc3RhbmNlO1xyXG5cclxuICAgIHRoaXMuX25vZGVzcmVmLnB1c2gobm9kZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX25vZGVzcmVmLmxlbmd0aCA9PT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGxhdGVzdE5vZGU6IE5vZGUgPSB0aGlzLl9ub2Rlc3JlZlt0aGlzLl9ub2Rlc3JlZi5sZW5ndGggLSAyXTtcclxuXHJcbiAgICBub2RlLmluc3RhbmNlLmNvbm5lY3QobGF0ZXN0Tm9kZS5pbnN0YW5jZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbGF5cyB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hcmtlciBUaGUgbmFtZSBvZiB0aGUgbWFya2VyIG9mIHRoZSBwYXJ0IG9mIHRoZSBjbGlwIHRvIHBsYXkuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCBzZnhNYXJrZXJzID0gW3sgbmFtZTogJ3dhbGsnLCBzdGFydDogMTUwMCwgZHVyYXRpb246IDEwMDAgfSwgeyBuYW1lOiAnZmFsbCc6IHN0YXJ0OiAyNTAwLCBkdXJhdGlvbjogMTUwMCB9XTtcclxuICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlciwgeyBtYXJrZXJzOiBzeGZNYXJrZXJzIH0pO1xyXG4gICAqIFxyXG4gICAqIC8vIHBsYXkganVzdCB0aGUgZmFsbGluZyBzb3VuZC5cclxuICAgKiBzZngucGxheSgnZmFsbCcpO1xyXG4gICAqL1xyXG4gIHBsYXkobWFya2VyPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBvZmZzZXQ6IG51bWJlciA9IHRoaXMuX3RpbWVQYXVzZWRBdDtcclxuXHJcbiAgICB0aGlzLl9zb3VyY2UgPSB0aGlzLl9vcHRpb25zLmN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuXHJcbiAgICB0aGlzLl9zb3VyY2UuYnVmZmVyID0gdGhpcy5fYXVkaW87XHJcbiAgICB0aGlzLl9zb3VyY2UubG9vcCA9IHRoaXMubG9vcDtcclxuXHJcbiAgICB0aGlzLl9jb25uZWN0Tm9kZXMoKTtcclxuXHJcbiAgICB0aGlzLl9vbmNvbXBsZXRlKCk7XHJcblxyXG4gICAgaWYgKG1hcmtlcikge1xyXG4gICAgICBjb25zdCBjbGlwTWFya2VyOiAoTWFya2VyIHwgdW5kZWZpbmVkKSA9IHRoaXMuX29wdGlvbnMubWFya2Vycz8uZmluZCgobTogTWFya2VyKSA9PiBtLm5hbWUgPT09IG1hcmtlcik7XHJcblxyXG4gICAgICBpZiAoIWNsaXBNYXJrZXIpIHJldHVybjtcclxuXHJcbiAgICAgIHRoaXMuX3NvdXJjZS5zdGFydCgwLCBjbGlwTWFya2VyLnN0YXJ0IC8gMTAwMCwgY2xpcE1hcmtlci5kdXJhdGlvbiA/IGNsaXBNYXJrZXIuZHVyYXRpb24gLyAxMDAwIDogdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgIHRoaXMuX3Jlc2V0QTJETWFya2VycyhjbGlwTWFya2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RpbWVTdGFydGVkQXQgPSB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIG9mZnNldDtcclxuXHJcbiAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSAwO1xyXG5cclxuICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuUExBWUlORztcclxuXHJcbiAgICB0aGlzLl90aW1lc1BsYXllZCsrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF1c2UgdGhlIGN1cnJlbnRseSBwbGF5aW5nIGF1ZGlvLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIpO1xyXG4gICAqIHNmeC5wbGF5KCk7XHJcbiAgICogXHJcbiAgICogc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICogICBzZngucGF1c2UoKTtcclxuICAgKiB9LCAxMDAwKTtcclxuICAgKi9cclxuICBwYXVzZSgpIHtcclxuICAgIGNvbnN0IGVsYXBzZWQ6IG51bWJlciA9IHRoaXMuX29wdGlvbnMuY3R4LmN1cnJlbnRUaW1lIC0gdGhpcy5fdGltZVN0YXJ0ZWRBdDtcclxuXHJcbiAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSBlbGFwc2VkXHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ2EyZC1wYXVzZScsIHN0YXJ0OiB0aGlzLl90aW1lUGF1c2VkQXQgKiAxMDAwIH0pO1xyXG5cclxuICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuUEFVU0VEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdW1lcyBwbGF5aW5nIHRoaXMgY2xpcCBmcm9tIHdoZW4gaXQgd2FzIHBhdXNlZC5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgKiBzZngucGxheSgpO1xyXG4gICAqIHNmeC5wYXVzZSgpO1xyXG4gICAqIFxyXG4gICAqIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAqICAgc2Z4LnJlc3VtZSgpO1xyXG4gICAqIH0sIDEwMDApO1xyXG4gICAqL1xyXG4gIHJlc3VtZSgpIHtcclxuICAgIHRoaXMucGxheSgnYTJkLXBhdXNlJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wcyB0aGUgcGxheWJhY2sgb2YgdGhpcyBhdWRpby5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXVkaW9DbGlwfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIHNmeC5wbGF5KCk7XHJcbiAgICogc2Z4LnN0b3AoKTtcclxuICAgKi9cclxuICBzdG9wKCkge1xyXG4gICAgdGhpcy5fc291cmNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX29wdGlvbnMuY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cclxuICAgIHRoaXMuX3RpbWVQYXVzZWRBdCA9IDA7XHJcbiAgICB0aGlzLl90aW1lU3RhcnRlZEF0ID0gMDtcclxuXHJcbiAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlNUT1BQRUQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWVrcyB0byBhIHNwZWNpZmljIHRpbWUgaW4gdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgdG8gc2VlayB0by5cclxuICAgKi9cclxuICBzZWVrKHRpbWU6IG51bWJlcikge1xyXG4gICAgaWYgKCF0aW1lKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRpbWUgPiB0aGlzLmR1cmF0aW9uICogMTAwMCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ1RoZSB0aW1lIHRvIHNlZWsgdG8gaXMgZ3JlYXRlciB0aGFuIHRoZSBkdXJhdGlvbiBvZiB0aGUgY2xpcC4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gQXVkaW9DbGlwU3RhdGUuUExBWUlORykge1xyXG4gICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9vcHRpb25zLm1hcmtlcnM/LnB1c2goeyBuYW1lOiAnYTJkLXNlZWsnLCBzdGFydDogdGltZSB9KTtcclxuXHJcbiAgICB0aGlzLnBsYXkoJ2EyZC1zZWVrJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNdXRlcyB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICogXHJcbiAgICogc2Z4LnBsYXkoKTtcclxuICAgKiBzZngubXV0ZSgpO1xyXG4gICAqL1xyXG4gIG11dGUoKSB7XHJcbiAgICB0aGlzLl9wcmV2aW91c1ZvbHVtZSA9IHRoaXMudm9sdW1lO1xyXG5cclxuICAgIHRoaXMudm9sdW1lID0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFB1dHMgdGhlIHZvbHVtZSBiYWNrIHRvIHRoZSB2YWx1ZSBpdCB3YXMgYXQgYmVmb3JlIHRoZSBjbGlwIHdhcyBtdXRlZC5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgKiBzZngucGxheSgpO1xyXG4gICAqIFxyXG4gICAqIHNmeC5tdXRlKCk7XHJcbiAgICogc2Z4LnVubXV0ZSgpO1xyXG4gICAqL1xyXG4gIHVubXV0ZSgpIHtcclxuICAgIHRoaXMudm9sdW1lID0gdGhpcy5fcHJldmlvdXNWb2x1bWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHVwIGFuIG9uY2xpY2sgZXZlbnQgb24gYSB0cmlnZ2VyIGVsZW1lbnQgaWYgb25lIHdhcyBwcm92aWRlZCBpbiB0aGUgb3B0aW9ucy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NldHVwVHJpZ2dlcigpIHtcclxuICAgIGNvbnN0IGVsOiAoSFRNTEVsZW1lbnQgfCBudWxsKSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fb3B0aW9ucy50cmlnZ2VyISk7XHJcblxyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG5cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbGF5KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29ubmVjdHMgdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRocm91Z2ggYGFkZE5vZGVgLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29ubmVjdE5vZGVzKCkge1xyXG4gICAgaWYgKHRoaXMuX25vZGVzcmVmLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZmlyc3ROb2RlOiBOb2RlID0gdGhpcy5fbm9kZXNyZWZbMF07XHJcbiAgICAgIGNvbnN0IGxhdGVzdE5vZGU6IE5vZGUgPSB0aGlzLl9ub2Rlc3JlZlt0aGlzLl9ub2Rlc3JlZi5sZW5ndGggLSAxXVxyXG5cclxuICAgICAgdGhpcy5fc291cmNlLmNvbm5lY3QobGF0ZXN0Tm9kZS5pbnN0YW5jZSk7XHJcblxyXG4gICAgICBmaXJzdE5vZGUuaW5zdGFuY2UuY29ubmVjdCh0aGlzLl9nYWluKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5jb25uZWN0KHRoaXMuX2dhaW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB3aGF0IGhhcHBlbnMgd2hlbiBhIGNsaXAgaXMgZmluaXNoZWQgcGxheWluZy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uY29tcGxldGUoKSB7XHJcbiAgICB0aGlzLl9zb3VyY2Uub25lbmRlZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5TVE9QUEVEO1xyXG5cclxuICAgICAgdGhpcy5fc291cmNlLm9uZW5kZWQgPSBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyBhbnkgbWFya2VycyBzZXQgaW50ZXJuYWxseS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7TWFya2VyfSBjbGlwTWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2sgaWYgc2hvdWxkIGJlIHJlbW92ZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVzZXRBMkRNYXJrZXJzKGNsaXBNYXJrZXI6IE1hcmtlcikge1xyXG4gICAgaWYgKGNsaXBNYXJrZXIubmFtZS5pbmNsdWRlcygnYTJkJykpIHRoaXMuX29wdGlvbnMubWFya2VycyA9IHRoaXMuX29wdGlvbnMubWFya2Vycz8uZmlsdGVyKChtYXJrZXI6IE1hcmtlcikgPT4gIW1hcmtlci5uYW1lLmluY2x1ZGVzKCdhMmQnKSk7XHJcbiAgfVxyXG59Il19