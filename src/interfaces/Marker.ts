'use strict'

/**
 * Defines the structure of the object that is used to define an audio clips markers.
 */
export default interface Marker {
  /**
   * The name of this marker.
   */
  name: string;

  /**
   * The time this marker starts at in the clip, in milliseconds.
   */
  start: number;

  /**
   * The amount of time that this marker lasts, in milliseconds.
   */
  duration: number;
}