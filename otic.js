function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Describes the different states available for an audio clip.
 */

var AudioClipState;

(function (AudioClipState) {
  AudioClipState["STOPPED"] = "STOPPED";
  AudioClipState["PLAYING"] = "PLAYING";
  AudioClipState["PAUSED"] = "PAUSED";
})(AudioClipState || (AudioClipState = {}));

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

    _defineProperty(this, "_gain", void 0);

    _defineProperty(this, "_state", AudioClipState.STOPPED);

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
    this._gain = this._options.ctx.createGain();
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
      this._gain.gain.value = this._volume / 100;
      this._source = this._options.ctx.createBufferSource();
      this._source.buffer = this._audio;

      this._source.connect(this._gain);

      this._source.onended = function () {
        _this._state = AudioClipState.STOPPED;
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
      this._state = AudioClipState.PLAYING;
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
      this._state = AudioClipState.PAUSED;
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
      this._state = AudioClipState.STOPPED;
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
      if (this._state === AudioClipState.PAUSED) return this._timePausedAt;
      if (this._state === AudioClipState.PLAYING) return this._options.ctx.currentTime - this._timeStartedAt;
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
      this._gain.gain.value = this._volume / 100;
      console.log(vol);

      this._gain.gain.setValueAtTime(this._gain.gain.value, this._options.ctx.currentTime);
    }
  }]);

  return AudioClip;
}();

/**
 * Otic is a web audio helper for adding sound/music to your JavaScript games.
 */
var Otic =
/*#__PURE__*/
function () {
  /**
   * A reference to the audio context.
   * 
   * @private
   * 
   * @property {AudioContext}
   */

  /**
   * A reference to the gain node.
   * 
   * @private
   * 
   * @property {GainNode}
   */

  /**
   * The object that contains all of the audio clips created.
   * 
   * @private
   * 
   * @property {Array<AudioClip>}
   */
  function Otic() {
    _classCallCheck(this, Otic);

    _defineProperty(this, "_ctx", new AudioContext());

    _defineProperty(this, "_gain", this._ctx.createGain());

    _defineProperty(this, "_clips", []);

    this._gain.connect(this._ctx.destination);
  }
  /**
   * Returns the created audio clips.
   * 
   * @returns {Array<AudioClip>}
   */


  _createClass(Otic, [{
    key: "addAudio",

    /**
     * Adds audio to the media library.
     * 
     * @param {string} name The name of this audio clip used to reference it.
     * @param {AudioBuffer} buffer A reference to the audio buffer for this audio.
     * @param {Array<Marker>} [markers] A breakdown of the audio into individual parts that can be used independently.
     * 
     * @example
     * 
     * // Adding an audio clip with no markers.
     * const levelUp = otic.addAudio('level-up', levelUpBuffer);
     * 
     * // Adding an audio clip with markers.
     * const sfxMarkers = [
     *   { name: 'walk', start: 1500, duration: 1000 },
     *   { name: 'fall': start: 2500, duration: 1500 },
     * ];
     * const sfx = otic.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });
     */
    value: function addAudio(name, audio) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options.ctx = this._ctx;
      var clip = new AudioClip(name, audio, options);

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
     * otic.addAudio('track1', buffer);
     * 
     * const clip = otic.getAudio('track1');
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
     * @returns {Otic} Returns this for chaining.
     * 
     * @example
     * 
     * otic.addAudio('track1', buffer);
     * 
     * otic.removeAudio('track1');
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
     * @returns {Otic} Returns this for chaining.
     * 
     * @example
     * 
     * otic.addAudio('track1', buffer1);
     * otic.addAudio('track2', buffer2);
     * 
     * otic.removeAllAudio();
     */

  }, {
    key: "removeAllAudio",
    value: function removeAllAudio() {
      this._clips = [];
      return this;
    }
  }, {
    key: "clips",
    get: function get() {
      return this._clips;
    }
  }]);

  return Otic;
}();

export default Otic;
