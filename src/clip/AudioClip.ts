'use strict'

import AudioClipOptions from '../options/AudioClipOptions';

import Node from '../interfaces/Node';
import Marker from '../interfaces/Marker';

import { AudioClipState } from '../enums/AudioClipState'

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
  private _volume: number = 100;

  /**
   * Keeps track of the previous volume of the clip.
   * 
   * @private
   * 
   * @property {number}
   */
  private _previousVolume: number = 1;

  /**
   * A reference to the nodes that have been added for this clip.
   * 
   * @private
   * 
   * @property {Array<Node>}
   */
  private _nodesref: Array<Node> = [];

  /**
   * A reference to the nodes that have been added in a way that allows them to be retrieved easily.
   * 
   * @private
   * 
   * @property {*}
   */
  private _nodes: any = {};

  private _effects: any = {};

  /**
   * Indicates whether this audio clip is played on a loop or not.
   * 
   * @property {boolean}
   * 
   * @default false
   */
  loop: boolean = false;

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

    this._gain.connect(this._options.ctx.destination);

    if (this._options.trigger) this._setupTrigger();

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

    this._gain.gain.setValueAtTime(this._volume / 100, this._options.ctx.currentTime);
  }

  /**
   * Gets the created nodes.
   * 
   * @returns {*}
   */
  get nodes(): any { return this._nodes; }

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
  addNode(node: Node) {
    this._nodes[node.name] = node.instance;

    this._nodesref.push(node);

    if (this._nodesref.length === 1) return;

    const latestNode: Node = this._nodesref[this._nodesref.length - 2];

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
  play(marker?: string) {
    const offset: number = this._timePausedAt;

    this._source = this._options.ctx.createBufferSource();

    this._source.buffer = this._audio;
    this._source.loop = this.loop;

    this._connectNodes();

    this._oncomplete();

    if (marker) {
      const clipMarker: (Marker | undefined) = this._options.markers?.find((m: Marker) => m.name === marker);

      if (!clipMarker) return;

      this._source.start(0, clipMarker.start / 1000, clipMarker.duration ? clipMarker.duration / 1000 : undefined);

      this._resetA2DMarkers(clipMarker);
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
  pause() {
    const elapsed: number = this._options.ctx.currentTime - this._timeStartedAt;

    this.stop();

    this._timePausedAt = elapsed

    this._options.markers?.push({ name: 'a2d-pause', start: this._timePausedAt * 1000 });

    this._state = AudioClipState.PAUSED;
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
  resume() {
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
  stop() {
    this._source.disconnect();
    this._source = this._options.ctx.createBufferSource();

    this._timePausedAt = 0;
    this._timeStartedAt = 0;

    this._state = AudioClipState.STOPPED;
  }

  /**
   * Seeks to a specific time in the clip.
   * 
   * @param {number} time The time, in milliseconds, to seek to.
   */
  seek(time: number) {
    if (!time) return;

    if (time > this.duration * 1000) {
      console.warn('The time to seek to is greater than the duration of the clip.');
      return;
    }

    if (this._state === AudioClipState.PLAYING) {
      this.stop();
    }

    this._options.markers?.push({ name: 'a2d-seek', start: time });

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
  mute() {
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
  unmute() {
    this.volume = this._previousVolume;
  }

  /**
   * Sets up an onclick event on a trigger element if one was provided in the options.
   * 
   * @private
   */
  private _setupTrigger() {
    const el: (HTMLElement | null) = document.querySelector(this._options.trigger!);

    if (!el) return;

    el.addEventListener('click', () => this.play());
  }

  /**
   * Connects the nodes that have been added through `addNode`.
   * 
   * @private
   */
  private _connectNodes() {
    if (this._nodesref.length > 0) {
      const firstNode: Node = this._nodesref[0];
      const latestNode: Node = this._nodesref[this._nodesref.length - 1]

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
  private _oncomplete() {
    this._source.onended = () => {
      this._state = AudioClipState.STOPPED;

      this._source.onended = null;
    };
  }

  /**
   * Resets any markers set internally.
   * 
   * @private
   * 
   * @param {Marker} clipMarker The marker to check if should be removed.
   */
  private _resetA2DMarkers(clipMarker: Marker) {
    if (clipMarker.name.includes('a2d')) this._options.markers = this._options.markers?.filter((marker: Marker) => !marker.name.includes('a2d'));
  }
}