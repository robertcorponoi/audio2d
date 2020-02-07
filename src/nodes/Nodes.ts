'use strict'

import Node from '../interfaces/Node';

/**
 * Provides an interface for adding web audio nodes.
 */
export default class Nodes {
  /**
   * A reference to the AudioContext.
   * 
   * @private
   * 
   * @property {AudioContext}
   */
  private _ctx: AudioContext;

  /**
   * @param {AudioContext} ctx A reference to the AudioContext.
   */
  constructor(ctx: AudioContext) {
    this._ctx = ctx;
  }

  /**
   * Creates a biquadFilter node.
   * 
   * @returns {Node}
   */
  biquadFilter(): Node {
    return { name: 'biquadFilter', instance: this._ctx.createBiquadFilter() };
  }

  /**
   * Creates a gain node.
   * 
   * @returns {Node}
   */
  gain(): Node {
    return { name: 'gain', instance: this._ctx.createGain() };
  }
}