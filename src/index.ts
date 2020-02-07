'use strict'

import Nodes from './nodes/Nodes';
import AudioClip from './clip/AudioClip';
import AudioClipOptions from './options/AudioClipOptions';

/**
 * Audio2D is a web audio helper for adding sound/music to your JavaScript games.
 */
export default class Audio2D {
  /**
   * A reference to the audio context.
   * 
   * @private
   * 
   * @property {AudioContext}
   */
  private _ctx: AudioContext = new AudioContext;

  /**
   * The object that contains all of the audio clips created.
   * 
   * @private
   * 
   * @property {Array<AudioClip>}
   */
  private _clips: Array<AudioClip> = [];

  /**
   * A reference to the nodes module.
   * 
   * @private
   * 
   * @property {Nodes}
   */
  private _nodes: Nodes = new Nodes(this._ctx);
  
  /**
   * Returns the created audio clips.
   * 
   * @returns {Array<AudioClip>}
   */
  get clips(): Array<AudioClip> { return this._clips; }

  /**
   * Returns the nodes module to use for creating nodes and adding them to clips.
   * 
   * @returns {Nodes}
   */
  get nodes(): Nodes { return this._nodes; }

  /**
   * Adds audio to the media library.
   * 
   * @param {string} name The name of this audio clip used to reference it.
   * @param {AudioBuffer} buffer A reference to the audio buffer for this audio.
   * @param {Object} [options]
   * @param {Array<Marker>} [options.markers] A breakdown of the audio into individual parts that can be used independently.
   * @param {string} [options.trigger] An id or classname of a dom element that when clicked will trigger the clip to play.
   * 
   * @example
   * 
   * // Adding an audio clip with no markers.
   * const levelUp = a2d.addAudio('level-up', levelUpBuffer);
   * 
   * // Adding an audio clip with markers.
   * const sfxMarkers = [
   *   { name: 'walk', start: 1500, duration: 1000 },
   *   { name: 'fall': start: 2500, duration: 1500 },
   * ];
   * const sfx = a2d.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });
   */
  addAudio(name: string, audio: AudioBuffer, options: AudioClipOptions = {}): AudioClip {
    options.ctx = this._ctx;

    const clip = new AudioClip(name, audio, options);

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
   * a2d.addAudio('track1', buffer);
   * 
   * const clip = a2d.getAudio('track1');
   */
  getAudio(name: string): (AudioClip | undefined) {
    return this._clips.find((clip: AudioClip) => clip.name === name);
  }

  /**
   * Removes an audio clip from the media library.
   * 
   * @param {string} name The name of the audio clip to remove.
   * 
   * @returns {Audio2D} Returns this for chaining.
   * 
   * @example
   * 
   * a2d.addAudio('track1', buffer);
   * 
   * a2d.removeAudio('track1');
   */
  removeAudio(name: string): Audio2D {
    this._clips = this.clips.filter((clip: AudioClip) => clip.name !== name);

    return this;
  }

  /**
   * Removes all audio clips from the media library.
   * 
   * @returns {Audio2D} Returns this for chaining.
   * 
   * @example
   * 
   * a2d.addAudio('track1', buffer1);
   * a2d.addAudio('track2', buffer2);
   * 
   * a2d.removeAllAudio();
   */
  removeAllAudio(): Audio2D {
    this._clips = [];

    return this;
  }
}