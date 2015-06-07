/**
 *  Draw a buffer of audio samples. Use the p5.FFT
 *  (Web Audio API Analyzer Node) as a fast way to
 *  get the time domain data, pre-fft.
 * 
 *  Press T to toggle input between soundFile, mic, and oscillator.
 *  Oscillator's frequency is mapped to mouse position.
 *
 *  This example includes drag & drop with p5.dom.
 */

var soundFile, mic, osc;

var analyzer;
var numSamples = 1024;

// Array of amplitude values (-1 to +1) over time.
var samples = [];
var currentSource = "mic";

function setup() {
  var cnv = createCanvas(numSamples, 500);
  noFill();
  stroke(240);

  // make canvas drag'n'dropablle with gotFile as the callback
  makeDragAndDrop(cnv, gotFile);

  analyzer = new p5.FFT(0, numSamples);

  // set up various inputs. We'll toggle them when key "T" is pressed.
  mic = new p5.AudioIn();
  osc = new p5.Oscillator();
  osc.amp(0.5);
  osc.freq(10);

  mic.start();
  analyzer.setInput(mic);

  // load the soundfile in setup, but we won't play it until user hits "T"
  soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
}

function draw() {
  background(30, 30, 30, 220);

  // get a buffer of 1024 samples over time.
  samples = analyzer.waveform();
  var bufLen = samples.length;

  // draw snapshot of the samples
  strokeWeight(4);
  beginShape();
  for (var i = 0; i < bufLen; i++){
    var x = map(i, 0, bufLen, 0, width);
    var y = map(samples[i], -1, 1, -height/2, height/2);
    vertex(x, y + height/2);
  }
  endShape();

  // map the oscillator frequency to mouse position
  var freq = map(mouseX, 0, windowWidth, 1, 440);
  osc.freq(freq, 0.01);
  var amp = map(mouseY, height, 0, 0, 1);
  osc.amp(amp, 0.01);

  labelStuff(freq, amp);
}


// draw text
function labelStuff(freq, amp) {
  strokeWeight(1);
  text('Press T to toggle source', 20, 20);
  text('Source: '+ currentSource, 20, 40);

  // if currentSource is an oscillator:
  if (currentSource === 'sine' || currentSource == 'triangle' || currentSource == 'square' || currentSource == 'sawtooth') {
    text('Frequency: ' + freq, 20, 60);
    text('Amplitude: ' + amp, 20, 80);
  }
}

// ==================
// Handle Drag & Drop
// ==================

function makeDragAndDrop(canvas, callback) {
  var domEl = getElement(canvas.elt.id);
  domEl.drop(callback);
}

function gotFile(file) {
  soundFile.dispose();
  soundFile = loadSound(file, function() {
    toggleInput(0);
  });
}



// ============
// toggle input
// ============

function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
}


// start with mic as input
var inputMode = 1;

function toggleInput(mode) {
  if (typeof(mode) === 'number') {
    inputMode = mode;
  } else {
    inputMode += 1;
    inputMode = inputMode % 6;
  }
  switch (inputMode) {
    case 0: // soundFile mode
      soundFile.play();
      osc.stop();
      mic.stop();
      analyzer.setInput(soundFile);
      currentSource = 'soundFile';
      break;
    case 1: // mic mode
      mic.start();
      soundFile.pause();
      analyzer.setInput(mic);
      currentSource = 'mic';
      break;
    case 2: // sine mode
      osc.setType('sine');
      osc.start();
      soundFile.pause();
      mic.stop();
      analyzer.setInput(osc);
      currentSource = 'sine';
      break;
    case 3: // square mode
      osc.setType('triangle');
      currentSource = 'triangle';
      break;
    case 4: // square mode
      osc.setType('square');
      currentSource = 'square';
      break;
    case 5: // square mode
      osc.setType('sawtooth');
      currentSource = 'sawtooth';
      break;
  }
}

