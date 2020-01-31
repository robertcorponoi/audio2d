<!-- <p align="center">
  <img width="250" height="250" src="">
</p> -->

<h1 align="center">Otic</h1>

<p align="center">Otic is an easy way to add web audio to your JavaScript game.<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/otic.svg?style=flat)](https://www.npmjs.com/package/otic)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/otic/badge.svg)](https://snyk.io/test/github/robertcorponoi/otic)
  ![npm](https://img.shields.io/npm/dt/otic)
  [![NPM downloads](https://img.shields.io/npm/dm/otic.svg?style=flat)](https://www.npmjs.com/package/otic)
  <a href="https://badge.fury.io/js/otic"><img src="https://img.shields.io/github/issues/robertcorponoi/otic.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/otic"><img src="https://img.shields.io/github/license/robertcorponoi/otic.svg" alt="license" height="18"></a>
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

To install otic, you can use:

```bash
$ npm install otic
```

and then initialize it like so:

```js
// Browser
import Otic from './node_modules/otic/otic.js';

// Webpack
import Otic from 'otic';
```

or you can use it as a script from unpkg like so:

```html
<script type="module" src="https://unpkg.com/otic@latest/otic.js"></script>
```

## **A Note About Preloading**

After some thought while creating Otic, I decided that it should not offer loading of audio assets.

I was going to initally offer it as a feature but after trying to figure out signal timing and letting the user know when the audio was loaded and ready to go, it turned into a signal based monstrosity. The great thing is that it doesn't need to be a monstrosity, there are preloaders out there, like [musk-ox](https://github.com/robertcorponoi/musk-ox)  for example, that offer to load any of your assets for you, including audio buffers which is what Otic works with.

For an example on basic usage with musk-ox, check out the following example:

```js
const otic = new Otic();
const muskox = new MuskOx();

muskox.onComplete.add(loaded);

const loaded = () => {
  const levelUpBuffer = muskox.fetch.audioBuffer('level-up');

  const levelUp = otic.addAudio('level-up', levelUp);

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
| options.markers | Array<<span>Marker> | Markers that can define specific points during the audio track that can be played independently of each other. |         |

**examples:**

Creating a basic audio clip with no markers:

```js
const levelUp = otic.addAudio('level-up', levelUpBuffer);
```

Creating an audio clip with specific markers:

```js
const sfxMarkers = [
  { name: 'walk', start: 1500, duration: 1000 },
  { name: 'fall': start: 2500, duration: 1500 },
  { name: 'collect-coin': start: 4000, duration: 750 }
];

const sfx = otic.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });
```

In the [Audio API](#audio-api) you can see how to use the markers and play only parts of a track.

### **getAudio**

Gets an audio clip added to the media library with `addAudio`.

| param           | type          | description                                                                                                    | default |
|-----------------|---------------|----------------------------------------------------------------------------------------------------------------|---------|
| name            | string        | The name of the audio clip to get.                                                                             |         |

**example:**

```js
otic.addAudio('track1', buffer);

const clip = otic.getAudio('track1');
```

### **removeAudio**

Removes an audio clip from the media library.

| param           | type          | description                                                                                                    | default |
|-----------------|---------------|----------------------------------------------------------------------------------------------------------------|---------|
| name            | string        | The name of the audio clip to remove.                                                                          |         |

**example:**

```js
otic.addAudio('track1', buffer);

otic.removeAudio('track1');
```

### **removeAllAudio**

Removes all audio clips from the media library.

**example:**

```js
otic.addAudio('track1', buffer1);
otic.addAudio('track2', buffer2);

otic.removeAllAudio();
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

### **play**

Plays an audio clip fully or at one of the markers.

| param  | type   | description                                                       | default |
|--------|--------|-------------------------------------------------------------------|---------|
| marker | string | The name of the marker to play instead of playing the whole clip. | ''      |

**examples:**

Creating an audio clip and playing it in its entirety:

```js
const levelUp = otic.addAudio('level-up', levelUpBuffer);

levelUp.play();
```

Creating an audio clip and defining markers to play:

```js
const sfxMarkers = [
  { name: 'walk', start: 1500, duration: 1000 },
  { name: 'fall': start: 2500, duration: 1500 },
  { name: 'collect-coin': start: 4000, duration: 750 }
];

const sfx = otic.addAudio('sfx', sfxBuffer, { markers: sxfMarkers });

// play just the falling sound.
sfx.play('fall');
```

