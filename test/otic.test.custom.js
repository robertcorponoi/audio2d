// import 'https://unpkg.com/audioworklet-polyfill/dist/audioworklet-polyfill.js';
'use strict'

import Otic from '../otic.js';
import MuskOx from '../node_modules/musk-ox/muskox.js';

const otic = new Otic();
const muskOx = new MuskOx({ audioContext: otic._ctx });

muskOx.onComplete.add(() => {
  const sound = muskOx.fetch.audioBuffer('sna');

  const track1 = otic.addAudio('sna', sound);

  track1.addBiquadFilter();

  track1.loop = true;
  track1.play();
});

muskOx.audioBuffer('sna', './assets/sna.m4a');

muskOx.start();


// // Create AudioContext and buffer source
// var audioCtx = new AudioContext();
// var source = audioCtx.createBufferSource();
// var request;
// var myBuffer;
// // Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
// var scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
// scriptNode.bits = 8;
// scriptNode.normfreq = 0.1;
// console.log(scriptNode.bufferSize);

// var step = Math.pow(1 / 2, scriptNode.bits);
// var phaser = 0;
// var last = 0;

// // load in an audio track via XHR and decodeAudioData

// function getData() {
//   request = new XMLHttpRequest();
//   request.open('GET', './assets/times.m4a', true);
//   request.responseType = 'arraybuffer';
//   request.onload = function () {
//     var audioData = request.response;

//     audioCtx.decodeAudioData(audioData, function (buffer) {
//       myBuffer = buffer;
//       source.buffer = myBuffer;
//     },
//       function (e) { "Error with decoding audio data" + e.err });
//   }
//   request.send();
// }

// // Give the node a function to process audio events
// scriptNode.onaudioprocess = function (audioProcessingEvent) {
//   // The input buffer is the song we loaded earlier
//   var input = audioProcessingEvent.inputBuffer.getChannelData(0);
//   var output = audioProcessingEvent.outputBuffer.getChannelData(0);
//   for (var i = 0; i < scriptNode.bufferSize; i++) {
//     phaser += scriptNode.normfreq;
//     if (phaser >= 1.0) {
//       phaser -= 1.0;
//       last = step * Math.floor(input[i] / step + 0.5);
//     }
//     output[i] = last;
//   }
// }

// getData();

// // wire up play button
// document.body.onclick = function () {
//   source.connect(scriptNode);
//   scriptNode.connect(audioCtx.destination);
//   source.start();
// }

// // When the buffer source stops playing, disconnect everything
// source.onended = function () {
//   source.disconnect(scriptNode);
//   scriptNode.disconnect(audioCtx.destination);
// }