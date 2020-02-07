'use strict'

import Otic from '../otic.js';
import MuskOx from 'musk-ox/muskox';

const otic = new Otic();
const muskOx = new MuskOx({ audioContext: otic._ctx });

muskOx.onComplete.add(() => {
  const sound = muskOx.fetch.audioBuffer('sna');

  const track1 = otic.addAudio('sna', sound);

  const bf = otic.nodes.biquadFilter();
  const bf2 = otic.nodes.biquadFilter();
  const bf3 = otic.nodes.biquadFilter();

  track1.addNode(bf);

  track1.loop = true;
  track1.play();
});

muskOx.audioBuffer('sna', './assets/sna.m4a');

muskOx.start();