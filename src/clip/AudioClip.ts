'use strict'

import AudioClipOptions from './AudioClipOptions';

import Marker from '../interfaces/Marker';
import { AudioClipState } from './AudioClipState'

/**
 * An audio clip represents a piece of audio, which is either an audio html element or an audio boffer, as
 * a playable clip with extra properties.
 */
export default class AudioClip {
  /**
   * The name of the audio clip.
   * 
   * @private
   * 
   * @property {string}
   */
  private _name: string;

  /**
   * A reference to the audio to play.
   * 
   * @private
   * 
   * @property 
   */
  private _audio: any;

  /**
   * The audio buffer source of the clip.
   * 
   * @private
   * 
   * @property {AudioBufferSourceNode}
   */
  private _source!: AudioBufferSourceNode;

  /**
   * A reference to the options for this audio clip.
   * 
   * @private
   * 
   * @property {AudioClipOptions}
   */
  private _options: AudioClipOptions;

  /**
   * A reference to the gain node for this clip.
   * 
   * @private
   * 
   * @property {GainNode}
   */
  private _gain: GainNode;

  /**
   * The current state of this clip.
   * 
   * @private
   * 
   * @property {AudioClipState}
   */
  private _state: AudioClipState = AudioClipState.STOPPED;

  /**
   * The number of times this clip has been played.
   * 
   * @private
   * 
   * @property 
   */
  private _timesPlayed: number = 0;

  /**
   * The time that this clip start being played at.
   * 
   * @private
   * 
   * @property {number}
   */
  private _timeStartedAt: number = 0;

  /**
   * When the clip is paused, this will keep track of when it was paused so it can be resumed at that time.
   * 
   * @private
   * 
   * @property {number}
   */
  private _timePausedAt: number = 0;

  /**
   * The current time of the clip.
   * 
   * @private
   * 
   * @property {number}
   */
  private _currentTime: number = 0;

  /**
   * The duration of the clip.
   * 
   * @private
   * 
   * @property {number}
   */
  private _duration: number;

  /**
   * The volume of this audio clip.
   * 
   * @private
   * 
   * @property {number}
   * 
   * @default 100
   */
  private _volume = 100;

  /**
   * Keeps track of the previous volume of the clip.
   * 
   * @private
   * 
   * @property {number}
   */
  private _previousVolume: number = 1;

  /**
   * @param {string} name The name of the audio clip.
   * @param {AudioBuffer} audio The AudioBuffer that contains the audio of the clip.
   * @param {AudioClipOptions} [options] The options passed to this audio clip.
   */
  constructor(name: string, audio: AudioBuffer, options: AudioClipOptions) {
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
  get name(): string { return this._name; }

  /**
   * Gets the current state of the audio clip.
   * 
   * @returns {string}
   */
  get state(): string { return this._state; }

  /**
   * Gets the number of times that this clip has been played.
   * 
   * @returns {number}
   */
  get timesPlayed(): number { return this._timesPlayed; }

  /**
   * Gets the current time of the clip.
   * 
   * @returns {number}
   */
  get currentTime(): number {
    if (this._state === AudioClipState.PAUSED) return this._timePausedAt;

    if (this._state === AudioClipState.PLAYING) return this._options.ctx.currentTime - this._timeStartedAt;

    return 0;
  }

  /**
   * Gets the duration of the clip.
   * 
   * @returns {number}
   */
  get duration(): number { return this._duration; }

  /**
   * Gets the volume of this clip.
   * 
   * @returns {number}
   */
  get volume(): number { return this._volume; }

  /**
   * Sets the volume of this clip.
   * 
   * @param {number} vol The new volume of the clip.
   */
  set volume(vol: number) { 
    this._volume = vol; 

    // this._gain.gain.value = this._volume / 100;

    this._gain.gain.setValueAtTime(this._volume / 100, this._options.ctx.currentTime);
  }

  /**
   * Plays this audio clip.
   * 
   * @param {string} marker The name of the marker of the part of the clip to play.
   */
  play(marker?: string) {
    const offset: number = this._timePausedAt;

    this._gain.gain.value = this._volume / 100;

    this._source = this._options.ctx.createBufferSource();

    this._source.buffer = this._audio;

    this._source.connect(this._gain);

    this._source.onended = () => {
      this._state = AudioClipState.STOPPED;

      this._source.onended = null;
    };

    if (marker) {
      const clipMarker: (Marker | undefined) = this._options.markers?.find((m: Marker) => m.name === marker);

      if (!clipMarker) return;

      this._source.start(0, clipMarker.start / 1000, clipMarker.duration ? clipMarker.duration / 1000 : undefined);

      if (clipMarker.name === 'otic-pause') this._options.markers = this._options.markers?.filter((marker: Marker) => marker.name !== 'otic-pause');
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
  pause() {
    const elapsed: number = this._options.ctx.currentTime - this._timeStartedAt;

    this.stop();
    
    this._timePausedAt = elapsed

    this._options.markers?.push({ name: 'otic-pause', start: this._timePausedAt * 1000 });
    
    this._state = AudioClipState.PAUSED;
  }

  /**
   * Resumes playing this clip from when it was paused.
   */
  resume() {
    this.play('otic-pause');
  }

  /**
   * Stops the playback of this audio.
   * 
   * @returns {AudioClip} Returns this for chaining.
   */
  stop() {
    this._source.disconnect();
    this._source = this._options.ctx.createBufferSource();

    this._timePausedAt = 0;
    this._timeStartedAt = 0;
    
    this._state = AudioClipState.STOPPED;
  }

  /**
   * Mutes this clip.
   */
  mute() {
    this._previousVolume = this.volume;

    this.volume = 0;
  }

  /**
   * Puts the volume back to the value it was at before the clip was muted.
   */
  unmute() {
    this.volume = this._previousVolume;
  }
}