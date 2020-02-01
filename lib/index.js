'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AudioClip = _interopRequireDefault(require("./clip/AudioClip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      options.gain = this._gain;
      var clip = new _AudioClip["default"](name, audio, options);

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

exports["default"] = Otic;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJPdGljIiwiQXVkaW9Db250ZXh0IiwiX2N0eCIsImNyZWF0ZUdhaW4iLCJfZ2FpbiIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsIm5hbWUiLCJhdWRpbyIsIm9wdGlvbnMiLCJjdHgiLCJnYWluIiwiY2xpcCIsIkF1ZGlvQ2xpcCIsIl9jbGlwcyIsInB1c2giLCJmaW5kIiwiY2xpcHMiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUdBOzs7SUFHcUJBLEk7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQVNBLGtCQUFjO0FBQUE7O0FBQUEsa0NBcEJlLElBQUlDLFlBQUosRUFvQmY7O0FBQUEsbUNBWGEsS0FBS0MsSUFBTCxDQUFVQyxVQUFWLEVBV2I7O0FBQUEsb0NBRnFCLEVBRXJCOztBQUNaLFNBQUtDLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQixLQUFLSCxJQUFMLENBQVVJLFdBQTdCO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQW1CU0MsSSxFQUFjQyxLLEVBQStEO0FBQUEsVUFBM0NDLE9BQTJDLHVFQUFmLEVBQWU7QUFDcEZBLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixHQUFjLEtBQUtSLElBQW5CO0FBQ0FPLE1BQUFBLE9BQU8sQ0FBQ0UsSUFBUixHQUFlLEtBQUtQLEtBQXBCO0FBRUEsVUFBTVEsSUFBSSxHQUFHLElBQUlDLHFCQUFKLENBQWNOLElBQWQsRUFBb0JDLEtBQXBCLEVBQTJCQyxPQUEzQixDQUFiOztBQUVBLFdBQUtLLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkgsSUFBakI7O0FBRUEsYUFBT0EsSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBYVNMLEksRUFBdUM7QUFDOUMsYUFBTyxLQUFLTyxNQUFMLENBQVlFLElBQVosQ0FBaUIsVUFBQ0osSUFBRDtBQUFBLGVBQXFCQSxJQUFJLENBQUNMLElBQUwsS0FBY0EsSUFBbkM7QUFBQSxPQUFqQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OztnQ0FhWUEsSSxFQUFvQjtBQUM5QixXQUFLTyxNQUFMLEdBQWMsS0FBS0csS0FBTCxDQUFXQyxNQUFYLENBQWtCLFVBQUNOLElBQUQ7QUFBQSxlQUFxQkEsSUFBSSxDQUFDTCxJQUFMLEtBQWNBLElBQW5DO0FBQUEsT0FBbEIsQ0FBZDtBQUVBLGFBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztxQ0FZdUI7QUFDckIsV0FBS08sTUFBTCxHQUFjLEVBQWQ7QUFFQSxhQUFPLElBQVA7QUFDRDs7O3dCQXBGNkI7QUFBRSxhQUFPLEtBQUtBLE1BQVo7QUFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBBdWRpb0NsaXAgZnJvbSAnLi9jbGlwL0F1ZGlvQ2xpcCc7XHJcbmltcG9ydCBBdWRpb0NsaXBPcHRpb25zIGZyb20gJy4vY2xpcC9BdWRpb0NsaXBPcHRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBPdGljIGlzIGEgd2ViIGF1ZGlvIGhlbHBlciBmb3IgYWRkaW5nIHNvdW5kL211c2ljIHRvIHlvdXIgSmF2YVNjcmlwdCBnYW1lcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE90aWMge1xyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBhdWRpbyBjb250ZXh0LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBdWRpb0NvbnRleHR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY3R4OiBBdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0O1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZ2FpbiBub2RlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtHYWluTm9kZX1cclxuICAgKi9cclxuICBwcml2YXRlIF9nYWluOiBBdWRpb05vZGUgPSB0aGlzLl9jdHguY3JlYXRlR2FpbigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIG9mIHRoZSBhdWRpbyBjbGlwcyBjcmVhdGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxBdWRpb0NsaXA+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NsaXBzOiBBcnJheTxBdWRpb0NsaXA+ID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fZ2Fpbi5jb25uZWN0KHRoaXMuX2N0eC5kZXN0aW5hdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjcmVhdGVkIGF1ZGlvIGNsaXBzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxBdWRpb0NsaXA+fVxyXG4gICAqL1xyXG4gIGdldCBjbGlwcygpOiBBcnJheTxBdWRpb0NsaXA+IHsgcmV0dXJuIHRoaXMuX2NsaXBzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYXVkaW8gdG8gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhpcyBhdWRpbyBjbGlwIHVzZWQgdG8gcmVmZXJlbmNlIGl0LlxyXG4gICAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IGJ1ZmZlciBBIHJlZmVyZW5jZSB0byB0aGUgYXVkaW8gYnVmZmVyIGZvciB0aGlzIGF1ZGlvLlxyXG4gICAqIEBwYXJhbSB7QXJyYXk8TWFya2VyPn0gW21hcmtlcnNdIEEgYnJlYWtkb3duIG9mIHRoZSBhdWRpbyBpbnRvIGluZGl2aWR1YWwgcGFydHMgdGhhdCBjYW4gYmUgdXNlZCBpbmRlcGVuZGVudGx5LlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogLy8gQWRkaW5nIGFuIGF1ZGlvIGNsaXAgd2l0aCBubyBtYXJrZXJzLlxyXG4gICAqIGNvbnN0IGxldmVsVXAgPSBvdGljLmFkZEF1ZGlvKCdsZXZlbC11cCcsIGxldmVsVXBCdWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIC8vIEFkZGluZyBhbiBhdWRpbyBjbGlwIHdpdGggbWFya2Vycy5cclxuICAgKiBjb25zdCBzZnhNYXJrZXJzID0gW1xyXG4gICAqICAgeyBuYW1lOiAnd2FsaycsIHN0YXJ0OiAxNTAwLCBkdXJhdGlvbjogMTAwMCB9LFxyXG4gICAqICAgeyBuYW1lOiAnZmFsbCc6IHN0YXJ0OiAyNTAwLCBkdXJhdGlvbjogMTUwMCB9LFxyXG4gICAqIF07XHJcbiAgICogY29uc3Qgc2Z4ID0gb3RpYy5hZGRBdWRpbygnc2Z4Jywgc2Z4QnVmZmVyLCB7IG1hcmtlcnM6IHN4Zk1hcmtlcnMgfSk7XHJcbiAgICovXHJcbiAgYWRkQXVkaW8obmFtZTogc3RyaW5nLCBhdWRpbzogQXVkaW9CdWZmZXIsIG9wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnMgPSB7fSk6IEF1ZGlvQ2xpcCB7XHJcbiAgICBvcHRpb25zLmN0eCA9IHRoaXMuX2N0eDtcclxuICAgIG9wdGlvbnMuZ2FpbiA9IHRoaXMuX2dhaW47XHJcblxyXG4gICAgY29uc3QgY2xpcCA9IG5ldyBBdWRpb0NsaXAobmFtZSwgYXVkaW8sIG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX2NsaXBzLnB1c2goY2xpcCk7XHJcblxyXG4gICAgcmV0dXJuIGNsaXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIGF1ZGlvIGNsaXAgZnJvbSB0aGUgbWVkaWEgbGlicmFyeS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcCB0byBnZXQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0F1ZGlvQ2xpcHx1bmRlZmluZWR9IFJldHVybnMgdGhlIGF1ZGlvIGNsaXAgaWYgaXRzIGZvdW5kIG9yIHVuZGVmaW5lZCBvdGhlcndpc2UuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBvdGljLmFkZEF1ZGlvKCd0cmFjazEnLCBidWZmZXIpO1xyXG4gICAqIFxyXG4gICAqIGNvbnN0IGNsaXAgPSBvdGljLmdldEF1ZGlvKCd0cmFjazEnKTtcclxuICAgKi9cclxuICBnZXRBdWRpbyhuYW1lOiBzdHJpbmcpOiAoQXVkaW9DbGlwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2xpcHMuZmluZCgoY2xpcDogQXVkaW9DbGlwKSA9PiBjbGlwLm5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbiBhdWRpbyBjbGlwIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF1ZGlvIGNsaXAgdG8gcmVtb3ZlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtPdGljfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqIFxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogXHJcbiAgICogb3RpYy5hZGRBdWRpbygndHJhY2sxJywgYnVmZmVyKTtcclxuICAgKiBcclxuICAgKiBvdGljLnJlbW92ZUF1ZGlvKCd0cmFjazEnKTtcclxuICAgKi9cclxuICByZW1vdmVBdWRpbyhuYW1lOiBzdHJpbmcpOiBPdGljIHtcclxuICAgIHRoaXMuX2NsaXBzID0gdGhpcy5jbGlwcy5maWx0ZXIoKGNsaXA6IEF1ZGlvQ2xpcCkgPT4gY2xpcC5uYW1lICE9PSBuYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYWxsIGF1ZGlvIGNsaXBzIGZyb20gdGhlIG1lZGlhIGxpYnJhcnkuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge090aWN9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICogXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBcclxuICAgKiBvdGljLmFkZEF1ZGlvKCd0cmFjazEnLCBidWZmZXIxKTtcclxuICAgKiBvdGljLmFkZEF1ZGlvKCd0cmFjazInLCBidWZmZXIyKTtcclxuICAgKiBcclxuICAgKiBvdGljLnJlbW92ZUFsbEF1ZGlvKCk7XHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsQXVkaW8oKTogT3RpYyB7XHJcbiAgICB0aGlzLl9jbGlwcyA9IFtdO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufSJdfQ==