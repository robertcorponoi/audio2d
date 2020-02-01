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
     * @property {AudioBufferSourceNode}
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
     * The current state of this clip.
     *
     * @private
     *
     * @property {AudioClipState}
     */
    private _state;
    /**
     * The number of times this clip has been played.
     *
     * @private
     *
     * @property
     */
    private _timesPlayed;
    /**
     * The time that this clip start being played at.
     *
     * @private
     *
     * @property {number}
     */
    private _timeStartedAt;
    /**
     * When the clip is paused, this will keep track of when it was paused so it can be resumed at that time.
     *
     * @private
     *
     * @property {number}
     */
    private _timePausedAt;
    /**
     * The current time of the clip.
     *
     * @private
     *
     * @property {number}
     */
    private _currentTime;
    /**
     * The duration of the clip.
     *
     * @private
     *
     * @property {number}
     */
    private _duration;
    /**
     * The volume of this audio clip.
     *
     * @private
     *
     * @property {number}
     *
     * @default 100
     */
    private _volume;
    /**
     * Keeps track of the previous volume of the clip.
     *
     * @private
     *
     * @property {number}
     */
    private _previousVolume;
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
     * Gets the current state of the audio clip.
     *
     * @returns {string}
     */
    get state(): string;
    /**
     * Gets the number of times that this clip has been played.
     *
     * @returns {number}
     */
    get timesPlayed(): number;
    /**
     * Gets the current time of the clip.
     *
     * @returns {number}
     */
    get currentTime(): number;
    /**
     * Gets the duration of the clip.
     *
     * @returns {number}
     */
    get duration(): number;
    /**
     * Gets the volume of this clip.
     *
     * @returns {number}
     */
    get volume(): number;
    /**
     * Sets the volume of this clip.
     *
     * @param {number} vol The new volume of the clip.
     */
    set volume(vol: number);
    /**
     * Plays this audio clip.
     *
     * @param {string} marker The name of the marker of the part of the clip to play.
     */
    play(marker?: string): void;
    /**
     * Pause the currently playing audio.
     */
    pause(): void;
    /**
     * Resumes playing this clip from when it was paused.
     */
    resume(): void;
    /**
     * Stops the playback of this audio.
     *
     * @returns {AudioClip} Returns this for chaining.
     */
    stop(): void;
    /**
     * Mutes this clip.
     */
    mute(): void;
    /**
     * Puts the volume back to the value it was at before the clip was muted.
     */
    unmute(): void;
}
