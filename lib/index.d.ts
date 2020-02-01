import AudioClip from './clip/AudioClip';
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
    private _ctx;
    /**
     * A reference to the gain node.
     *
     * @private
     *
     * @property {GainNode}
     */
    private _gain;
    /**
     * The object that contains all of the audio clips created.
     *
     * @private
     *
     * @property {Array<AudioClip>}
     */
    private _clips;
    constructor();
    /**
     * Returns the created audio clips.
     *
     * @returns {Array<AudioClip>}
     */
    get clips(): Array<AudioClip>;
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
    addAudio(name: string, audio: AudioBuffer, options?: AudioClipOptions): AudioClip;
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
    getAudio(name: string): (AudioClip | undefined);
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
    removeAudio(name: string): Otic;
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
    removeAllAudio(): Otic;
}
