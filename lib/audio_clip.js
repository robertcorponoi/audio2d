'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioClip = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _AudioClipState = require("./enums/AudioClipState");

/**
 * An audio clip represents a piece of audio, which is either an audio html element or an audio boffer, as
 * a playable clip with extra properties.
 */
var AudioClip = /*#__PURE__*/function () {
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

      if (this._state === _AudioClipState.AudioClipState.PLAYING) this.stop();
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
      if (clipMarker.name.includes('a2d')) {
        var _this$_options$marker4;

        this._options.markers = (_this$_options$marker4 = this._options.markers) === null || _this$_options$marker4 === void 0 ? void 0 : _this$_options$marker4.filter(function (marker) {
          !marker.name.includes('a2d');
        });
      }
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

exports.AudioClip = AudioClip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdWRpb19jbGlwLnRzIl0sIm5hbWVzIjpbIkF1ZGlvQ2xpcCIsIm5hbWUiLCJhdWRpbyIsIm9wdGlvbnMiLCJBdWRpb0NsaXBTdGF0ZSIsIlNUT1BQRUQiLCJfbmFtZSIsIl9hdWRpbyIsIl9kdXJhdGlvbiIsImR1cmF0aW9uIiwiX29wdGlvbnMiLCJfZ2FpbiIsImN0eCIsImNyZWF0ZUdhaW4iLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJ0cmlnZ2VyIiwiX3NldHVwVHJpZ2dlciIsIm1hcmtlcnMiLCJub2RlIiwiX25vZGVzIiwiaW5zdGFuY2UiLCJfbm9kZXNyZWYiLCJwdXNoIiwibGVuZ3RoIiwibGF0ZXN0Tm9kZSIsIm1hcmtlciIsIm9mZnNldCIsIl90aW1lUGF1c2VkQXQiLCJfc291cmNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwiYnVmZmVyIiwibG9vcCIsIl9jb25uZWN0Tm9kZXMiLCJfb25jb21wbGV0ZSIsImNsaXBNYXJrZXIiLCJmaW5kIiwibSIsInN0YXJ0IiwidW5kZWZpbmVkIiwiX3Jlc2V0QTJETWFya2VycyIsIl90aW1lU3RhcnRlZEF0IiwiY3VycmVudFRpbWUiLCJfc3RhdGUiLCJQTEFZSU5HIiwiX3RpbWVzUGxheWVkIiwiZWxhcHNlZCIsInN0b3AiLCJQQVVTRUQiLCJwbGF5IiwiZGlzY29ubmVjdCIsInRpbWUiLCJjb25zb2xlIiwid2FybiIsIl9wcmV2aW91c1ZvbHVtZSIsInZvbHVtZSIsImVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZpcnN0Tm9kZSIsIm9uZW5kZWQiLCJpbmNsdWRlcyIsImZpbHRlciIsIl92b2x1bWUiLCJ2b2wiLCJnYWluIiwic2V0VmFsdWVBdFRpbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFPQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtJQUNhQSxTO0FBQ1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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ZCxDQUFrQjhCLFdBQWxCLEdBQWdDLEtBQUtELGNBQTVDO0FBRTVDLGFBQU8sQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozt3QkFDMkI7QUFBRSxhQUFPLEtBQUtqQyxTQUFaO0FBQXdCO0FBRWpEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7d0JBQ3lCO0FBQUUsYUFBTyxLQUFLd0QsT0FBWjtBQUFzQjtBQUU3QztBQUNKO0FBQ0E7QUFDQTtBQUNBOztzQkFDZUMsRyxFQUFhO0FBQ3BCLFdBQUtELE9BQUwsR0FBZUMsR0FBZjs7QUFDQSxXQUFLdEQsS0FBTCxDQUFXdUQsSUFBWCxDQUFnQkMsY0FBaEIsQ0FBK0IsS0FBS0gsT0FBTCxHQUFlLEdBQTlDLEVBQW1ELEtBQUt0RCxRQUFMLENBQWNFLEdBQWQsQ0FBa0I4QixXQUFyRTtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozt3QkFDcUI7QUFBRSxhQUFPLEtBQUt0QixNQUFaO0FBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgeyBBdWRpb0NsaXBPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0F1ZGlvQ2xpcE9wdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9Ob2RlJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi9pbnRlcmZhY2VzL01hcmtlcic7XHJcblxyXG5pbXBvcnQgeyBBdWRpb0NsaXBTdGF0ZSB9IGZyb20gJy4vZW51bXMvQXVkaW9DbGlwU3RhdGUnXHJcblxyXG4vKipcclxuICogQW4gYXVkaW8gY2xpcCByZXByZXNlbnRzIGEgcGllY2Ugb2YgYXVkaW8sIHdoaWNoIGlzIGVpdGhlciBhbiBhdWRpbyBodG1sIGVsZW1lbnQgb3IgYW4gYXVkaW8gYm9mZmVyLCBhc1xyXG4gKiBhIHBsYXlhYmxlIGNsaXAgd2l0aCBleHRyYSBwcm9wZXJ0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1ZGlvQ2xpcCB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGF1ZGlvIHRvIHBsYXkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYXVkaW86IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdWRpbyBidWZmZXIgc291cmNlIG9mIHRoZSBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0F1ZGlvQnVmZmVyU291cmNlTm9kZX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc291cmNlITogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtBdWRpb0NsaXBPcHRpb25zfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGdhaW4gbm9kZSBmb3IgdGhpcyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0dhaW5Ob2RlfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nYWluOiBHYWluTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIG9mIHRoaXMgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtBdWRpb0NsaXBTdGF0ZX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IEF1ZGlvQ2xpcFN0YXRlID0gQXVkaW9DbGlwU3RhdGUuU1RPUFBFRDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBjbGlwIGhhcyBiZWVuIHBsYXllZC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90aW1lc1BsYXllZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0aW1lIHRoYXQgdGhpcyBjbGlwIHN0YXJ0IGJlaW5nIHBsYXllZCBhdC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3RpbWVTdGFydGVkQXQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRoZSBjbGlwIGlzIHBhdXNlZCwgdGhpcyB3aWxsIGtlZXAgdHJhY2sgb2Ygd2hlbiBpdCB3YXMgcGF1c2VkIHNvIGl0IGNhbiBiZSByZXN1bWVkIGF0IHRoYXQgdGltZS5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3RpbWVQYXVzZWRBdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jdXJyZW50VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkdXJhdGlvbiBvZiB0aGUgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2R1cmF0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdm9sdW1lIG9mIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKiBcclxuICAgICAqIEBkZWZhdWx0IDEwMFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF92b2x1bWU6IG51bWJlciA9IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBwcmV2aW91cyB2b2x1bWUgb2YgdGhlIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZvbHVtZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCBmb3IgdGhpcyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0FycmF5PE5vZGU+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ub2Rlc3JlZjogQXJyYXk8Tm9kZT4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCBpbiBhIHdheSB0aGF0IGFsbG93cyB0aGVtIHRvIGJlIHJldHJpZXZlZCBlYXNpbHkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Kn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbm9kZXM6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBhdWRpbyBjbGlwIGlzIHBsYXllZCBvbiBhIGxvb3Agb3Igbm90LlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICAgKiBcclxuICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgKi9cclxuICAgIGxvb3A6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAgICogQHBhcmFtIHtBdWRpb0J1ZmZlcn0gYXVkaW8gVGhlIEF1ZGlvQnVmZmVyIHRoYXQgY29udGFpbnMgdGhlIGF1ZGlvIG9mIHRoZSBjbGlwLlxyXG4gICAgICogQHBhcmFtIHtBdWRpb0NsaXBPcHRpb25zfSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgcGFzc2VkIHRvIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBhdWRpbzogQXVkaW9CdWZmZXIsIG9wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9hdWRpbyA9IGF1ZGlvO1xyXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gYXVkaW8uZHVyYXRpb247XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMuX2dhaW4gPSB0aGlzLl9vcHRpb25zLmN0eC5jcmVhdGVHYWluKCk7XHJcbiAgICAgICAgdGhpcy5fZ2Fpbi5jb25uZWN0KHRoaXMuX29wdGlvbnMuY3R4LmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJpZ2dlcikgdGhpcy5fc2V0dXBUcmlnZ2VyKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLm1hcmtlcnMpIHRoaXMuX29wdGlvbnMubWFya2VycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBzdGF0ZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fc3RhdGU7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiB0aW1lcyB0aGF0IHRoaXMgY2xpcCBoYXMgYmVlbiBwbGF5ZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCB0aW1lc1BsYXllZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdGltZXNQbGF5ZWQ7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGN1cnJlbnRUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBBdWRpb0NsaXBTdGF0ZS5QQVVTRUQpIHJldHVybiB0aGlzLl90aW1lUGF1c2VkQXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBBdWRpb0NsaXBTdGF0ZS5QTEFZSU5HKSByZXR1cm4gdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUgLSB0aGlzLl90aW1lU3RhcnRlZEF0O1xyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGR1cmF0aW9uIG9mIHRoZSBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgZHVyYXRpb24oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2R1cmF0aW9uOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB2b2x1bWUgb2YgdGhpcyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgdm9sdW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92b2x1bWU7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZvbHVtZSBvZiB0aGlzIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2b2wgVGhlIG5ldyB2b2x1bWUgb2YgdGhlIGNsaXAuXHJcbiAgICAgKi9cclxuICAgIHNldCB2b2x1bWUodm9sOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl92b2x1bWUgPSB2b2w7XHJcbiAgICAgICAgdGhpcy5fZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHRoaXMuX3ZvbHVtZSAvIDEwMCwgdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3JlYXRlZCBub2Rlcy5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIGdldCBub2RlcygpOiBhbnkgeyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBjdXN0b20gbm9kZSBmcm9tIGBhcHAubm9kZXNbbm9kZU5hbWVdYC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIGFkZCB0byB0aGlzIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGNvbnN0IHRyYWNrID0gYTJkLmFkZEF1ZGlvKCd0cmFjay0xJywgdHJhY2sxQnVmZmVyKTtcclxuICAgICAqIFxyXG4gICAgICogY29uc3QgYmYgPSBhMmQubm9kZXMuYmlxdWFkRmlsdGVyKCk7XHJcbiAgICAgKiB0cmFjay5hZGROb2RlKGJmKTtcclxuICAgICAqL1xyXG4gICAgYWRkTm9kZShub2RlOiBOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZXNbbm9kZS5uYW1lXSA9IG5vZGUuaW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5fbm9kZXNyZWYucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzcmVmLmxlbmd0aCA9PT0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBsYXRlc3ROb2RlOiBOb2RlID0gdGhpcy5fbm9kZXNyZWZbdGhpcy5fbm9kZXNyZWYubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgbm9kZS5pbnN0YW5jZS5jb25uZWN0KGxhdGVzdE5vZGUuaW5zdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheXMgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWFya2VyIFRoZSBuYW1lIG9mIHRoZSBtYXJrZXIgb2YgdGhlIHBhcnQgb2YgdGhlIGNsaXAgdG8gcGxheS5cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIFxyXG4gICAgICogY29uc3Qgc2Z4TWFya2VycyA9IFt7IG5hbWU6ICd3YWxrJywgc3RhcnQ6IDE1MDAsIGR1cmF0aW9uOiAxMDAwIH0sIHsgbmFtZTogJ2ZhbGwnOiBzdGFydDogMjUwMCwgZHVyYXRpb246IDE1MDAgfV07XHJcbiAgICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlciwgeyBtYXJrZXJzOiBzeGZNYXJrZXJzIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBwbGF5IGp1c3QgdGhlIGZhbGxpbmcgc291bmQuXHJcbiAgICAgKiBzZngucGxheSgnZmFsbCcpO1xyXG4gICAgICovXHJcbiAgICBwbGF5KG1hcmtlcj86IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IG9mZnNldDogbnVtYmVyID0gdGhpcy5fdGltZVBhdXNlZEF0O1xyXG5cclxuICAgICAgICB0aGlzLl9zb3VyY2UgPSB0aGlzLl9vcHRpb25zLmN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLl9zb3VyY2UuYnVmZmVyID0gdGhpcy5fYXVkaW87XHJcbiAgICAgICAgdGhpcy5fc291cmNlLmxvb3AgPSB0aGlzLmxvb3A7XHJcblxyXG4gICAgICAgIHRoaXMuX2Nvbm5lY3ROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuX29uY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgaWYgKG1hcmtlcikge1xyXG4gICAgICAgICAgICBjb25zdCBjbGlwTWFya2VyOiAoTWFya2VyIHwgdW5kZWZpbmVkKSA9IHRoaXMuX29wdGlvbnMubWFya2Vycz8uZmluZCgobTogTWFya2VyKSA9PiBtLm5hbWUgPT09IG1hcmtlcik7XHJcbiAgICAgICAgICAgIGlmICghY2xpcE1hcmtlcikgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLnN0YXJ0KDAsIGNsaXBNYXJrZXIuc3RhcnQgLyAxMDAwLCBjbGlwTWFya2VyLmR1cmF0aW9uID8gY2xpcE1hcmtlci5kdXJhdGlvbiAvIDEwMDAgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNldEEyRE1hcmtlcnMoY2xpcE1hcmtlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl90aW1lU3RhcnRlZEF0ID0gdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUgLSBvZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5fdGltZVBhdXNlZEF0ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5QTEFZSU5HO1xyXG4gICAgICAgIHRoaXMuX3RpbWVzUGxheWVkKys7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXVzZSB0aGUgY3VycmVudGx5IHBsYXlpbmcgYXVkaW8uXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgICAqIHNmeC5wbGF5KCk7XHJcbiAgICAgKiBcclxuICAgICAqIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICogICBzZngucGF1c2UoKTtcclxuICAgICAqIH0sIDEwMDApO1xyXG4gICAgICovXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICBjb25zdCBlbGFwc2VkOiBudW1iZXIgPSB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIHRoaXMuX3RpbWVTdGFydGVkQXQ7XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSBlbGFwc2VkXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ2EyZC1wYXVzZScsIHN0YXJ0OiB0aGlzLl90aW1lUGF1c2VkQXQgKiAxMDAwIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlBBVVNFRDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc3VtZXMgcGxheWluZyB0aGlzIGNsaXAgZnJvbSB3aGVuIGl0IHdhcyBwYXVzZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgICAqIHNmeC5wbGF5KCk7XHJcbiAgICAgKiBzZngucGF1c2UoKTtcclxuICAgICAqIFxyXG4gICAgICogc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgKiAgIHNmeC5yZXN1bWUoKTtcclxuICAgICAqIH0sIDEwMDApO1xyXG4gICAgICovXHJcbiAgICByZXN1bWUoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5KCdhMmQtcGF1c2UnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIHRoZSBwbGF5YmFjayBvZiB0aGlzIGF1ZGlvLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7QXVkaW9DbGlwfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICAgKiBcclxuICAgICAqIHNmeC5wbGF5KCk7XHJcbiAgICAgKiBzZnguc3RvcCgpO1xyXG4gICAgICovXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlID0gdGhpcy5fb3B0aW9ucy5jdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVQYXVzZWRBdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZVN0YXJ0ZWRBdCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuU1RPUFBFRDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlZWtzIHRvIGEgc3BlY2lmaWMgdGltZSBpbiB0aGUgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgdG8gc2VlayB0by5cclxuICAgICAqL1xyXG4gICAgc2Vlayh0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRpbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRpbWUgPiB0aGlzLmR1cmF0aW9uICogMTAwMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSB0aW1lIHRvIHNlZWsgdG8gaXMgZ3JlYXRlciB0aGFuIHRoZSBkdXJhdGlvbiBvZiB0aGUgY2xpcC4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBBdWRpb0NsaXBTdGF0ZS5QTEFZSU5HKSB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ2EyZC1zZWVrJywgc3RhcnQ6IHRpbWUgfSk7XHJcbiAgICAgICAgdGhpcy5wbGF5KCdhMmQtc2VlaycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXV0ZXMgdGhpcyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICAgKiBcclxuICAgICAqIHNmeC5wbGF5KCk7XHJcbiAgICAgKiBzZngubXV0ZSgpO1xyXG4gICAgICovXHJcbiAgICBtdXRlKCkge1xyXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzVm9sdW1lID0gdGhpcy52b2x1bWU7XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHV0cyB0aGUgdm9sdW1lIGJhY2sgdG8gdGhlIHZhbHVlIGl0IHdhcyBhdCBiZWZvcmUgdGhlIGNsaXAgd2FzIG11dGVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICAgKiBzZngucGxheSgpO1xyXG4gICAgICogXHJcbiAgICAgKiBzZngubXV0ZSgpO1xyXG4gICAgICogc2Z4LnVubXV0ZSgpO1xyXG4gICAgICovXHJcbiAgICB1bm11dGUoKSB7XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSB0aGlzLl9wcmV2aW91c1ZvbHVtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgYW4gb25jbGljayBldmVudCBvbiBhIHRyaWdnZXIgZWxlbWVudCBpZiBvbmUgd2FzIHByb3ZpZGVkIGluIHRoZSBvcHRpb25zLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXR1cFRyaWdnZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZWw6IChIVE1MRWxlbWVudCB8IG51bGwpID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9vcHRpb25zLnRyaWdnZXIhKTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbGF5KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRocm91Z2ggYGFkZE5vZGVgLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb25uZWN0Tm9kZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzcmVmLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROb2RlOiBOb2RlID0gdGhpcy5fbm9kZXNyZWZbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhdGVzdE5vZGU6IE5vZGUgPSB0aGlzLl9ub2Rlc3JlZlt0aGlzLl9ub2Rlc3JlZi5sZW5ndGggLSAxXVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLmNvbm5lY3QobGF0ZXN0Tm9kZS5pbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5vZGUuaW5zdGFuY2UuY29ubmVjdCh0aGlzLl9nYWluKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UuY29ubmVjdCh0aGlzLl9nYWluKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHdoYXQgaGFwcGVucyB3aGVuIGEgY2xpcCBpcyBmaW5pc2hlZCBwbGF5aW5nLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9vbmNvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5vbmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlNUT1BQRUQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5vbmVuZGVkID0gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIGFueSBtYXJrZXJzIHNldCBpbnRlcm5hbGx5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge01hcmtlcn0gY2xpcE1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrIGlmIHNob3VsZCBiZSByZW1vdmVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZXNldEEyRE1hcmtlcnMoY2xpcE1hcmtlcjogTWFya2VyKSB7XHJcbiAgICAgICAgaWYgKGNsaXBNYXJrZXIubmFtZS5pbmNsdWRlcygnYTJkJykpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzID0gdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5maWx0ZXIoKG1hcmtlcjogTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAhbWFya2VyLm5hbWUuaW5jbHVkZXMoJ2EyZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=