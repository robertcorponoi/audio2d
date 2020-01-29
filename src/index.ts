'use strict'

import AudioClip from './clip/AudioClip';

import AudioClips from './interfaces/AudioClips';
import AudioClipOptions from './clip/AudioClipOptions';

/**
 * Otic is a web audio helper for adding sound/music to your JavaScript games.
 */
export default class Otic {
  /**
   * A reference to the audio context.
   * 
   * @private
   * 
   * @property {AudioContext}
   */
  private _ctx: AudioContext = new AudioContext;

  /**
   * A reference to the gain node.
   * 
   * @private
   * 
   * @property {GainNode}
   */
  private _gain: AudioNode = this._ctx.createGain().connect(this._ctx.destination);

  /**
   * The object that contains all of the audio clips created.
   * 
   * @private
   * 
   * @property {AudioClips}
   */
  private _clips: AudioClips = {};

  /**
   * Adds audio to the media library.
   * 
   * @param {string} name The name of this audio clip used to reference it.
   * @param {AudioBuffer} buffer A reference to the audio buffer for this audio.
   * @param {Array<Marker>} [markers] A breakdown of the audio into individual parts that can be used independently.
   */
  addAudio(name: string, audio: AudioBuffer, options: AudioClipOptions = {}): AudioClip {
    options.gain = this._gain;

    const clip = new AudioClip(name, audio, options);

    this._clips[clip.name] = clip;

    return clip;
  }
}