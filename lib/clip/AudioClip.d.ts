import AudioClipOptions from '../options/AudioClipOptions';
import Node from '../interfaces/Node';
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
     * A reference to the gain node for this clip.
     *
     * @private
     *
     * @property {GainNode}
     */
    private _gain;
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
     * A reference to the nodes that have been added for this clip.
     *
     * @private
     *
     * @property {Array<Node>}
     */
    private _nodesref;
    /**
     * A reference to the nodes that have been added in a way that allows them to be retrieved easily.
     *
     * @private
     *
     * @property {*}
     */
    private _nodes;
    private _effects;
    /**
     * Indicates whether this audio clip is played on a loop or not.
     *
     * @property {boolean}
     *
     * @default false
     */
    loop: boolean;
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
     * Gets the created nodes.
     *
     * @returns {*}
     */
    get nodes(): any;
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
    addNode(node: Node): void;
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
    play(marker?: string): void;
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
    pause(): void;
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
    resume(): void;
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
    stop(): void;
    /**
     * Seeks to a specific time in the clip.
     *
     * @param {number} time The time, in milliseconds, to seek to.
     */
    seek(time: number): void;
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
    mute(): void;
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
    unmute(): void;
    /**
     * Sets up an onclick event on a trigger element if one was provided in the options.
     *
     * @private
     */
    private _setupTrigger;
    /**
     * Connects the nodes that have been added through `addNode`.
     *
     * @private
     */
    private _connectNodes;
    /**
     * Specify what happens when a clip is finished playing.
     *
     * @private
     */
    private _oncomplete;
    /**
     * Resets any markers set internally.
     *
     * @private
     *
     * @param {Marker} clipMarker The marker to check if should be removed.
     */
    private _resetA2DMarkers;
}
