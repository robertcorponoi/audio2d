'use strict'

import { Marker } from './Marker';

/**
 * Defines the structure of the options that can be passed when creating a new AudioClip.
 */
export interface AudioClipOptions {
    /**
     * The markers for the audio clip, if any are defined.
     * 
     * @property {Array<Marker>}
     */
    markers?: Array<Marker>;

    /**
     * The id or classname of an element that when clicked it will trigger the clip to play.
     * 
     * @property {string}
     */
    trigger?: string;

    /**
     * Any other references that need to be passed by audio2d.
     * 
     * @property {*}
     */
    [internal: string]: any;
}