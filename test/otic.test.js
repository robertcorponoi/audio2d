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
  it('should add an audio clip to the collection of clips', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      otic.addAudio('track1', sound);

      chai.expect(otic.clips.length).to.equal(1);

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should get an added audio clip from the collection of clips', done => {
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

  it('should remove an added audio clip from the collection of clips', done => {
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

  it('should remove all added audio clip from the collection of clips', done => {
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

describe('Playing Audio Clips', () => {
  it('should update the state to PLAYING when the clip is playing', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const markers = [{ name: 'test', start: 0, duration: 500 }];

      const track1 = otic.addAudio('track1', sound, { markers });

      track1.play('test');

      chai.expect(track1.state).to.equal('PLAYING');

      done();

    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should update the state to STOPPED when the clip is finished playing', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const markers = [{ name: 'test', start: 0, duration: 500 }];

      const track1 = otic.addAudio('track1', sound, { markers });

      track1.play('test');

      setTimeout(() => {
        chai.expect(track1.state).to.equal('STOPPED');

        done();
      }, 1000);

      chai.expect(otic.clips.length).to.equal(1);

    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });
});

describe('Pausing/Stopping Audio Clips', () => {
  it('should set the state to PAUSED when the clip is paused', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const markers = [{ name: 'test', start: 0, duration: 500 }];

      const track1 = otic.addAudio('track1', sound, { markers });

      track1.play('test');
      track1.pause();

      chai.expect(track1.state).to.equal('PAUSED');

      done();

    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should set the time that the clip was paused at', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = otic.addAudio('track1', sound);

      track1.play('test');
      
      setTimeout(() => {
        track1.pause();
        
        chai.expect(track1._timePausedAt).to.be.greaterThan(1);

        chai.expect(track1._timePausedAt).to.be.lessThan(1.5);

        done();
      }, 1000);
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