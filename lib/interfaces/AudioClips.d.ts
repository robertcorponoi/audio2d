import AudioClip from '../clip/AudioClip';
/**
 * Defines the structure of the object that holds AudioClip objects.
 */
export default interface AudioClips {
    /**
     * The name of the audio clip as the key and the audio clip object as the value.
     */
    [name: string]: AudioClip;
}
