'use strict'

import Audio2D from '../audio2d.js';
import MuskOx from '../node_modules/musk-ox/muskox.js';

const a2d = new Audio2D();
const muskOx = new MuskOx({ audioContext: a2d._ctx });

muskOx.onComplete.add(() => {
  const sound = muskOx.fetch.audioBuffer('sna');

  const track1 = a2d.addAudio('sna', sound);
  
  track1.play();
});

muskOx.audioBuffer('sna', './assets/sna.m4a');

muskOx.start();