'use strict'

import Audio2D from '../audio2d.js';
import MuskOx from '../node_modules/musk-ox/muskox.js';

let a2d;
let muskOx;

mocha.setup({ globals: '__VUE_DEVTOOLS_TOAST__' });

beforeEach(() => {
  a2d = new Audio2D();
  muskOx = new MuskOx({ audioContext: a2d._ctx });
});

afterEach(() => {
  a2d = null;
  muskOx = null;
});

describe('Getting and Setting Properties', () => {
  it('should get the name of the clip', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      chai.expect(track1.name).to.equal('track1');

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should get the initial state of the clip', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      chai.expect(track1.state).to.equal('STOPPED');

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should get the number of times a clip was played', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.play();
      track1.mute();

      setTimeout(() => {
        track1.play();

        chai.expect(track1.timesPlayed).to.equal(2);

        done();
      }, 3000);
    })

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  }).timeout(50000);

  it('should get the duration of the clip', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      chai.expect(track1.duration).to.equal(5.7585625);

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should change the playback volume', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.volume = 50;

      chai.expect(track1._gain.gain.value).to.equal(0.5);

      track1.mute();

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });
});

describe('Managing Audio Clips', () => {
  it('should add an audio clip to the collection of clips', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      a2d.addAudio('track1', sound);

      chai.expect(a2d.clips.length).to.equal(1);

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should get an added audio clip from the collection of clips', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      a2d.addAudio('track1', sound);

      const retrieved = a2d.getAudio('track1');

      chai.expect(retrieved.name).to.equal('track1');

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should remove an added audio clip from the collection of clips', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      a2d.addAudio('track1', sound);

      a2d.removeAudio('track1');

      chai.expect(a2d.clips.length).to.equal(0);

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should remove all added audio clip from the collection of clips', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      a2d.addAudio('track1', sound);
      a2d.addAudio('track2', sound);

      a2d.removeAllAudio();

      chai.expect(a2d.clips.length).to.equal(0);

      done();
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });
});

describe('Adding Nodes to Clips', () => {
  it('should add a biquadFilter node to the clip', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.addNode(a2d.nodes.biquadFilter());

      chai.expect(track1.nodes.biquadFilter instanceof BiquadFilterNode).to.be.true;

      done();

    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should add a biquadFilter node and a gain node to the clip', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.addNode(a2d.nodes.biquadFilter());
      track1.addNode(a2d.nodes.gain());

      chai.expect(track1.nodes.biquadFilter instanceof BiquadFilterNode).to.be.true;

      chai.expect(track1.nodes.gain instanceof GainNode).to.be.true;

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

      const track1 = a2d.addAudio('track1', sound, { markers });

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

      const track1 = a2d.addAudio('track1', sound, { markers });

      track1.play('test');

      setTimeout(() => {
        chai.expect(track1.state).to.equal('STOPPED');

        done();
      }, 1000);

      chai.expect(a2d.clips.length).to.equal(1);

    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  // it('should play from a marker', done => {
  //   muskOx.onComplete.add(() => {
  //     const sound = muskOx.fetch.audioBuffer('sound');

  //     const markers = [{ name: 'test', start: 1500, duration: 1500 }];

  //     const track1 = a2d.addAudio('track1', sound, { markers });

  //     track1.play('test');

  //     setTimeout(() => {
  //       console.log(track1.currentTime);
  //       chai.expect(track1.state).to.equal('STOPPED');

  //       done();
  //     }, 1000);

  //     chai.expect(a2d.clips.length).to.equal(1);

  //   });

  //   muskOx.audioBuffer('sound', './assets/123.m4a');

  //   muskOx.start();
  // });
});

describe('Pausing/Stopping Audio Clips', () => {
  it('should set the state to PAUSED when the clip is paused', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const markers = [{ name: 'test', start: 0, duration: 500 }];

      const track1 = a2d.addAudio('track1', sound, { markers });

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

      const track1 = a2d.addAudio('track1', sound);

      track1.play();
      track1.mute();

      setTimeout(() => {
        track1.pause();

        chai.expect(track1._timePausedAt).to.be.greaterThan(0.9);

        chai.expect(track1._timePausedAt).to.be.lessThan(1.1);

        done();
      }, 1000);
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should set the state to PLAYING when the clip has been resumed from a paused state', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.play();
      track1.mute();

      setTimeout(() => {
        track1.pause();

        setTimeout(() => {
          track1.resume();

          chai.expect(track1._state).to.equal('PLAYING');

          done();
        }, 500);
      }, 2000);
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  }).timeout(3000);
});

describe('Seeking', () => {
  it('should seek to 14000ms after playing for 1000ms', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.play();
      track1.mute();

      setTimeout(() => {
        track1.seek(14000);

        chai.expect(track1._options.ctx.currentTime + 12000).to.be.greaterThan(12000);
        chai.expect(track1._options.ctx.currentTime + 12000).to.be.lessThan(12200);

        done();
      }, 1000);
    });

    muskOx.audioBuffer('sound', './assets/sna.m4a');

    muskOx.start();
  }).timeout(3000);
});

describe('Muting and Unmuting Clips', () => {
  it('should mute a clip', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.play();

      setTimeout(() => {
        track1.mute();

        chai.expect(track1._gain.gain.value).to.equal(0);

        done();
      }, 500);
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should unmute a clip after being muted', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.play();

      setTimeout(() => {
        track1.mute();

        setTimeout(() => {
          track1.unmute();

          chai.expect(track1._gain.gain.value).to.equal(1);

          track1.mute();

          done();
        }, 500);
      }, 500);
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });

  it('should unmute a clip with the same volume level as before it was muted', done => {
    muskOx.onComplete.add(() => {
      const sound = muskOx.fetch.audioBuffer('sound');

      const track1 = a2d.addAudio('track1', sound);

      track1.play();
      track1.volume = 34;

      setTimeout(() => {
        track1.mute();

        setTimeout(() => {
          track1.unmute();

          chai.expect(track1._gain.gain.value).to.be.greaterThan(0.34);

          chai.expect(track1._gain.gain.value).to.be.lessThan(0.341);

          track1.mute();

          done();
        }, 500);
      }, 500);
    });

    muskOx.audioBuffer('sound', './assets/123.m4a');

    muskOx.start();
  });
});