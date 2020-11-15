import { Node } from './interfaces/Node';
/**
 * Provides an interface for adding web audio nodes.
 */
export declare class Nodes {
    /**
     * A reference to the AudioContext.
     *
     * @private
     *
     * @property {AudioContext}
     */
    private _ctx;
    /**
     * @param {AudioContext} ctx A reference to the AudioContext.
     */
    constructor(ctx: AudioContext);
    /**
     * Creates a biquadFilter node.
     *
     * @returns {Node}
     */
    biquadFilter(): Node;
    /**
     * Creates a gain node.
     *
     * @returns {Node}
     */
    gain(): Node;
}
