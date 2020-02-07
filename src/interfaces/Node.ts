'use strict'

/**
 * Describes the structure of a node as returned by `audio2d.nodes`.
 */
export default interface Node {
  /**
   * The name of the node.
   */
  name: string;

  /**
   * The actual node itself.
   */
  instance: any;
}