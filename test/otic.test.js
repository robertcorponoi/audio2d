'use strict'

import Otic from '../otic.js';
import MuskOx from '../node_modules/musk-ox/muskox.js';

let otic;
let muskOx;

mocha.setup({ globals: '__VUE_DEVTOOLS_TOAST__' });

beforeEach(() => {
  otic = new Otic();
  muskOx = new MuskOx({ audioContext: otic._ctx });
});

afterEach(() => {
  otic = null;
  muskOx = null;
});

describe('Managing Audio Clips', () => {
  it('should add an audio track to the collection of tracks', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      otic.addAudio('track1', sound);

      chai.expect(otic.clips.length).to.equal(1);

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should get an added audio track from the collection of tracks', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      otic.addAudio('track1', sound);

      const retrieved = otic.getAudio('track1');

      chai.expect(retrieved.name).to.equal('track1');

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should remove an added audio track from the collection of tracks', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      otic.addAudio('track1', sound);

      otic.removeAudio('track1');

      chai.expect(otic.clips.length).to.equal(0);

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should remove all added audio track from the collection of tracks', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      otic.addAudio('track1', sound);
      otic.addAudio('track2', sound);

      otic.removeAllAudio();

      chai.expect(otic.clips.length).to.equal(0);

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