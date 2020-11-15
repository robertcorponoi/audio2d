'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioClip = void 0;

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

exports.AudioClip = AudioClip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGlwL0F1ZGlvQ2xpcC50cyJdLCJuYW1lcyI6WyJBdWRpb0NsaXAiLCJuYW1lIiwiYXVkaW8iLCJvcHRpb25zIiwiQXVkaW9DbGlwU3RhdGUiLCJTVE9QUEVEIiwiX25hbWUiLCJfYXVkaW8iLCJfZHVyYXRpb24iLCJkdXJhdGlvbiIsIl9vcHRpb25zIiwiX2dhaW4iLCJjdHgiLCJjcmVhdGVHYWluIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwidHJpZ2dlciIsIl9zZXR1cFRyaWdnZXIiLCJtYXJrZXJzIiwibm9kZSIsIl9ub2RlcyIsImluc3RhbmNlIiwiX25vZGVzcmVmIiwicHVzaCIsImxlbmd0aCIsImxhdGVzdE5vZGUiLCJtYXJrZXIiLCJvZmZzZXQiLCJfdGltZVBhdXNlZEF0IiwiX3NvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImJ1ZmZlciIsImxvb3AiLCJfY29ubmVjdE5vZGVzIiwiX29uY29tcGxldGUiLCJjbGlwTWFya2VyIiwiZmluZCIsIm0iLCJzdGFydCIsInVuZGVmaW5lZCIsIl9yZXNldEEyRE1hcmtlcnMiLCJfdGltZVN0YXJ0ZWRBdCIsImN1cnJlbnRUaW1lIiwiX3N0YXRlIiwiUExBWUlORyIsIl90aW1lc1BsYXllZCIsImVsYXBzZWQiLCJzdG9wIiwiUEFVU0VEIiwicGxheSIsImRpc2Nvbm5lY3QiLCJ0aW1lIiwiY29uc29sZSIsIndhcm4iLCJfcHJldmlvdXNWb2x1bWUiLCJ2b2x1bWUiLCJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJmaXJzdE5vZGUiLCJvbmVuZGVkIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJfdm9sdW1lIiwidm9sIiwiZ2FpbiIsInNldFZhbHVlQXRUaW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFDYUEsUztBQUNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0kscUJBQVlDLElBQVosRUFBMEJDLEtBQTFCLEVBQThDQyxPQUE5QyxFQUF5RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFEQXJHeENDLCtCQUFlQyxPQXFHeUI7QUFBQSwyREE1RjFDLENBNEYwQztBQUFBLDZEQW5GeEMsQ0FtRndDO0FBQUEsNERBMUV6QyxDQTBFeUM7QUFBQSwyREFqRTFDLENBaUUwQztBQUFBO0FBQUEsc0RBN0MvQyxHQTZDK0M7QUFBQSw4REFwQ3ZDLENBb0N1QztBQUFBLHdEQTNCeEMsRUEyQndDO0FBQUEscURBbEJuRCxFQWtCbUQ7QUFBQSx1REFoQmpELEVBZ0JpRDtBQUFBLG1EQVB6RCxLQU95RDtBQUNyRSxTQUFLQyxLQUFMLEdBQWFMLElBQWI7QUFFQSxTQUFLTSxNQUFMLEdBQWNMLEtBQWQ7QUFFQSxTQUFLTSxTQUFMLEdBQWlCTixLQUFLLENBQUNPLFFBQXZCO0FBRUEsU0FBS0MsUUFBTCxHQUFnQlAsT0FBaEI7QUFFQSxTQUFLUSxLQUFMLEdBQWEsS0FBS0QsUUFBTCxDQUFjRSxHQUFkLENBQWtCQyxVQUFsQixFQUFiOztBQUVBLFNBQUtGLEtBQUwsQ0FBV0csT0FBWCxDQUFtQixLQUFLSixRQUFMLENBQWNFLEdBQWQsQ0FBa0JHLFdBQXJDOztBQUVBLFFBQUksS0FBS0wsUUFBTCxDQUFjTSxPQUFsQixFQUEyQixLQUFLQyxhQUFMO0FBRTNCLFFBQUksQ0FBQyxLQUFLUCxRQUFMLENBQWNRLE9BQW5CLEVBQTRCLEtBQUtSLFFBQUwsQ0FBY1EsT0FBZCxHQUF3QixFQUF4QjtBQUMvQjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQThESTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7NEJBQ1lDLEksRUFBWTtBQUNoQixXQUFLQyxNQUFMLENBQVlELElBQUksQ0FBQ2xCLElBQWpCLElBQXlCa0IsSUFBSSxDQUFDRSxRQUE5Qjs7QUFFQSxXQUFLQyxTQUFMLENBQWVDLElBQWYsQ0FBb0JKLElBQXBCOztBQUVBLFVBQUksS0FBS0csU0FBTCxDQUFlRSxNQUFmLEtBQTBCLENBQTlCLEVBQWlDO0FBRWpDLFVBQU1DLFVBQWdCLEdBQUcsS0FBS0gsU0FBTCxDQUFlLEtBQUtBLFNBQUwsQ0FBZUUsTUFBZixHQUF3QixDQUF2QyxDQUF6QjtBQUVBTCxNQUFBQSxJQUFJLENBQUNFLFFBQUwsQ0FBY1AsT0FBZCxDQUFzQlcsVUFBVSxDQUFDSixRQUFqQztBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7eUJBQ1NLLE0sRUFBaUI7QUFDbEIsVUFBTUMsTUFBYyxHQUFHLEtBQUtDLGFBQTVCO0FBRUEsV0FBS0MsT0FBTCxHQUFlLEtBQUtuQixRQUFMLENBQWNFLEdBQWQsQ0FBa0JrQixrQkFBbEIsRUFBZjtBQUVBLFdBQUtELE9BQUwsQ0FBYUUsTUFBYixHQUFzQixLQUFLeEIsTUFBM0I7QUFDQSxXQUFLc0IsT0FBTCxDQUFhRyxJQUFiLEdBQW9CLEtBQUtBLElBQXpCOztBQUVBLFdBQUtDLGFBQUw7O0FBRUEsV0FBS0MsV0FBTDs7QUFFQSxVQUFJUixNQUFKLEVBQVk7QUFBQTs7QUFDUixZQUFNUyxVQUFnQyw0QkFBRyxLQUFLekIsUUFBTCxDQUFjUSxPQUFqQiwwREFBRyxzQkFBdUJrQixJQUF2QixDQUE0QixVQUFDQyxDQUFEO0FBQUEsaUJBQWVBLENBQUMsQ0FBQ3BDLElBQUYsS0FBV3lCLE1BQTFCO0FBQUEsU0FBNUIsQ0FBekM7QUFFQSxZQUFJLENBQUNTLFVBQUwsRUFBaUI7O0FBRWpCLGFBQUtOLE9BQUwsQ0FBYVMsS0FBYixDQUFtQixDQUFuQixFQUFzQkgsVUFBVSxDQUFDRyxLQUFYLEdBQW1CLElBQXpDLEVBQStDSCxVQUFVLENBQUMxQixRQUFYLEdBQXNCMEIsVUFBVSxDQUFDMUIsUUFBWCxHQUFzQixJQUE1QyxHQUFtRDhCLFNBQWxHOztBQUVBLGFBQUtDLGdCQUFMLENBQXNCTCxVQUF0QjtBQUNILE9BUkQsTUFRTztBQUNILGFBQUtOLE9BQUwsQ0FBYVMsS0FBYjtBQUNIOztBQUVELFdBQUtHLGNBQUwsR0FBc0IsS0FBSy9CLFFBQUwsQ0FBY0UsR0FBZCxDQUFrQjhCLFdBQWxCLEdBQWdDZixNQUF0RDtBQUVBLFdBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFFQSxXQUFLZSxNQUFMLEdBQWN2QywrQkFBZXdDLE9BQTdCO0FBRUEsV0FBS0MsWUFBTDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzRCQUNZO0FBQUE7O0FBQ0osVUFBTUMsT0FBZSxHQUFHLEtBQUtwQyxRQUFMLENBQWNFLEdBQWQsQ0FBa0I4QixXQUFsQixHQUFnQyxLQUFLRCxjQUE3RDtBQUVBLFdBQUtNLElBQUw7QUFFQSxXQUFLbkIsYUFBTCxHQUFxQmtCLE9BQXJCO0FBRUEscUNBQUtwQyxRQUFMLENBQWNRLE9BQWQsa0ZBQXVCSyxJQUF2QixDQUE0QjtBQUFFdEIsUUFBQUEsSUFBSSxFQUFFLFdBQVI7QUFBcUJxQyxRQUFBQSxLQUFLLEVBQUUsS0FBS1YsYUFBTCxHQUFxQjtBQUFqRCxPQUE1QjtBQUVBLFdBQUtlLE1BQUwsR0FBY3ZDLCtCQUFlNEMsTUFBN0I7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNhO0FBQ0wsV0FBS0MsSUFBTCxDQUFVLFdBQVY7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDVztBQUNILFdBQUtwQixPQUFMLENBQWFxQixVQUFiOztBQUNBLFdBQUtyQixPQUFMLEdBQWUsS0FBS25CLFFBQUwsQ0FBY0UsR0FBZCxDQUFrQmtCLGtCQUFsQixFQUFmO0FBRUEsV0FBS0YsYUFBTCxHQUFxQixDQUFyQjtBQUNBLFdBQUthLGNBQUwsR0FBc0IsQ0FBdEI7QUFFQSxXQUFLRSxNQUFMLEdBQWN2QywrQkFBZUMsT0FBN0I7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7eUJBQ1M4QyxJLEVBQWM7QUFBQTs7QUFDZixVQUFJLENBQUNBLElBQUwsRUFBVzs7QUFFWCxVQUFJQSxJQUFJLEdBQUcsS0FBSzFDLFFBQUwsR0FBZ0IsSUFBM0IsRUFBaUM7QUFDN0IyQyxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSwrREFBYjtBQUNBO0FBQ0g7O0FBRUQsVUFBSSxLQUFLVixNQUFMLEtBQWdCdkMsK0JBQWV3QyxPQUFuQyxFQUE0QztBQUN4QyxhQUFLRyxJQUFMO0FBQ0g7O0FBRUQscUNBQUtyQyxRQUFMLENBQWNRLE9BQWQsa0ZBQXVCSyxJQUF2QixDQUE0QjtBQUFFdEIsUUFBQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0JxQyxRQUFBQSxLQUFLLEVBQUVhO0FBQTNCLE9BQTVCO0FBRUEsV0FBS0YsSUFBTCxDQUFVLFVBQVY7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzJCQUNXO0FBQ0gsV0FBS0ssZUFBTCxHQUF1QixLQUFLQyxNQUE1QjtBQUVBLFdBQUtBLE1BQUwsR0FBYyxDQUFkO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNhO0FBQ0wsV0FBS0EsTUFBTCxHQUFjLEtBQUtELGVBQW5CO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O29DQUM0QjtBQUFBOztBQUNwQixVQUFNRSxFQUF3QixHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBS2hELFFBQUwsQ0FBY00sT0FBckMsQ0FBakM7QUFFQSxVQUFJLENBQUN3QyxFQUFMLEVBQVM7QUFFVEEsTUFBQUEsRUFBRSxDQUFDRyxnQkFBSCxDQUFvQixPQUFwQixFQUE2QjtBQUFBLGVBQU0sS0FBSSxDQUFDVixJQUFMLEVBQU47QUFBQSxPQUE3QjtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7OztvQ0FDNEI7QUFDcEIsVUFBSSxLQUFLM0IsU0FBTCxDQUFlRSxNQUFmLEdBQXdCLENBQTVCLEVBQStCO0FBQzNCLFlBQU1vQyxTQUFlLEdBQUcsS0FBS3RDLFNBQUwsQ0FBZSxDQUFmLENBQXhCO0FBQ0EsWUFBTUcsVUFBZ0IsR0FBRyxLQUFLSCxTQUFMLENBQWUsS0FBS0EsU0FBTCxDQUFlRSxNQUFmLEdBQXdCLENBQXZDLENBQXpCOztBQUVBLGFBQUtLLE9BQUwsQ0FBYWYsT0FBYixDQUFxQlcsVUFBVSxDQUFDSixRQUFoQzs7QUFFQXVDLFFBQUFBLFNBQVMsQ0FBQ3ZDLFFBQVYsQ0FBbUJQLE9BQW5CLENBQTJCLEtBQUtILEtBQWhDO0FBQ0gsT0FQRCxNQU9PO0FBQ0gsYUFBS2tCLE9BQUwsQ0FBYWYsT0FBYixDQUFxQixLQUFLSCxLQUExQjtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O2tDQUMwQjtBQUFBOztBQUNsQixXQUFLa0IsT0FBTCxDQUFhZ0MsT0FBYixHQUF1QixZQUFNO0FBQ3pCLFFBQUEsTUFBSSxDQUFDbEIsTUFBTCxHQUFjdkMsK0JBQWVDLE9BQTdCO0FBRUEsUUFBQSxNQUFJLENBQUN3QixPQUFMLENBQWFnQyxPQUFiLEdBQXVCLElBQXZCO0FBQ0gsT0FKRDtBQUtIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7cUNBQzZCMUIsVSxFQUFvQjtBQUFBOztBQUN6QyxVQUFJQSxVQUFVLENBQUNsQyxJQUFYLENBQWdCNkQsUUFBaEIsQ0FBeUIsS0FBekIsQ0FBSixFQUFxQyxLQUFLcEQsUUFBTCxDQUFjUSxPQUFkLDZCQUF3QixLQUFLUixRQUFMLENBQWNRLE9BQXRDLDJEQUF3Qix1QkFBdUI2QyxNQUF2QixDQUE4QixVQUFDckMsTUFBRDtBQUFBLGVBQW9CLENBQUNBLE1BQU0sQ0FBQ3pCLElBQVAsQ0FBWTZELFFBQVosQ0FBcUIsS0FBckIsQ0FBckI7QUFBQSxPQUE5QixDQUF4QjtBQUN4Qzs7O3dCQTVTa0I7QUFBRSxhQUFPLEtBQUt4RCxLQUFaO0FBQW9CO0FBRXpDO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7d0JBQ3dCO0FBQUUsYUFBTyxLQUFLcUMsTUFBWjtBQUFxQjtBQUUzQztBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O3dCQUM4QjtBQUFFLGFBQU8sS0FBS0UsWUFBWjtBQUEyQjtBQUV2RDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O3dCQUM4QjtBQUN0QixVQUFJLEtBQUtGLE1BQUwsS0FBZ0J2QywrQkFBZTRDLE1BQW5DLEVBQTJDLE9BQU8sS0FBS3BCLGFBQVo7QUFFM0MsVUFBSSxLQUFLZSxNQUFMLEtBQWdCdkMsK0JBQWV3QyxPQUFuQyxFQUE0QyxPQUFPLEtBQUtsQyxRQUFMLENBQWNFLEdBQWQsQ0FBa0I4QixXQUFsQixHQUFnQyxLQUFLRCxjQUE1QztBQUU1QyxhQUFPLENBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7d0JBQzJCO0FBQUUsYUFBTyxLQUFLakMsU0FBWjtBQUF3QjtBQUVqRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O3dCQUN5QjtBQUFFLGFBQU8sS0FBS3dELE9BQVo7QUFBc0I7QUFFN0M7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7c0JBQ2VDLEcsRUFBYTtBQUNwQixXQUFLRCxPQUFMLEdBQWVDLEdBQWY7O0FBRUEsV0FBS3RELEtBQUwsQ0FBV3VELElBQVgsQ0FBZ0JDLGNBQWhCLENBQStCLEtBQUtILE9BQUwsR0FBZSxHQUE5QyxFQUFtRCxLQUFLdEQsUUFBTCxDQUFjRSxHQUFkLENBQWtCOEIsV0FBckU7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7d0JBQ3FCO0FBQUUsYUFBTyxLQUFLdEIsTUFBWjtBQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHsgQXVkaW9DbGlwT3B0aW9ucyB9IGZyb20gJy4uL29wdGlvbnMvQXVkaW9DbGlwT3B0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9Ob2RlJztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9NYXJrZXInO1xyXG5cclxuaW1wb3J0IHsgQXVkaW9DbGlwU3RhdGUgfSBmcm9tICcuLi9lbnVtcy9BdWRpb0NsaXBTdGF0ZSdcclxuXHJcbi8qKlxyXG4gKiBBbiBhdWRpbyBjbGlwIHJlcHJlc2VudHMgYSBwaWVjZSBvZiBhdWRpbywgd2hpY2ggaXMgZWl0aGVyIGFuIGF1ZGlvIGh0bWwgZWxlbWVudCBvciBhbiBhdWRpbyBib2ZmZXIsIGFzXHJcbiAqIGEgcGxheWFibGUgY2xpcCB3aXRoIGV4dHJhIHByb3BlcnRpZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXVkaW9DbGlwIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gdG8gcGxheS5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9hdWRpbzogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGF1ZGlvIGJ1ZmZlciBzb3VyY2Ugb2YgdGhlIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7QXVkaW9CdWZmZXJTb3VyY2VOb2RlfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zb3VyY2UhOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0F1ZGlvQ2xpcE9wdGlvbnN9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX29wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZ2FpbiBub2RlIGZvciB0aGlzIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7R2Fpbk5vZGV9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dhaW46IEdhaW5Ob2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0F1ZGlvQ2xpcFN0YXRlfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zdGF0ZTogQXVkaW9DbGlwU3RhdGUgPSBBdWRpb0NsaXBTdGF0ZS5TVE9QUEVEO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG51bWJlciBvZiB0aW1lcyB0aGlzIGNsaXAgaGFzIGJlZW4gcGxheWVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3RpbWVzUGxheWVkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpbWUgdGhhdCB0aGlzIGNsaXAgc3RhcnQgYmVpbmcgcGxheWVkIGF0LlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdGltZVN0YXJ0ZWRBdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gdGhlIGNsaXAgaXMgcGF1c2VkLCB0aGlzIHdpbGwga2VlcCB0cmFjayBvZiB3aGVuIGl0IHdhcyBwYXVzZWQgc28gaXQgY2FuIGJlIHJlc3VtZWQgYXQgdGhhdCB0aW1lLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdGltZVBhdXNlZEF0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2N1cnJlbnRUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGR1cmF0aW9uIG9mIHRoZSBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZHVyYXRpb246IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB2b2x1bWUgb2YgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqIFxyXG4gICAgICogQGRlZmF1bHQgMTAwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3ZvbHVtZTogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2VlcHMgdHJhY2sgb2YgdGhlIHByZXZpb3VzIHZvbHVtZSBvZiB0aGUgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3ByZXZpb3VzVm9sdW1lOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIGZvciB0aGlzIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXk8Tm9kZT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX25vZGVzcmVmOiBBcnJheTxOb2RlPiA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIGluIGEgd2F5IHRoYXQgYWxsb3dzIHRoZW0gdG8gYmUgcmV0cmlldmVkIGVhc2lseS5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHsqfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ub2RlczogYW55ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBfZWZmZWN0czogYW55ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGF1ZGlvIGNsaXAgaXMgcGxheWVkIG9uIGEgbG9vcCBvciBub3QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgICAqIFxyXG4gICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAqL1xyXG4gICAgbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQnVmZmVyfSBhdWRpbyBUaGUgQXVkaW9CdWZmZXIgdGhhdCBjb250YWlucyB0aGUgYXVkaW8gb2YgdGhlIGNsaXAuXHJcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQ2xpcE9wdGlvbnN9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBwYXNzZWQgdG8gdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGF1ZGlvOiBBdWRpb0J1ZmZlciwgb3B0aW9uczogQXVkaW9DbGlwT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICB0aGlzLl9hdWRpbyA9IGF1ZGlvO1xyXG5cclxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGF1ZGlvLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5fZ2FpbiA9IHRoaXMuX29wdGlvbnMuY3R4LmNyZWF0ZUdhaW4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZ2Fpbi5jb25uZWN0KHRoaXMuX29wdGlvbnMuY3R4LmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJpZ2dlcikgdGhpcy5fc2V0dXBUcmlnZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5tYXJrZXJzKSB0aGlzLl9vcHRpb25zLm1hcmtlcnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uYW1lOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgc3RhdGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3N0YXRlOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCB0aGlzIGNsaXAgaGFzIGJlZW4gcGxheWVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgdGltZXNQbGF5ZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RpbWVzUGxheWVkOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBjdXJyZW50VGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gQXVkaW9DbGlwU3RhdGUuUEFVU0VEKSByZXR1cm4gdGhpcy5fdGltZVBhdXNlZEF0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IEF1ZGlvQ2xpcFN0YXRlLlBMQVlJTkcpIHJldHVybiB0aGlzLl9vcHRpb25zLmN0eC5jdXJyZW50VGltZSAtIHRoaXMuX3RpbWVTdGFydGVkQXQ7XHJcblxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZHVyYXRpb24gb2YgdGhlIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBkdXJhdGlvbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZHVyYXRpb247IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHZvbHVtZSBvZiB0aGlzIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCB2b2x1bWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZvbHVtZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdm9sdW1lIG9mIHRoaXMgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZvbCBUaGUgbmV3IHZvbHVtZSBvZiB0aGUgY2xpcC5cclxuICAgICAqL1xyXG4gICAgc2V0IHZvbHVtZSh2b2w6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3ZvbHVtZSA9IHZvbDtcclxuXHJcbiAgICAgICAgdGhpcy5fZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHRoaXMuX3ZvbHVtZSAvIDEwMCwgdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3JlYXRlZCBub2Rlcy5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIGdldCBub2RlcygpOiBhbnkgeyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBjdXN0b20gbm9kZSBmcm9tIGBhcHAubm9kZXNbbm9kZU5hbWVdYC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIGFkZCB0byB0aGlzIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGNvbnN0IHRyYWNrID0gYTJkLmFkZEF1ZGlvKCd0cmFjay0xJywgdHJhY2sxQnVmZmVyKTtcclxuICAgICAqIFxyXG4gICAgICogY29uc3QgYmYgPSBhMmQubm9kZXMuYmlxdWFkRmlsdGVyKCk7XHJcbiAgICAgKiB0cmFjay5hZGROb2RlKGJmKTtcclxuICAgICAqL1xyXG4gICAgYWRkTm9kZShub2RlOiBOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZXNbbm9kZS5uYW1lXSA9IG5vZGUuaW5zdGFuY2U7XHJcblxyXG4gICAgICAgIHRoaXMuX25vZGVzcmVmLnB1c2gobm9kZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ub2Rlc3JlZi5sZW5ndGggPT09IDEpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgbGF0ZXN0Tm9kZTogTm9kZSA9IHRoaXMuX25vZGVzcmVmW3RoaXMuX25vZGVzcmVmLmxlbmd0aCAtIDJdO1xyXG5cclxuICAgICAgICBub2RlLmluc3RhbmNlLmNvbm5lY3QobGF0ZXN0Tm9kZS5pbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5cyB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZXIgVGhlIG5hbWUgb2YgdGhlIG1hcmtlciBvZiB0aGUgcGFydCBvZiB0aGUgY2xpcCB0byBwbGF5LlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBjb25zdCBzZnhNYXJrZXJzID0gW3sgbmFtZTogJ3dhbGsnLCBzdGFydDogMTUwMCwgZHVyYXRpb246IDEwMDAgfSwgeyBuYW1lOiAnZmFsbCc6IHN0YXJ0OiAyNTAwLCBkdXJhdGlvbjogMTUwMCB9XTtcclxuICAgICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyLCB7IG1hcmtlcnM6IHN4Zk1hcmtlcnMgfSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIHBsYXkganVzdCB0aGUgZmFsbGluZyBzb3VuZC5cclxuICAgICAqIHNmeC5wbGF5KCdmYWxsJyk7XHJcbiAgICAgKi9cclxuICAgIHBsYXkobWFya2VyPzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0OiBudW1iZXIgPSB0aGlzLl90aW1lUGF1c2VkQXQ7XHJcblxyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX29wdGlvbnMuY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl9zb3VyY2UuYnVmZmVyID0gdGhpcy5fYXVkaW87XHJcbiAgICAgICAgdGhpcy5fc291cmNlLmxvb3AgPSB0aGlzLmxvb3A7XHJcblxyXG4gICAgICAgIHRoaXMuX2Nvbm5lY3ROb2RlcygpO1xyXG5cclxuICAgICAgICB0aGlzLl9vbmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChtYXJrZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgY2xpcE1hcmtlcjogKE1hcmtlciB8IHVuZGVmaW5lZCkgPSB0aGlzLl9vcHRpb25zLm1hcmtlcnM/LmZpbmQoKG06IE1hcmtlcikgPT4gbS5uYW1lID09PSBtYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjbGlwTWFya2VyKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2Uuc3RhcnQoMCwgY2xpcE1hcmtlci5zdGFydCAvIDEwMDAsIGNsaXBNYXJrZXIuZHVyYXRpb24gPyBjbGlwTWFya2VyLmR1cmF0aW9uIC8gMTAwMCA6IHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZXNldEEyRE1hcmtlcnMoY2xpcE1hcmtlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl90aW1lU3RhcnRlZEF0ID0gdGhpcy5fb3B0aW9ucy5jdHguY3VycmVudFRpbWUgLSBvZmZzZXQ7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVQYXVzZWRBdCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuUExBWUlORztcclxuXHJcbiAgICAgICAgdGhpcy5fdGltZXNQbGF5ZWQrKztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhdXNlIHRoZSBjdXJyZW50bHkgcGxheWluZyBhdWRpby5cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIFxyXG4gICAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIpO1xyXG4gICAgICogc2Z4LnBsYXkoKTtcclxuICAgICAqIFxyXG4gICAgICogc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgKiAgIHNmeC5wYXVzZSgpO1xyXG4gICAgICogfSwgMTAwMCk7XHJcbiAgICAgKi9cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIGNvbnN0IGVsYXBzZWQ6IG51bWJlciA9IHRoaXMuX29wdGlvbnMuY3R4LmN1cnJlbnRUaW1lIC0gdGhpcy5fdGltZVN0YXJ0ZWRBdDtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVQYXVzZWRBdCA9IGVsYXBzZWRcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ2EyZC1wYXVzZScsIHN0YXJ0OiB0aGlzLl90aW1lUGF1c2VkQXQgKiAxMDAwIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlBBVVNFRDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc3VtZXMgcGxheWluZyB0aGlzIGNsaXAgZnJvbSB3aGVuIGl0IHdhcyBwYXVzZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgICAqIHNmeC5wbGF5KCk7XHJcbiAgICAgKiBzZngucGF1c2UoKTtcclxuICAgICAqIFxyXG4gICAgICogc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgKiAgIHNmeC5yZXN1bWUoKTtcclxuICAgICAqIH0sIDEwMDApO1xyXG4gICAgICovXHJcbiAgICByZXN1bWUoKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5KCdhMmQtcGF1c2UnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIHRoZSBwbGF5YmFjayBvZiB0aGlzIGF1ZGlvLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7QXVkaW9DbGlwfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogXHJcbiAgICAgKiBjb25zdCBzZnggPSBhMmQuYWRkQXVkaW8oJ3NmeCcsIHNmeEJ1ZmZlcik7XHJcbiAgICAgKiBcclxuICAgICAqIHNmeC5wbGF5KCk7XHJcbiAgICAgKiBzZnguc3RvcCgpO1xyXG4gICAgICovXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlID0gdGhpcy5fb3B0aW9ucy5jdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVQYXVzZWRBdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZVN0YXJ0ZWRBdCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW9DbGlwU3RhdGUuU1RPUFBFRDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlZWtzIHRvIGEgc3BlY2lmaWMgdGltZSBpbiB0aGUgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgdG8gc2VlayB0by5cclxuICAgICAqL1xyXG4gICAgc2Vlayh0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRpbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRpbWUgPiB0aGlzLmR1cmF0aW9uICogMTAwMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSB0aW1lIHRvIHNlZWsgdG8gaXMgZ3JlYXRlciB0aGFuIHRoZSBkdXJhdGlvbiBvZiB0aGUgY2xpcC4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBBdWRpb0NsaXBTdGF0ZS5QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5tYXJrZXJzPy5wdXNoKHsgbmFtZTogJ2EyZC1zZWVrJywgc3RhcnQ6IHRpbWUgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucGxheSgnYTJkLXNlZWsnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE11dGVzIHRoaXMgY2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIFxyXG4gICAgICogY29uc3Qgc2Z4ID0gYTJkLmFkZEF1ZGlvKCdzZngnLCBzZnhCdWZmZXIpO1xyXG4gICAgICogXHJcbiAgICAgKiBzZngucGxheSgpO1xyXG4gICAgICogc2Z4Lm11dGUoKTtcclxuICAgICAqL1xyXG4gICAgbXV0ZSgpIHtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1ZvbHVtZSA9IHRoaXMudm9sdW1lO1xyXG5cclxuICAgICAgICB0aGlzLnZvbHVtZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXRzIHRoZSB2b2x1bWUgYmFjayB0byB0aGUgdmFsdWUgaXQgd2FzIGF0IGJlZm9yZSB0aGUgY2xpcCB3YXMgbXV0ZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBcclxuICAgICAqIGNvbnN0IHNmeCA9IGEyZC5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyKTtcclxuICAgICAqIHNmeC5wbGF5KCk7XHJcbiAgICAgKiBcclxuICAgICAqIHNmeC5tdXRlKCk7XHJcbiAgICAgKiBzZngudW5tdXRlKCk7XHJcbiAgICAgKi9cclxuICAgIHVubXV0ZSgpIHtcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IHRoaXMuX3ByZXZpb3VzVm9sdW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCBhbiBvbmNsaWNrIGV2ZW50IG9uIGEgdHJpZ2dlciBlbGVtZW50IGlmIG9uZSB3YXMgcHJvdmlkZWQgaW4gdGhlIG9wdGlvbnMuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldHVwVHJpZ2dlcigpIHtcclxuICAgICAgICBjb25zdCBlbDogKEhUTUxFbGVtZW50IHwgbnVsbCkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX29wdGlvbnMudHJpZ2dlciEpO1xyXG5cclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbGF5KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRocm91Z2ggYGFkZE5vZGVgLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb25uZWN0Tm9kZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzcmVmLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROb2RlOiBOb2RlID0gdGhpcy5fbm9kZXNyZWZbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhdGVzdE5vZGU6IE5vZGUgPSB0aGlzLl9ub2Rlc3JlZlt0aGlzLl9ub2Rlc3JlZi5sZW5ndGggLSAxXVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLmNvbm5lY3QobGF0ZXN0Tm9kZS5pbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE5vZGUuaW5zdGFuY2UuY29ubmVjdCh0aGlzLl9nYWluKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UuY29ubmVjdCh0aGlzLl9nYWluKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHdoYXQgaGFwcGVucyB3aGVuIGEgY2xpcCBpcyBmaW5pc2hlZCBwbGF5aW5nLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9vbmNvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5vbmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvQ2xpcFN0YXRlLlNUT1BQRUQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2Uub25lbmRlZCA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyBhbnkgbWFya2VycyBzZXQgaW50ZXJuYWxseS5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtNYXJrZXJ9IGNsaXBNYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjayBpZiBzaG91bGQgYmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVzZXRBMkRNYXJrZXJzKGNsaXBNYXJrZXI6IE1hcmtlcikge1xyXG4gICAgICAgIGlmIChjbGlwTWFya2VyLm5hbWUuaW5jbHVkZXMoJ2EyZCcpKSB0aGlzLl9vcHRpb25zLm1hcmtlcnMgPSB0aGlzLl9vcHRpb25zLm1hcmtlcnM/LmZpbHRlcigobWFya2VyOiBNYXJrZXIpID0+ICFtYXJrZXIubmFtZS5pbmNsdWRlcygnYTJkJykpO1xyXG4gICAgfVxyXG59Il19