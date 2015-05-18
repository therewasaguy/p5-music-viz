/**
 * DEMO: Draw the waveform of a sound as it plays using p5.FFT.waveform()
 * Press T to toggle input between soundFile, mic, and oscillator.
 * Oscillator's frequency is mapped to mouse position
 */

var soundFile, mic, osc;

var fft;
var fftBands = 1024;

// Array of amplitude values (0-255) over time.
var waveform = [];

function setup() {
  createCanvas(fftBands, 500);
  fill(255, 40, 255);
  stroke(240);
  strokeWeight(4);

  fft = new p5.FFT(0, fftBands);

  // set up other inputs we may use by toggling input
  mic = new p5.AudioIn();
  osc = new p5.Oscillator();
  osc.amp(0.5);
  osc.freq(10);


  mic.start();
  fft.setInput(mic);

  // load the soundfile in setup, but we won't play it until user hits 'T'
  soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
}

function draw() {
  background(30, 30, 30, 220);

  /** 
   * Analyze the sound as a waveform (amplitude over time)
   */
  waveform = fft.waveform();

  // draw snapshot of the waveform
  beginShape();
  for (var i = 0; i<waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], 0, 256, -height/2, height/2);
    vertex(x, y + height/2);
  }
  endShape();

  // map the oscillator frequency to mouse position
  var freq = map(mouseX, 0, windowWidth, 1, 440);
  osc.freq(freq);
}

// TOGGLE INPUT
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
}

// start with mic as input
var inputMode = 1;

function toggleInput() {
  inputMode += 1;
  inputMode = inputMode % 6;
  switch (inputMode) {
    case 0: // soundFile mode
      soundFile.play();
      osc.stop();
      fft.setInput(soundFile);
      currentSource = 'soundFile';
      break;
    case 1: // mic mode
      mic.start();
      soundFile.pause();
      fft.setInput(mic);
      currentSource = 'mic';
      break;
    case 2: // sine mode
      osc.setType('sine');
      osc.start();
      soundFile.pause();
      mic.stop();
      fft.setInput(osc);
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