'use strict'

import Otic from '../otic.js';
import MuskOx from '../node_modules/musk-ox/muskox.js';

const otic = new Otic();
const muskOx = new MuskOx({ audioContext: otic._ctx });

describe('Creating basic tracks', () => {
  it('should add an audio track to the collection of tracks', done => {
    muskOx.onComplete.add(() => {
      muskOx.fetch.audioBuffer('sound');
    
      const markers = [
        { name: 'first', start: 1000, duration: 1000 },
        { name: 'second', start: 2000, duration: 750 }
      ];
    
      const a = otic.addAudio('blah', g1, { markers });
    
      console.log(a);

      done();
    });
    
    muskOx.audioBuffer('sound', './assets/123.m4a');
  
    muskOx.start();
  });
});

// const markers = [
//   { name: 'first', start: 1000, duration: 1000 },
//   { name: 'second', start: 2000, duration: 750 }
// ];

// const a = otic.addAudio('blah', g1, { markers });