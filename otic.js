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
  AudioClipState["Stopped"] = "STOPPED";
  AudioClipState["Playing"] = "PLAYING";
  AudioClipState["Paused"] = "PAUSED";
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
   * @property {AudioBufferSourceNode|MediaElementAudioSourceNode}
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

    _defineProperty(this, "_state", AudioClipState.Stopped);

    this._name = name;
    this._audio = audio;
    this._options = options;
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
      this._source = this._options.gain.context.createBufferSource();
      this._source.buffer = this._audio;

      this._source.connect(this._options.gain);

      if (marker) {
        var _this$_options$marker;

        var ctx = this._options.gain.context;
        var clipMarker = (_this$_options$marker = this._options.markers) === null || _this$_options$marker === void 0 ? void 0 : _this$_options$marker.find(function (m) {
          return m.name === marker;
        });
        if (!clipMarker) return;

        this._source.start(0, clipMarker.start / 1000, clipMarker.duration / 1000);

        return;
      }

      this._source.start();
    }
    /**
     * Pause the currently playing audio.
     */

  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "name",
    get: function get() {
      return this._name;
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
  function Otic() {
    _classCallCheck(this, Otic);

    _defineProperty(this, "_ctx", new AudioContext());

    _defineProperty(this, "_gain", this._ctx.createGain().connect(this._ctx.destination));

    _defineProperty(this, "_clips", []);
  }

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
     *   { name: 'collect-coin': start: 4000, duration: 750 }
     * ];
     * 
     * const sfx = otic.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });
     */
    value: function addAudio(name, audio) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options.gain = this._gain;
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

    /**
     * Returns the created audio clips.
     * 
     * @returns {Array<AudioClip>}
     */
    get: function get() {
      return this._clips;
    }
  }]);

  return Otic;
}();

export default Otic;
