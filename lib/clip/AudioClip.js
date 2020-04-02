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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGlwL0F1ZGlvQ2xpcC50cyJdLCJuYW1lcyI6WyJBdWRpb0NsaXAiLCJuYW1lIiwiYXVkaW8iLCJvcHRpb25zIiwiQXVkaW9DbGlwU3RhdGUiLCJTVE9QUEVEIiwiX25hbWUiLCJfYXVkaW8iLCJfZHVyYXRpb24iLCJkdXJhdGlvbiIsIl9vcHRpb25zIiwiX2dhaW4iLCJjdHgiLCJjcmVhdGVHYWluIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwidHJpZ2dlciIsIl9zZXR1cFRyaWdnZXIiLCJtYXJrZXJzIiwibm9kZSIsIl9ub2RlcyIsImluc3RhbmNlIiwiX25vZGVzcmVmIiwicHVzaCIsImxlbmd0aCIsImxhdGVzdE5vZGUiLCJtYXJrZXIiLCJvZmZzZXQiLCJfdGltZVBhdXNlZEF0IiwiX3NvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImJ1ZmZlciIsImxvb3AiLCJfY29ubmVjdE5vZGVzIiwiX29uY29tcGxldGUiLCJjbGlwTWFya2VyIiwiZmluZCIsIm0iLCJzdGFydCIsInVuZGVmaW5lZCIsIl9yZXNldEEyRE1hcmtlcnMiLCJfdGltZVN0YXJ0ZWRBdCIsImN1cnJlbnRUaW1lIiwiX3N0YXRlIiwiUExBWUlORyIsIl90aW1lc1BsYXllZCIsImVsYXBzZWQiLCJzdG9wIiwiUEFVU0VEIiwicGxheSIsImRpc2Nvbm5lY3QiLCJ0aW1lIiwiY29uc29sZSIsIndhcm4iLCJfcHJldmlvdXNWb2x1bWUiLCJ2b2x1bWUiLCJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJmaXJzdE5vZGUiLCJvbmVuZGVkIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJfdm9sdW1lIiwidm9sIiwiZ2FpbiIsInNldFZhbHVlQXRUaW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7O0FBRUE7Ozs7SUFJcUJBLFM7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7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LEtBQWdCdkMsK0JBQWV3QyxPQUFuQyxFQUE0QyxPQUFPLEtBQUtsQyxRQUFMLENBQWNFLEdBQWQsQ0FBa0I4QixXQUFsQixHQUFnQyxLQUFLRCxjQUE1QztBQUU1QyxhQUFPLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozt3QkFLdUI7QUFBRSxhQUFPLEtBQUtqQyxTQUFaO0FBQXdCO0FBRWpEOzs7Ozs7Ozt3QkFLcUI7QUFBRSxhQUFPLEtBQUt3RCxPQUFaO0FBQXNCO0FBRTdDOzs7Ozs7c0JBS1dDLEcsRUFBYTtBQUN0QixXQUFLRCxPQUFMLEdBQWVDLEdBQWY7O0FBRUEsV0FBS3RELEtBQUwsQ0FBV3VELElBQVgsQ0FBZ0JDLGNBQWhCLENBQStCLEtBQUtILE9BQUwsR0FBZSxHQUE5QyxFQUFtRCxLQUFLdEQsUUFBTCxDQUFjRSxHQUFkLENBQWtCOEIsV0FBckU7QUFDRDtBQUVEOzs7Ozs7Ozt3QkFLaUI7QUFBRSxhQUFPLEtBQUt0QixNQUFaO0FBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgQXVkaW9DbGlwT3B0aW9ucyBmcm9tICcuLi9vcHRpb25zL0F1ZGlvQ2xpcE9wdGlvbnMnO1xyXG5cclxuaW1wb3J0IE5vZGUgZnJvbSAnLi4vaW50ZXJmYWNlcy9Ob2RlJztcclxuaW1wb3J0IE1hcmtlciBmcm9tICcuLi9pbnRlcmZhY2VzL01hcmtlcic7XHJcblxyXG5pbXBvcnQgeyBBdWRpb0NsaXBTdGF0ZSB9IGZyb20gJy4uL2VudW1zL0F1ZGlvQ2xpcFN0YXRlJ1xyXG5cclxuLyoqXHJcbiAqIEFuIGF1ZGlvIGNsaXAgcmVwcmVzZW50cyBhIHBpZWNlIG9mIGF1ZGlvLCB3aGljaCBpcyBlaXRoZXIgYW4gYXVkaW8gaHRtbCBlbGVtZW50IG9yIGFuIGF1ZGlvIGJvZmZlciwgYXNcclxuICogYSBwbGF5YWJsZSBjbGlwIHdpdGggZXh0cmEgcHJvcGVydGllcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvQ2xpcCB7XHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgKi9cclxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBhdWRpbyB0byBwbGF5LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2F1ZGlvOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhdWRpbyBidWZmZXIgc291cmNlIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBdWRpb0J1ZmZlclNvdXJjZU5vZGV9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc291cmNlITogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBdWRpb0NsaXBPcHRpb25zfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBnYWluIG5vZGUgZm9yIHRoaXMgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7R2Fpbk5vZGV9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2FpbjogR2Fpbk5vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHN0YXRlIG9mIHRoaXMgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXVkaW9DbGlwU3RhdGV9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc3RhdGU6IEF1ZGlvQ2xpcFN0YXRlID0gQXVkaW9DbGlwU3RhdGUuU1RPUFBFRDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiB0aW1lcyB0aGlzIGNsaXAgaGFzIGJlZW4gcGxheWVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVzUGxheWVkOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZSB0aGF0IHRoaXMgY2xpcCBzdGFydCBiZWluZyBwbGF5ZWQgYXQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lU3RhcnRlZEF0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBjbGlwIGlzIHBhdXNlZCwgdGhpcyB3aWxsIGtlZXAgdHJhY2sgb2Ygd2hlbiBpdCB3YXMgcGF1c2VkIHNvIGl0IGNhbiBiZSByZXN1bWVkIGF0IHRoYXQgdGltZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVQYXVzZWRBdDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2N1cnJlbnRUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZHVyYXRpb24gb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9kdXJhdGlvbjogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdm9sdW1lIG9mIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDEwMFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ZvbHVtZTogbnVtYmVyID0gMTAwO1xyXG5cclxuICAvKipcclxuICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgcHJldmlvdXMgdm9sdW1lIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcHJldmlvdXNWb2x1bWU6IG51bWJlciA9IDE7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCBmb3IgdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxOb2RlPn1cclxuICAgKi9cclxuICBwcml2YXRlIF9ub2Rlc3JlZjogQXJyYXk8Tm9kZT4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIGluIGEgd2F5IHRoYXQgYWxsb3dzIHRoZW0gdG8gYmUgcmV0cmlldmVkIGVhc2lseS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Kn1cclxuICAgKi9cclxuICBwcml2YXRlIF9ub2RlczogYW55ID0ge307XHJcblxyXG4gIHByaXZhdGUgX2VmZmVjdHM6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGF1ZGlvIGNsaXAgaXMgcGxheWVkIG9uIGEgbG9vcCBvciBub3QuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICovXHJcbiAgbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgKiBAcGFyYW0ge0F1ZGlvQnVmZmVyfSBhdWRpbyBUaGUgQXVkaW9CdWZmZXIgdGhhdCBjb250YWlucyB0aGUgYXVkaW8gb2YgdGhlIGNsaXAuXHJcbiAgICogQHBhcmFtIHtBdWRpb0NsaXBPcHRpb25zfSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgcGFzc2VkIHRvIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGF1ZGlvOiBBdWRpb0J1ZmZlciwgb3B0aW9uczogQXVkaW9DbGlwT3B0aW9ucykge1xyXG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcblxyXG4gICAgdGhpcy5fYXVkaW8gPSBhdWRpbztcclxuXHJcbiAgICB0aGlzLl9kdXJhdGlvbiA9IGF1ZGlvLmR1cmF0aW9uO1xyXG5cclxuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgIHRoaXMuX2dhaW4gPSB0aGlzLl9vcHRpb25zLmN0eC5jcmVhdGVHYWluKCk7XHJcblxyXG4gICAgdGhpcy5fZ2Fpbi5jb25uZWN0KHRoaXMuX29wdGlvbnMuY3R4LmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICBpZiAodGhpcy5fb3B0aW9ucy50cmlnZ2VyKSB0aGlzLl9zZXR1cFRyaWdnZXIoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX29wdGlvbnMubWFya2VycykgdGhpcy5fb3B0aW9ucy5tYXJrZXJzID0gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldCBzdGF0ZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fc3RhdGU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHRpbWVzIHRoYXQgdGhpcyBjbGlwIGhhcyBiZWVuIHBsYXllZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB0aW1lc1BsYXllZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdGltZXNQbGF5ZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IGN1cnJlbnRUaW1lKCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IEF1ZGlvQ2xpcFN0YXRlLlBBVVNFRCkgcmV0dXJuIHRoaXMuX3RpbWVQYXVzZWRBdDtcclxuXHJcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IEF1ZGlvQ2xpcFN0YXRlLlBMQVlJTkcpIHJldHVybiB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIHRoaXMuX3RpbWVTdGFydGVkQXQ7XHJcblxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBkdXJhdGlvbiBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBkdXJhdGlvbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZHVyYXRpb247IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgdm9sdW1lIG9mIHRoaXMgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB2b2x1bWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZvbHVtZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB2b2x1bWUgb2YgdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2b2wgVGhlIG5ldyB2b2x1bWUgb2YgdGhlIGNsaXAuXHJcbiAgICovXHJcbiAgc2V0IHZvbHVtZSh2b2w6IG51bWJlcikge1xyXG4gICAgdGhpcy5fdm9sdW1lID0gdm9sO1xyXG5cclxuICAgIHRoaXMuX2dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh0aGlzLl92b2x1bWUgLyAxMDAsIHRoaXMuX29wdGlvbnMuY3R4LmN1cnJlbnRUaW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGNyZWF0ZWQgbm9kZXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICovXHJcbiAgZ2V0IG5vZGVzKCk6IGFueSB7IHJldHVybiB0aGlzLl9ub2RlczsgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgY3VzdG9tIG5vZGUgZnJvbSBgYXBwLm5vZGVzW25vZGVOYW1lXWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIGFkZCB0byB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCB0cmFjayA9IGEyZC5hZGRBdWRpbygndHJhY2stMScsIHRyYWNrMUJ1ZmZlcik7XHJcbiAgICogXHJcbiAgICogY29uc3QgYmYgPSBhMmQubm9kZXMuYmlxdWFkRmlsdGVyKCk7XHJcbiAgICogdHJhY2suYWRkTm9kZShiZik7XHJcbiAgICovXHJcbiAgYWRkTm9kZShub2RlOiBOb2RlKSB7XHJcbiAgICB0aGlzLl9ub2Rlc1tub2RlLm5hbWVdID0gbm9kZS5pbnN0YW5jZTtcclxuXHJcbiAgICB0aGlzLl9ub2Rlc3JlZi5wdXNoKG5vZGUpO1xyXG5cclxuICAgIGlmICh0aGlzLl9ub2Rlc3JlZi5sZW5ndGggPT09IDEpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBsYXRlc3ROb2RlOiBOb2RlID0gdGhpcy5fbm9kZXNyZWZbdGhpcy5fbm9kZXNyZWYubGVuZ3RoIC0gMl07XHJcblxyXG4gICAgbm9kZS5pbnN0YW5jZS5jb25uZWN0KGxhdGVzdE5vZGUuaW5zdGFuY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGxheXMgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZXIgVGhlIG5hbWUgb2YgdGhlIG1hcmtlciBvZiB0aGUgcGFydCBvZiB0aGUgY2xpcCB0byBwbGF5LlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3Qgc2Z4TWFya2VycyA9IFt7IG5hbWU6ICd3YWxrJywgc3RhcnQ6IDE1MDAsIGR1cmF0aW9uOiAxMDAwIH0sIHsgbmFtZTogJ2ZhbGwnOiBzdGFydDogMjUwMCwgZHVyYXRpb246IDE1MDAgfV07XHJcbiAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIsIHsgbWFya2Vyczogc3hmTWFya2VycyB9KTtcclxuICAgKiBcclxuICAgKiAvLyBwbGF5IGp1c3QgdGhlIGZhbGxpbmcgc291bmQuXHJcbiAgICogc2Z4LnBsYXkoJ2ZhbGwnKTtcclxuICAgKi9cclxuICBwbGF5KG1hcmtlcj86IHN0cmluZykge1xyXG4gICAgY29uc3Qgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLl90aW1lUGF1c2VkQXQ7XHJcblxyXG4gICAgdGhpcy5fc291cmNlID0gdGhpcy5fb3B0aW9ucy5jdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcblxyXG4gICAgdGhpcy5fc291cmNlLmJ1ZmZlciA9IHRoaXMuX2F1ZGlvO1xyXG4gICAgdGhpcy5fc291cmNlLmxvb3AgPSB0aGlzLmxvb3A7XHJcblxyXG4gICAgdGhpcy5fY29ubmVjdE5vZGVzKCk7XHJcblxyXG4gICAgdGhpcy5fb25jb21wbGV0ZSgpO1xyXG5cclxuICAgIGlmIChtYXJrZXIpIHtcclxuICAgICAgY29uc3QgY2xpcE1hcmtlcjogKE1hcmtlciB8IHVuZGVmaW5lZCkgPSB0aGlzLl9vcHRpb25zLm1hcmtlcnM/LmZpbmQoKG06IE1hcmtlcikgPT4gbS5uYW1lID09PSBtYXJrZXIpO1xyXG5cclxuICAgICAgaWYgKCFjbGlwTWFya2VyKSByZXR1cm47XHJcblxyXG4gICAgICB0aGlzLl9zb3VyY2Uuc3RhcnQoMCwgY2xpcE1hcmtlci5zdGFydCAvIDEwMDAsIGNsaXBNYXJrZXIuZHVyYXRpb24gPyBjbGlwTWFya2VyLmR1cmF0aW9uIC8gMTAwMCA6IHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICB0aGlzLl9yZXNldEEyRE1hcmtlcnMoY2xpcE1hcmtlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zb3VyY2Uuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90aW1lU3RhcnRlZEF0ID0gdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUgLSBvZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fdGltZVBhdXNlZEF0ID0gMDtcclxuXHJcbiAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlBMQVlJTkc7XHJcblxyXG4gICAgdGhpcy5fdGltZXNQbGF5ZWQrKztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhdXNlIHRoZSBjdXJyZW50bHkgcGxheWluZyBhdWRpby5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgKiBzZngucGxheSgpO1xyXG4gICAqIFxyXG4gICAqIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAqICAgc2Z4LnBhdXNlKCk7XHJcbiAgICogfSwgMTAwMCk7XHJcbiAgICovXHJcbiAgcGF1c2UoKSB7XHJcbiAgICBjb25zdCBlbGFwc2VkOiBudW1iZXIgPSB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIHRoaXMuX3RpbWVTdGFydGVkQXQ7XHJcblxyXG4gICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgdGhpcy5fdGltZVBhdXNlZEF0ID0gZWxhcHNlZFxyXG5cclxuICAgIHRoaXMuX29wdGlvbnMubWFya2Vycz8ucHVzaCh7IG5hbWU6ICdhMmQtcGF1c2UnLCBzdGFydDogdGhpcy5fdGltZVBhdXNlZEF0ICogMTAwMCB9KTtcclxuXHJcbiAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlBBVVNFRDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3VtZXMgcGxheWluZyB0aGlzIGNsaXAgZnJvbSB3aGVuIGl0IHdhcyBwYXVzZWQuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICogc2Z4LnBsYXkoKTtcclxuICAgKiBzZngucGF1c2UoKTtcclxuICAgKiBcclxuICAgKiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgKiAgIHNmeC5yZXN1bWUoKTtcclxuICAgKiB9LCAxMDAwKTtcclxuICAgKi9cclxuICByZXN1bWUoKSB7XHJcbiAgICB0aGlzLnBsYXkoJ2EyZC1wYXVzZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgdGhlIHBsYXliYWNrIG9mIHRoaXMgYXVkaW8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0F1ZGlvQ2xpcH0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgKiBcclxuICAgKiBzZngucGxheSgpO1xyXG4gICAqIHNmeC5zdG9wKCk7XHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuX3NvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICB0aGlzLl9zb3VyY2UgPSB0aGlzLl9vcHRpb25zLmN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuXHJcbiAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSAwO1xyXG4gICAgdGhpcy5fdGltZVN0YXJ0ZWRBdCA9IDA7XHJcblxyXG4gICAgdGhpcy5fc3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5TVE9QUEVEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2Vla3MgdG8gYSBzcGVjaWZpYyB0aW1lIGluIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFRoZSB0aW1lLCBpbiBtaWxsaXNlY29uZHMsIHRvIHNlZWsgdG8uXHJcbiAgICovXHJcbiAgc2Vlayh0aW1lOiBudW1iZXIpIHtcclxuICAgIGlmICghdGltZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aW1lID4gdGhpcy5kdXJhdGlvbiAqIDEwMDApIHtcclxuICAgICAgY29uc29sZS53YXJuKCdUaGUgdGltZSB0byBzZWVrIHRvIGlzIGdyZWF0ZXIgdGhhbiB0aGUgZHVyYXRpb24gb2YgdGhlIGNsaXAuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IEF1ZGlvQ2xpcFN0YXRlLlBMQVlJTkcpIHtcclxuICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ2EyZC1zZWVrJywgc3RhcnQ6IHRpbWUgfSk7XHJcblxyXG4gICAgdGhpcy5wbGF5KCdhMmQtc2VlaycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTXV0ZXMgdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIHNmeC5wbGF5KCk7XHJcbiAgICogc2Z4Lm11dGUoKTtcclxuICAgKi9cclxuICBtdXRlKCkge1xyXG4gICAgdGhpcy5fcHJldmlvdXNWb2x1bWUgPSB0aGlzLnZvbHVtZTtcclxuXHJcbiAgICB0aGlzLnZvbHVtZSA9IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQdXRzIHRoZSB2b2x1bWUgYmFjayB0byB0aGUgdmFsdWUgaXQgd2FzIGF0IGJlZm9yZSB0aGUgY2xpcCB3YXMgbXV0ZWQuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICogc2Z4LnBsYXkoKTtcclxuICAgKiBcclxuICAgKiBzZngubXV0ZSgpO1xyXG4gICAqIHNmeC51bm11dGUoKTtcclxuICAgKi9cclxuICB1bm11dGUoKSB7XHJcbiAgICB0aGlzLnZvbHVtZSA9IHRoaXMuX3ByZXZpb3VzVm9sdW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB1cCBhbiBvbmNsaWNrIGV2ZW50IG9uIGEgdHJpZ2dlciBlbGVtZW50IGlmIG9uZSB3YXMgcHJvdmlkZWQgaW4gdGhlIG9wdGlvbnMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9zZXR1cFRyaWdnZXIoKSB7XHJcbiAgICBjb25zdCBlbDogKEhUTUxFbGVtZW50IHwgbnVsbCkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX29wdGlvbnMudHJpZ2dlciEpO1xyXG5cclxuICAgIGlmICghZWwpIHJldHVybjtcclxuXHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMucGxheSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbm5lY3RzIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCB0aHJvdWdoIGBhZGROb2RlYC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Nvbm5lY3ROb2RlcygpIHtcclxuICAgIGlmICh0aGlzLl9ub2Rlc3JlZi5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0Tm9kZTogTm9kZSA9IHRoaXMuX25vZGVzcmVmWzBdO1xyXG4gICAgICBjb25zdCBsYXRlc3ROb2RlOiBOb2RlID0gdGhpcy5fbm9kZXNyZWZbdGhpcy5fbm9kZXNyZWYubGVuZ3RoIC0gMV1cclxuXHJcbiAgICAgIHRoaXMuX3NvdXJjZS5jb25uZWN0KGxhdGVzdE5vZGUuaW5zdGFuY2UpO1xyXG5cclxuICAgICAgZmlyc3ROb2RlLmluc3RhbmNlLmNvbm5lY3QodGhpcy5fZ2Fpbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zb3VyY2UuY29ubmVjdCh0aGlzLl9nYWluKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgd2hhdCBoYXBwZW5zIHdoZW4gYSBjbGlwIGlzIGZpbmlzaGVkIHBsYXlpbmcuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmNvbXBsZXRlKCkge1xyXG4gICAgdGhpcy5fc291cmNlLm9uZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuU1RPUFBFRDtcclxuXHJcbiAgICAgIHRoaXMuX3NvdXJjZS5vbmVuZGVkID0gbnVsbDtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgYW55IG1hcmtlcnMgc2V0IGludGVybmFsbHkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge01hcmtlcn0gY2xpcE1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrIGlmIHNob3VsZCBiZSByZW1vdmVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Jlc2V0QTJETWFya2VycyhjbGlwTWFya2VyOiBNYXJrZXIpIHtcclxuICAgIGlmIChjbGlwTWFya2VyLm5hbWUuaW5jbHVkZXMoJ2EyZCcpKSB0aGlzLl9vcHRpb25zLm1hcmtlcnMgPSB0aGlzLl9vcHRpb25zLm1hcmtlcnM/LmZpbHRlcigobWFya2VyOiBNYXJrZXIpID0+ICFtYXJrZXIubmFtZS5pbmNsdWRlcygnYTJkJykpO1xyXG4gIH1cclxufSJdfQ==