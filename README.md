<!-- <p align="center">
  <img width="250" height="250" src="">
</p> -->

<h1 align="center">Audio2D</h1>

<p align="center">Audio2D is an easy way to add web audio to your JavaScript game.<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/a2d.svg?style=flat)](https://www.npmjs.com/package/a2d)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/a2d/badge.svg)](https://snyk.io/test/github/robertcorponoi/a2d)
  ![npm](https://img.shields.io/npm/dt/a2d)
  [![NPM downloads](https://img.shields.io/npm/dm/a2d.svg?style=flat)](https://www.npmjs.com/package/a2d)
  <a href="https://badge.fury.io/js/a2d"><img src="https://img.shields.io/github/issues/robertcorponoi/a2d.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/a2d"><img src="https://img.shields.io/github/license/robertcorponoi/a2d.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

**Table of Contents**

- [Installation](#installation)
- [A Note About Preloading](#a-note-about-preloading)
- [Base API](#base-api)
  - [Methods](#base-api-methods)
- [AudioClip API](#audio-clip-api)
  - [Properties](#audio-clip-properties)
  - [Methods](#audio-clip-methods)

## **Installation**

To install a2d, you can use:

```bash
$ npm install a2d
```

and then initialize it like so:

```js
// Browser
import Audio2D from './node_modules/a2d/a2d.js';

// Webpack
import Audio2D from 'a2d';
```

or you can use it as a script from unpkg like so:

```html
<script type="module" src="https://unpkg.com/a2d@latest/a2d.js"></script>
```

## **A Note About Preloading**

After some thought while creating Audio2D, I decided that it should not offer loading of audio assets.

I was going to initally offer it as a feature but after trying to figure out signal timing and letting the user know when the audio was loaded and ready to go, it turned into a signal based monstrosity. The great thing is that it doesn't need to be a monstrosity, there are preloaders out there, like [musk-ox](https://github.com/robertcorponoi/musk-ox)  for example, that offer to load any of your assets for you, including audio buffers which is what Audio2D works with.

For an example on basic usage with musk-ox, check out the following example:

```js
const a2d = new Audio2D();
const muskox = new MuskOx();

muskox.onComplete.add(loaded);

const loaded = () => {
  const levelUpBuffer = muskox.fetch.audioBuffer('level-up');

  const levelUp = a2d.addAudio('level-up', levelUp);

  levelUp.play();
}

muskox.load.audioBuffer('level-up', './assets/audio/level-up.m4a');

muskox.start();
```

## **API**

All examples are assumed to be running using existing audio buffers.

### **addAudio**

Creates a web audio clip from an `AudioBuffer` and returns it so you can play it or perform other actions.

| param           | type          | description                                                                                                    | default |
|-----------------|---------------|----------------------------------------------------------------------------------------------------------------|---------|
| name            | string        | The name of the audio clip used to reference it.                                                               |         |
| buffer          | AudioBuffer   | The buffer of the audio clip.                                                                                  |         |
| options         | Object        |                                                                                                                |         |
| options.markers | Array<<span>Marker> | Markers that can define specific points during the audio track that can be played independently of each other. |   |
| options.trigger | string | An id or classname of a dom element that when clicked will trigger the clip to play.                                  |         |

**examples:**

Creating a basic audio clip with no markers:

```js
const levelUp = a2d.addAudio('level-up', levelUpBuffer);
```

Creating an audio clip with specific markers:

```js
const sfxMarkers = [
  { name: 'walk', start: 1500, duration: 1000 },
  { name: 'fall': start: 2500, duration: 1500 },
  { name: 'collect-coin': start: 4000, duration: 750 }
];

const sfx = a2d.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });
```

In the [Audio API](#audio-api) you can see how to use the markers and play only parts of a track.

### **getAudio**

Gets an audio clip added to the media library with `addAudio`.

| param           | type          | description                                                                                                    | default |
|-----------------|---------------|----------------------------------------------------------------------------------------------------------------|---------|
| name            | string        | The name of the audio clip to get.                                                                             |         |

**example:**

```js
a2d.addAudio('track1', buffer);

const clip = a2d.getAudio('track1');
```

### **removeAudio**

Removes an audio clip from the media library.

| param           | type          | description                                                                                                    | default |
|-----------------|---------------|----------------------------------------------------------------------------------------------------------------|---------|
| name            | string        | The name of the audio clip to remove.                                                                          |         |

**example:**

```js
a2d.addAudio('track1', buffer);

a2d.removeAudio('track1');
```

### **removeAllAudio**

Removes all audio clips from the media library.

**example:**

```js
a2d.addAudio('track1', buffer1);
a2d.addAudio('track2', buffer2);

a2d.removeAllAudio();
```

## **Audio Clip**

The following properties and methods are available to use on audio clips after they have been created with `addAudio`.

## **Audio Clip Properties**

### **name**

Returns the name of the clip.

### **state**

Returns the current state of the clip. These states are either 'STOPPED', 'PLAYING', or 'PAUSED'.

### **timesPlayed**

Returns the number of times that this clip has been played.

### **currentTime**

Returns the current time of the clip.

### **duration**

Returns the duration of the audio clip.

### **volume**

Returns the current volume of this clip. This overrides the global volume if one was set.

### **volume**

Sets the volume for the clip to use from here on out. The volume provided can be any number from 0-100. This overrides any global volume set.

| param  | type   | description                                                       | default |
|--------|--------|-------------------------------------------------------------------|---------|
| vol    | number | The new volume for this clip                                      |         |

## **Audio Clip Methods**

### **addNode**

You can choose to add a web audio node to the clip. Nodes will be connected to each other in the order added with the source always at the start and the gain always at the end of the chain.

The available nodes are:

- biquadFilter

and they can be created through the `nodes` property on the audio2d instance like so:

**example:**

```js
const track = a2d.addAudio('track-1', track1Buffer);

const bf = a2d.nodes.biquadFilter();

track.addNode(bf);
```

After adding nodes, you can then modify the properties of the nodes by the `nodes` property of the audio clip and the name of the node like so:

```js
const track = a2d.addAudio('track-1', track1Buffer);

a2d.nodes.biquadFilter();

track.addNode(bf);

// Modifying the biquad filter.
track.nodes.biquadFilter.Q.value = 100;
track.nodes.biquadFilter.frequency.value = 1;
```

### **play**

Plays an audio clip fully or at one of the markers.

| param  | type   | description                                                       | default |
|--------|--------|-------------------------------------------------------------------|---------|
| marker | string | The name of the marker to play instead of playing the whole clip. | ''      |

**examples:**

Creating an audio clip and playing it in its entirety:

```js
const levelUp = a2d.addAudio('level-up', levelUpBuffer);

levelUp.play();
```

Creating an audio clip and defining markers to play:

```js
const sfxMarkers = [
  { name: 'walk', start: 1500, duration: 1000 },
  { name: 'fall': start: 2500, duration: 1500 },
  { name: 'collect-coin': start: 4000, duration: 750 }
];

const sfx = a2d.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });

// play just the falling sound.
sfx.play('fall');
```

### **pause**

Pauses an audio clip.

**example:**

```js
const sfx = a2d.addAudio('sfx', sfxBuffer);

sfx.play();

setTimeout(() => {
  sfx.pause();
}, 1000);
```

### **resume**

Resumes playing an audio clip from a paused state.

***example:**

```js
const sfx = a2d.addAudio('sfx', sfxBuffer);

sfx.play();

setTimeout(() => {
  sfx.pause();

  setTimeout(() => {
    sfx.resume();
  }, 1000);
}, 1000);
```

### **stop**

Completely stops the playback of an audio clip and resets it so next time it plays it will play from the beginning.

**example:**

```js
const sfx = a2d.addAudio('sfx', sfxBuffer);

sfx.play();

setTimeout(() => {
  sfx.stop();
}, 1000);
```

### **mute**

Mutes an audio clip but saves the previous volume so when its unmuted it will go back to the volume it was before.

**example:**

```js
const sfx = a2d.addAudio('sfx', sfxBuffer);

sfx.play();
sfx.mute();
```

### **unmute**

Unmutes an audio clip and sets the volume to what it was before it was muted.

**example:**

```js
const sfx = a2d.addAudio('sfx', sfxBuffer);

sfx.play();

sfx.mute();
sfx.unmute();
```