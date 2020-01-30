import Marker from '../interfaces/Marker';
/**
 * Defines the structure of the options that can be passed when creating a new AudioClip.
 */
export default interface AudioClipOptions {
    /**
     * The markers for the audio clip, if any are defined.
     *
     * @property {Array<Marker>}
     */
    markers?: Array<Marker>;
    /**
     * Any other references that need to be passed by otic.
     *
     * @property {*}
     */
    [internal: string]: any;
}
