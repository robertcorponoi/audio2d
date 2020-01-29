'use strict'

import AudioClipOptions from './AudioClipOptions';

import Marker from '../interfaces/Marker';

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
   * @property {AudioBufferSourceNode|MediaElementAudioSourceNode}
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
   * @param {string} name The name of the audio clip.
   * @param {AudioBuffer} audio The AudioBuffer that contains the audio of the clip.
   * @param {AudioClipOptions} [options] The options passed to this audio clip.
   */
  constructor(name: string, audio: AudioBuffer, options: AudioClipOptions) {
    this._name = name;

    this._audio = audio;

    this._options = options;
  }

  /**
   * Gets the name of the audio clip.
   * 
   * @returns {string}
   */
  get name(): string { return this._name; }

  /**
   * Gets the audio buffer source of the clip.
   * 
   * @returns {AudioBufferSource}
   */
  get source(): any { return this._source; }

  /**
   * Plays this audio clip.
   * 
   * @param {string} marker The name of the marker of the part of the clip to play.
   */
  play(marker?: string) {
    this._source = this._options.gain.context.createBufferSource();

    this._source.buffer = this._audio;

    this._source.connect(this._options.gain);

    if (marker) {
      const ctx: AudioContext = this._options.gain.context;
      const clipMarker: (Marker | undefined) = this._options.markers?.find((m: Marker) => m.name === marker);

      if (!clipMarker) return;

      this._source.start(0, clipMarker.start / 1000, clipMarker.duration / 1000);

     return; 
    }

    this._source.start();
  }
}