import AudioClipOptions from './AudioClipOptions';
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
    private _name;
    /**
     * A reference to the audio to play.
     *
     * @private
     *
     * @property
     */
    private _audio;
    /**
     * The audio buffer source of the clip.
     *
     * @private
     *
     * @property {AudioBufferSourceNode|MediaElementAudioSourceNode}
     */
    private _source;
    /**
     * A reference to the options for this audio clip.
     *
     * @private
     *
     * @property {AudioClipOptions}
     */
    private _options;
    /**
     * @param {string} name The name of the audio clip.
     * @param {AudioBuffer} audio The AudioBuffer that contains the audio of the clip.
     * @param {AudioClipOptions} [options] The options passed to this audio clip.
     */
    constructor(name: string, audio: AudioBuffer, options: AudioClipOptions);
    /**
     * Gets the name of the audio clip.
     *
     * @returns {string}
     */
    get name(): string;
    /**
     * Gets the audio buffer source of the clip.
     *
     * @returns {AudioBufferSource}
     */
    get source(): any;
    /**
     * Plays this audio clip.
     *
     * @param {string} marker The name of the marker of the part of the clip to play.
     */
    play(marker?: string): void;
}
