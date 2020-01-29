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
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * Gets the audio buffer source of the clip.
     * 
     * @returns {AudioBufferSource}
     */

  }, {
    key: "source",
    get: function get() {
      return this._source;
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

    _defineProperty(this, "_clips", {});
  }

  _createClass(Otic, [{
    key: "addAudio",

    /**
     * Adds audio to the media library.
     * 
     * @param {string} name The name of this audio clip used to reference it.
     * @param {AudioBuffer} buffer A reference to the audio buffer for this audio.
     * @param {Array<Marker>} [markers] A breakdown of the audio into individual parts that can be used independently.
     */
    value: function addAudio(name, audio) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options.gain = this._gain;
      var clip = new AudioClip(name, audio, options);
      this._clips[clip.name] = clip;
      return clip;
    }
  }]);

  return Otic;
}();

export default Otic;
