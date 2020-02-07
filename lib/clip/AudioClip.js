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

        this._resetPause(clipMarker);
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
     * Resets any markers set by `pause`.
     * 
     * @private
     * 
     * @param {Marker} clipMarker The marker to check if should be removed.
     */

  }, {
    key: "_resetPause",
    value: function _resetPause(clipMarker) {
      var _this$_options$marker3;

      if (clipMarker.name === 'a2d-pause') this._options.markers = (_this$_options$marker3 = this._options.markers) === null || _this$_options$marker3 === void 0 ? void 0 : _this$_options$marker3.filter(function (marker) {
        return marker.name !== 'a2d-pause';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGlwL0F1ZGlvQ2xpcC50cyJdLCJuYW1lcyI6WyJBdWRpb0NsaXAiLCJuYW1lIiwiYXVkaW8iLCJvcHRpb25zIiwiQXVkaW9DbGlwU3RhdGUiLCJTVE9QUEVEIiwiX25hbWUiLCJfYXVkaW8iLCJfZHVyYXRpb24iLCJkdXJhdGlvbiIsIl9vcHRpb25zIiwiX2dhaW4iLCJjdHgiLCJjcmVhdGVHYWluIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwidHJpZ2dlciIsIl9zZXR1cFRyaWdnZXIiLCJtYXJrZXJzIiwibm9kZSIsIl9ub2RlcyIsImluc3RhbmNlIiwiX25vZGVzcmVmIiwicHVzaCIsImxlbmd0aCIsImxhdGVzdE5vZGUiLCJtYXJrZXIiLCJvZmZzZXQiLCJfdGltZVBhdXNlZEF0IiwiX3NvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImJ1ZmZlciIsImxvb3AiLCJfY29ubmVjdE5vZGVzIiwiX29uY29tcGxldGUiLCJjbGlwTWFya2VyIiwiZmluZCIsIm0iLCJzdGFydCIsInVuZGVmaW5lZCIsIl9yZXNldFBhdXNlIiwiX3RpbWVTdGFydGVkQXQiLCJjdXJyZW50VGltZSIsIl9zdGF0ZSIsIlBMQVlJTkciLCJfdGltZXNQbGF5ZWQiLCJlbGFwc2VkIiwic3RvcCIsIlBBVVNFRCIsInBsYXkiLCJkaXNjb25uZWN0IiwiX3ByZXZpb3VzVm9sdW1lIiwidm9sdW1lIiwiZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZmlyc3ROb2RlIiwib25lbmRlZCIsImZpbHRlciIsIl92b2x1bWUiLCJ2b2wiLCJnYWluIiwic2V0VmFsdWVBdFRpbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFPQTs7QUFFQTs7OztJQUlxQkEsUzs7O0FBQ25COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7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aW1wb3J0IEF1ZGlvQ2xpcE9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucy9BdWRpb0NsaXBPcHRpb25zJztcclxuXHJcbmltcG9ydCBOb2RlIGZyb20gJy4uL2ludGVyZmFjZXMvTm9kZSc7XHJcbmltcG9ydCBNYXJrZXIgZnJvbSAnLi4vaW50ZXJmYWNlcy9NYXJrZXInO1xyXG5cclxuaW1wb3J0IHsgQXVkaW9DbGlwU3RhdGUgfSBmcm9tICcuLi9lbnVtcy9BdWRpb0NsaXBTdGF0ZSdcclxuXHJcbi8qKlxyXG4gKiBBbiBhdWRpbyBjbGlwIHJlcHJlc2VudHMgYSBwaWVjZSBvZiBhdWRpbywgd2hpY2ggaXMgZWl0aGVyIGFuIGF1ZGlvIGh0bWwgZWxlbWVudCBvciBhbiBhdWRpbyBib2ZmZXIsIGFzXHJcbiAqIGEgcGxheWFibGUgY2xpcCB3aXRoIGV4dHJhIHByb3BlcnRpZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb0NsaXAge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gdG8gcGxheS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSBcclxuICAgKi9cclxuICBwcml2YXRlIF9hdWRpbzogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXVkaW8gYnVmZmVyIHNvdXJjZSBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXVkaW9CdWZmZXJTb3VyY2VOb2RlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NvdXJjZSE6IEF1ZGlvQnVmZmVyU291cmNlTm9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXVkaW9DbGlwT3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZ2FpbiBub2RlIGZvciB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0dhaW5Ob2RlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dhaW46IEdhaW5Ob2RlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0F1ZGlvQ2xpcFN0YXRlfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0YXRlOiBBdWRpb0NsaXBTdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlNUT1BQRUQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBjbGlwIGhhcyBiZWVuIHBsYXllZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSBcclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lc1BsYXllZDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWUgdGhhdCB0aGlzIGNsaXAgc3RhcnQgYmVpbmcgcGxheWVkIGF0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZVN0YXJ0ZWRBdDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgY2xpcCBpcyBwYXVzZWQsIHRoaXMgd2lsbCBrZWVwIHRyYWNrIG9mIHdoZW4gaXQgd2FzIHBhdXNlZCBzbyBpdCBjYW4gYmUgcmVzdW1lZCBhdCB0aGF0IHRpbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lUGF1c2VkQXQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9jdXJyZW50VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGR1cmF0aW9uIG9mIHRoZSBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHVyYXRpb246IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHZvbHVtZSBvZiB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAxMDBcclxuICAgKi9cclxuICBwcml2YXRlIF92b2x1bWU6IG51bWJlciA9IDEwMDtcclxuXHJcbiAgLyoqXHJcbiAgICogS2VlcHMgdHJhY2sgb2YgdGhlIHByZXZpb3VzIHZvbHVtZSBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ByZXZpb3VzVm9sdW1lOiBudW1iZXIgPSAxO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgbm9kZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgZm9yIHRoaXMgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8Tm9kZT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbm9kZXNyZWY6IEFycmF5PE5vZGU+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCBpbiBhIHdheSB0aGF0IGFsbG93cyB0aGVtIHRvIGJlIHJldHJpZXZlZCBlYXNpbHkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkgeyp9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbm9kZXM6IGFueSA9IHt9O1xyXG5cclxuICBwcml2YXRlIF9lZmZlY3RzOiBhbnkgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBhdWRpbyBjbGlwIGlzIHBsYXllZCBvbiBhIGxvb3Agb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAqL1xyXG4gIGxvb3A6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICogQHBhcmFtIHtBdWRpb0J1ZmZlcn0gYXVkaW8gVGhlIEF1ZGlvQnVmZmVyIHRoYXQgY29udGFpbnMgdGhlIGF1ZGlvIG9mIHRoZSBjbGlwLlxyXG4gICAqIEBwYXJhbSB7QXVkaW9DbGlwT3B0aW9uc30gW29wdGlvbnNdIFRoZSBvcHRpb25zIHBhc3NlZCB0byB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBhdWRpbzogQXVkaW9CdWZmZXIsIG9wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnMpIHtcclxuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuX2F1ZGlvID0gYXVkaW87XHJcblxyXG4gICAgdGhpcy5fZHVyYXRpb24gPSBhdWRpby5kdXJhdGlvbjtcclxuXHJcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICB0aGlzLl9nYWluID0gdGhpcy5fb3B0aW9ucy5jdHguY3JlYXRlR2FpbigpO1xyXG5cclxuICAgIHRoaXMuX2dhaW4uY29ubmVjdCh0aGlzLl9vcHRpb25zLmN0eC5kZXN0aW5hdGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuX29wdGlvbnMudHJpZ2dlcikgdGhpcy5fc2V0dXBUcmlnZ2VyKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9vcHRpb25zLm1hcmtlcnMpIHRoaXMuX29wdGlvbnMubWFya2VycyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uYW1lOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBnZXQgc3RhdGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3N0YXRlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiB0aW1lcyB0aGF0IHRoaXMgY2xpcCBoYXMgYmVlbiBwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgdGltZXNQbGF5ZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RpbWVzUGxheWVkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBjdXJyZW50VGltZSgpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBBdWRpb0NsaXBTdGF0ZS5QQVVTRUQpIHJldHVybiB0aGlzLl90aW1lUGF1c2VkQXQ7XHJcblxyXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBBdWRpb0NsaXBTdGF0ZS5QTEFZSU5HKSByZXR1cm4gdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUgLSB0aGlzLl90aW1lU3RhcnRlZEF0O1xyXG5cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgZHVyYXRpb24gb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgZHVyYXRpb24oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2R1cmF0aW9uOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHZvbHVtZSBvZiB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgdm9sdW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92b2x1bWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdm9sdW1lIG9mIHRoaXMgY2xpcC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdm9sIFRoZSBuZXcgdm9sdW1lIG9mIHRoZSBjbGlwLlxyXG4gICAqL1xyXG4gIHNldCB2b2x1bWUodm9sOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3ZvbHVtZSA9IHZvbDtcclxuXHJcbiAgICB0aGlzLl9nYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUodGhpcy5fdm9sdW1lIC8gMTAwLCB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjcmVhdGVkIG5vZGVzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqL1xyXG4gIGdldCBub2RlcygpOiBhbnkgeyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIGN1c3RvbSBub2RlIGZyb20gYGFwcC5ub2Rlc1tub2RlTmFtZV1gLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byBhZGQgdG8gdGhpcyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3QgdHJhY2sgPSBhMmQuYWRkQXVkaW8oJ3RyYWNrLTEnLCB0cmFjazFCdWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIGNvbnN0IGJmID0gYTJkLm5vZGVzLmJpcXVhZEZpbHRlcigpO1xyXG4gICAqIHRyYWNrLmFkZE5vZGUoYmYpO1xyXG4gICAqL1xyXG4gIGFkZE5vZGUobm9kZTogTm9kZSkge1xyXG4gICAgdGhpcy5fbm9kZXNbbm9kZS5uYW1lXSA9IG5vZGUuaW5zdGFuY2U7XHJcblxyXG4gICAgdGhpcy5fbm9kZXNyZWYucHVzaChub2RlKTtcclxuXHJcbiAgICBpZiAodGhpcy5fbm9kZXNyZWYubGVuZ3RoID09PSAxKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbGF0ZXN0Tm9kZTogTm9kZSA9IHRoaXMuX25vZGVzcmVmW3RoaXMuX25vZGVzcmVmLmxlbmd0aCAtIDJdO1xyXG5cclxuICAgIG5vZGUuaW5zdGFuY2UuY29ubmVjdChsYXRlc3ROb2RlLmluc3RhbmNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYXlzIHRoaXMgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFya2VyIFRoZSBuYW1lIG9mIHRoZSBtYXJrZXIgb2YgdGhlIHBhcnQgb2YgdGhlIGNsaXAgdG8gcGxheS5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHNmeE1hcmtlcnMgPSBbeyBuYW1lOiAnd2FsaycsIHN0YXJ0OiAxNTAwLCBkdXJhdGlvbjogMTAwMCB9LCB7IG5hbWU6ICdmYWxsJzogc3RhcnQ6IDI1MDAsIGR1cmF0aW9uOiAxNTAwIH1dO1xyXG4gICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyLCB7IG1hcmtlcnM6IHN4Zk1hcmtlcnMgfSk7XHJcbiAgICogXHJcbiAgICogLy8gcGxheSBqdXN0IHRoZSBmYWxsaW5nIHNvdW5kLlxyXG4gICAqIHNmeC5wbGF5KCdmYWxsJyk7XHJcbiAgICovXHJcbiAgcGxheShtYXJrZXI/OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG9mZnNldDogbnVtYmVyID0gdGhpcy5fdGltZVBhdXNlZEF0O1xyXG5cclxuICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX29wdGlvbnMuY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cclxuICAgIHRoaXMuX3NvdXJjZS5idWZmZXIgPSB0aGlzLl9hdWRpbztcclxuICAgIHRoaXMuX3NvdXJjZS5sb29wID0gdGhpcy5sb29wO1xyXG5cclxuICAgIHRoaXMuX2Nvbm5lY3ROb2RlcygpO1xyXG5cclxuICAgIHRoaXMuX29uY29tcGxldGUoKTtcclxuXHJcbiAgICBpZiAobWFya2VyKSB7XHJcbiAgICAgIGNvbnN0IGNsaXBNYXJrZXI6IChNYXJrZXIgfCB1bmRlZmluZWQpID0gdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5maW5kKChtOiBNYXJrZXIpID0+IG0ubmFtZSA9PT0gbWFya2VyKTtcclxuXHJcbiAgICAgIGlmICghY2xpcE1hcmtlcikgcmV0dXJuO1xyXG5cclxuICAgICAgdGhpcy5fc291cmNlLnN0YXJ0KDAsIGNsaXBNYXJrZXIuc3RhcnQgLyAxMDAwLCBjbGlwTWFya2VyLmR1cmF0aW9uID8gY2xpcE1hcmtlci5kdXJhdGlvbiAvIDEwMDAgOiB1bmRlZmluZWQpO1xyXG5cclxuICAgICAgdGhpcy5fcmVzZXRQYXVzZShjbGlwTWFya2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RpbWVTdGFydGVkQXQgPSB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIG9mZnNldDtcclxuXHJcbiAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSAwO1xyXG5cclxuICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuUExBWUlORztcclxuXHJcbiAgICB0aGlzLl90aW1lc1BsYXllZCsrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF1c2UgdGhlIGN1cnJlbnRseSBwbGF5aW5nIGF1ZGlvLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIpO1xyXG4gICAqIHNmeC5wbGF5KCk7XHJcbiAgICogXHJcbiAgICogc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICogICBzZngucGF1c2UoKTtcclxuICAgKiB9LCAxMDAwKTtcclxuICAgKi9cclxuICBwYXVzZSgpIHtcclxuICAgIGNvbnN0IGVsYXBzZWQ6IG51bWJlciA9IHRoaXMuX29wdGlvbnMuY3R4LmN1cnJlbnRUaW1lIC0gdGhpcy5fdGltZVN0YXJ0ZWRBdDtcclxuXHJcbiAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICB0aGlzLl90aW1lUGF1c2VkQXQgPSBlbGFwc2VkXHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ2EyZC1wYXVzZScsIHN0YXJ0OiB0aGlzLl90aW1lUGF1c2VkQXQgKiAxMDAwIH0pO1xyXG5cclxuICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuUEFVU0VEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdW1lcyBwbGF5aW5nIHRoaXMgY2xpcCBmcm9tIHdoZW4gaXQgd2FzIHBhdXNlZC5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgKiBzZngucGxheSgpO1xyXG4gICAqIHNmeC5wYXVzZSgpO1xyXG4gICAqIFxyXG4gICAqIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAqICAgc2Z4LnJlc3VtZSgpO1xyXG4gICAqIH0sIDEwMDApO1xyXG4gICAqL1xyXG4gIHJlc3VtZSgpIHtcclxuICAgIHRoaXMucGxheSgnYTJkLXBhdXNlJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wcyB0aGUgcGxheWJhY2sgb2YgdGhpcyBhdWRpby5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXVkaW9DbGlwfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIHNmeC5wbGF5KCk7XHJcbiAgICogc2Z4LnN0b3AoKTtcclxuICAgKi9cclxuICBzdG9wKCkge1xyXG4gICAgdGhpcy5fc291cmNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX29wdGlvbnMuY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cclxuICAgIHRoaXMuX3RpbWVQYXVzZWRBdCA9IDA7XHJcbiAgICB0aGlzLl90aW1lU3RhcnRlZEF0ID0gMDtcclxuXHJcbiAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlNUT1BQRUQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNdXRlcyB0aGlzIGNsaXAuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICogXHJcbiAgICogc2Z4LnBsYXkoKTtcclxuICAgKiBzZngubXV0ZSgpO1xyXG4gICAqL1xyXG4gIG11dGUoKSB7XHJcbiAgICB0aGlzLl9wcmV2aW91c1ZvbHVtZSA9IHRoaXMudm9sdW1lO1xyXG5cclxuICAgIHRoaXMudm9sdW1lID0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFB1dHMgdGhlIHZvbHVtZSBiYWNrIHRvIHRoZSB2YWx1ZSBpdCB3YXMgYXQgYmVmb3JlIHRoZSBjbGlwIHdhcyBtdXRlZC5cclxuICAgKiBcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIFxyXG4gICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgKiBzZngucGxheSgpO1xyXG4gICAqIFxyXG4gICAqIHNmeC5tdXRlKCk7XHJcbiAgICogc2Z4LnVubXV0ZSgpO1xyXG4gICAqL1xyXG4gIHVubXV0ZSgpIHtcclxuICAgIHRoaXMudm9sdW1lID0gdGhpcy5fcHJldmlvdXNWb2x1bWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHVwIGFuIG9uY2xpY2sgZXZlbnQgb24gYSB0cmlnZ2VyIGVsZW1lbnQgaWYgb25lIHdhcyBwcm92aWRlZCBpbiB0aGUgb3B0aW9ucy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NldHVwVHJpZ2dlcigpIHtcclxuICAgIGNvbnN0IGVsOiAoSFRNTEVsZW1lbnQgfCBudWxsKSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fb3B0aW9ucy50cmlnZ2VyISk7XHJcblxyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG5cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbGF5KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29ubmVjdHMgdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRocm91Z2ggYGFkZE5vZGVgLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29ubmVjdE5vZGVzKCkge1xyXG4gICAgaWYgKHRoaXMuX25vZGVzcmVmLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZmlyc3ROb2RlOiBOb2RlID0gdGhpcy5fbm9kZXNyZWZbMF07XHJcbiAgICAgIGNvbnN0IGxhdGVzdE5vZGU6IE5vZGUgPSB0aGlzLl9ub2Rlc3JlZlt0aGlzLl9ub2Rlc3JlZi5sZW5ndGggLSAxXVxyXG5cclxuICAgICAgdGhpcy5fc291cmNlLmNvbm5lY3QobGF0ZXN0Tm9kZS5pbnN0YW5jZSk7XHJcblxyXG4gICAgICBmaXJzdE5vZGUuaW5zdGFuY2UuY29ubmVjdCh0aGlzLl9nYWluKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5jb25uZWN0KHRoaXMuX2dhaW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB3aGF0IGhhcHBlbnMgd2hlbiBhIGNsaXAgaXMgZmluaXNoZWQgcGxheWluZy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uY29tcGxldGUoKSB7XHJcbiAgICB0aGlzLl9zb3VyY2Uub25lbmRlZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5TVE9QUEVEO1xyXG5cclxuICAgICAgdGhpcy5fc291cmNlLm9uZW5kZWQgPSBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyBhbnkgbWFya2VycyBzZXQgYnkgYHBhdXNlYC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7TWFya2VyfSBjbGlwTWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2sgaWYgc2hvdWxkIGJlIHJlbW92ZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVzZXRQYXVzZShjbGlwTWFya2VyOiBNYXJrZXIpIHtcclxuICAgIGlmIChjbGlwTWFya2VyLm5hbWUgPT09ICdhMmQtcGF1c2UnKSB0aGlzLl9vcHRpb25zLm1hcmtlcnMgPSB0aGlzLl9vcHRpb25zLm1hcmtlcnM/LmZpbHRlcigobWFya2VyOiBNYXJrZXIpID0+IG1hcmtlci5uYW1lICE9PSAnYTJkLXBhdXNlJyk7XHJcbiAgfVxyXG59Il19