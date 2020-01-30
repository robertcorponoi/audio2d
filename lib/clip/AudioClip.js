'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = AudioClip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGlwL0F1ZGlvQ2xpcC50cyJdLCJuYW1lcyI6WyJBdWRpb0NsaXAiLCJuYW1lIiwiYXVkaW8iLCJvcHRpb25zIiwiX25hbWUiLCJfYXVkaW8iLCJfb3B0aW9ucyIsIm1hcmtlciIsIl9zb3VyY2UiLCJnYWluIiwiY29udGV4dCIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImJ1ZmZlciIsImNvbm5lY3QiLCJjdHgiLCJjbGlwTWFya2VyIiwibWFya2VycyIsImZpbmQiLCJtIiwic3RhcnQiLCJkdXJhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQU1BOzs7O0lBSXFCQSxTOzs7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7O0FBS0EscUJBQVlDLElBQVosRUFBMEJDLEtBQTFCLEVBQThDQyxPQUE5QyxFQUF5RTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUN2RSxTQUFLQyxLQUFMLEdBQWFILElBQWI7QUFFQSxTQUFLSSxNQUFMLEdBQWNILEtBQWQ7QUFFQSxTQUFLSSxRQUFMLEdBQWdCSCxPQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFjQTs7Ozs7eUJBS0tJLE0sRUFBaUI7QUFDcEIsV0FBS0MsT0FBTCxHQUFlLEtBQUtGLFFBQUwsQ0FBY0csSUFBZCxDQUFtQkMsT0FBbkIsQ0FBMkJDLGtCQUEzQixFQUFmO0FBRUEsV0FBS0gsT0FBTCxDQUFhSSxNQUFiLEdBQXNCLEtBQUtQLE1BQTNCOztBQUVBLFdBQUtHLE9BQUwsQ0FBYUssT0FBYixDQUFxQixLQUFLUCxRQUFMLENBQWNHLElBQW5DOztBQUVBLFVBQUlGLE1BQUosRUFBWTtBQUFBOztBQUNWLFlBQU1PLEdBQWlCLEdBQUcsS0FBS1IsUUFBTCxDQUFjRyxJQUFkLENBQW1CQyxPQUE3QztBQUNBLFlBQU1LLFVBQWdDLDRCQUFHLEtBQUtULFFBQUwsQ0FBY1UsT0FBakIsMERBQUcsc0JBQXVCQyxJQUF2QixDQUE0QixVQUFDQyxDQUFEO0FBQUEsaUJBQWVBLENBQUMsQ0FBQ2pCLElBQUYsS0FBV00sTUFBMUI7QUFBQSxTQUE1QixDQUF6QztBQUVBLFlBQUksQ0FBQ1EsVUFBTCxFQUFpQjs7QUFFakIsYUFBS1AsT0FBTCxDQUFhVyxLQUFiLENBQW1CLENBQW5CLEVBQXNCSixVQUFVLENBQUNJLEtBQVgsR0FBbUIsSUFBekMsRUFBK0NKLFVBQVUsQ0FBQ0ssUUFBWCxHQUFzQixJQUFyRTs7QUFFRDtBQUNBOztBQUVELFdBQUtaLE9BQUwsQ0FBYVcsS0FBYjtBQUNEOzs7d0JBakNrQjtBQUFFLGFBQU8sS0FBS2YsS0FBWjtBQUFvQjtBQUV6Qzs7Ozs7Ozs7d0JBS2tCO0FBQUUsYUFBTyxLQUFLSSxPQUFaO0FBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgQXVkaW9DbGlwT3B0aW9ucyBmcm9tICcuL0F1ZGlvQ2xpcE9wdGlvbnMnO1xyXG5cclxuaW1wb3J0IE1hcmtlciBmcm9tICcuLi9pbnRlcmZhY2VzL01hcmtlcic7XHJcblxyXG4vKipcclxuICogQW4gYXVkaW8gY2xpcCByZXByZXNlbnRzIGEgcGllY2Ugb2YgYXVkaW8sIHdoaWNoIGlzIGVpdGhlciBhbiBhdWRpbyBodG1sIGVsZW1lbnQgb3IgYW4gYXVkaW8gYm9mZmVyLCBhc1xyXG4gKiBhIHBsYXlhYmxlIGNsaXAgd2l0aCBleHRyYSBwcm9wZXJ0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9DbGlwIHtcclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGF1ZGlvIHRvIHBsYXkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkgXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXVkaW86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF1ZGlvIGJ1ZmZlciBzb3VyY2Ugb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0F1ZGlvQnVmZmVyU291cmNlTm9kZXxNZWRpYUVsZW1lbnRBdWRpb1NvdXJjZU5vZGV9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc291cmNlITogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBdWRpb0NsaXBPcHRpb25zfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnM6IEF1ZGlvQ2xpcE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhdWRpbyBjbGlwLlxyXG4gICAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IGF1ZGlvIFRoZSBBdWRpb0J1ZmZlciB0aGF0IGNvbnRhaW5zIHRoZSBhdWRpbyBvZiB0aGUgY2xpcC5cclxuICAgKiBAcGFyYW0ge0F1ZGlvQ2xpcE9wdGlvbnN9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBwYXNzZWQgdG8gdGhpcyBhdWRpbyBjbGlwLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgYXVkaW86IEF1ZGlvQnVmZmVyLCBvcHRpb25zOiBBdWRpb0NsaXBPcHRpb25zKSB7XHJcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuXHJcbiAgICB0aGlzLl9hdWRpbyA9IGF1ZGlvO1xyXG5cclxuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgYXVkaW8gY2xpcC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uYW1lOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGF1ZGlvIGJ1ZmZlciBzb3VyY2Ugb2YgdGhlIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0F1ZGlvQnVmZmVyU291cmNlfVxyXG4gICAqL1xyXG4gIGdldCBzb3VyY2UoKTogYW55IHsgcmV0dXJuIHRoaXMuX3NvdXJjZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBQbGF5cyB0aGlzIGF1ZGlvIGNsaXAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hcmtlciBUaGUgbmFtZSBvZiB0aGUgbWFya2VyIG9mIHRoZSBwYXJ0IG9mIHRoZSBjbGlwIHRvIHBsYXkuXHJcbiAgICovXHJcbiAgcGxheShtYXJrZXI/OiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX29wdGlvbnMuZ2Fpbi5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG5cclxuICAgIHRoaXMuX3NvdXJjZS5idWZmZXIgPSB0aGlzLl9hdWRpbztcclxuXHJcbiAgICB0aGlzLl9zb3VyY2UuY29ubmVjdCh0aGlzLl9vcHRpb25zLmdhaW4pO1xyXG5cclxuICAgIGlmIChtYXJrZXIpIHtcclxuICAgICAgY29uc3QgY3R4OiBBdWRpb0NvbnRleHQgPSB0aGlzLl9vcHRpb25zLmdhaW4uY29udGV4dDtcclxuICAgICAgY29uc3QgY2xpcE1hcmtlcjogKE1hcmtlciB8IHVuZGVmaW5lZCkgPSB0aGlzLl9vcHRpb25zLm1hcmtlcnM/LmZpbmQoKG06IE1hcmtlcikgPT4gbS5uYW1lID09PSBtYXJrZXIpO1xyXG5cclxuICAgICAgaWYgKCFjbGlwTWFya2VyKSByZXR1cm47XHJcblxyXG4gICAgICB0aGlzLl9zb3VyY2Uuc3RhcnQoMCwgY2xpcE1hcmtlci5zdGFydCAvIDEwMDAsIGNsaXBNYXJrZXIuZHVyYXRpb24gLyAxMDAwKTtcclxuXHJcbiAgICAgcmV0dXJuOyBcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zb3VyY2Uuc3RhcnQoKTtcclxuICB9XHJcbn0iXX0=