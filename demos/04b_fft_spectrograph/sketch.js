var mic, osc, soundFile;
var currentSource = 'Broke For Free - As Colorful As Ever';

var fft;
var binCount = 1024;
var bins = new Array(binCount);

var speed = 5;
var cnv;

function preload() {
  soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  noStroke();
  makeDropZone(cnv, soundFile)

  // Hue Saturation Brightness
  colorMode(HSB);

  soundFile.play();
  mic = new p5.AudioIn();
  osc = new p5.Oscillator();
  osc.amp(0.5);

  var smoothing = 0.6;
  fft = new p5.FFT(smoothing, binCount);
  for (var i = 0; i <= binCount; i++) {
    bins[i] = new Bin(i, binCount);
  }
}

function draw() {
  // background(0);

  var spectrum = fft.analyze();

  // copy the sketch and move it over based on the speed
  copy(cnv, 0, 0, width, height, -speed, 0, width, height);

   // iterate thru current freq spectrum
  for (var i = 0; i < spectrum.length; i++) {
    var value;
    if (logView) {
      logIndex = logScale(i, spectrum.length);
      value = spectrum[logIndex];
    } else {
      value = spectrum[i];
    }
    var c = value;
    fill(c, 255, c);
    var percent = i / spectrum.length;
    var y = percent * height;
    rect(width - speed, height - y, speed, height / spectrum.length);
  }

}




function labelStuff() {
  fill(255);
  textSize(18);
  text('~'+selectedBin.freq + 'Hz (bin #' + selectedBin.index+')', mouseX, mouseY );
  text('Energy: ' + selectedBin.value, mouseX, mouseY + 20);

  if (soundFile.isPlaying()) {
    text('Current Time: ' + soundFile.currentTime().toFixed(3), width/2, 20);
  }

  text('Current Source: ' + currentSource, width/2, 40);
  textSize(14);
  text('Press T to toggle source', width/2, 60);
  text('Logarithmic view: ' + logView +' (L to toggle)', width/2, 80);
}

/**
 *  uses dragfile.js to make the entire canvas a "dropzone"
 *  for dragin'n'dropin' audio files
 */
function makeDropZone(c, soundFile) {
  var dropZone = new AudioDropZone(c);
  dropZone.onTransfer = function(buf) {
    soundFile.buffer = buf;
    soundFile.stop();
    soundFile.play();
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// in p5, keyPressed is not case sensitive, but keyTyped is
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
  if (key == 'L') {
    toggleScale();
  }
}

var inputMode = 0;
function toggleInput() {
  inputMode += 1;
  inputMode = inputMode % 6;
  switch (inputMode) {
    case 0: // soundFile mode
      soundFile.play();
      osc.stop();
      fft.setInput(soundFile);
      currentSource = soundFile.url.split('/').pop();
      break;
    case 1: // mic mode
      mic.start();
      soundFile.pause();
      fft.setInput(mic);
      currentSource = 'Mic';
      break;
    case 2: // sine mode
      osc.setType('sine');
      osc.start();
      soundFile.pause();
      mic.stop();
      fft.setInput(osc);
      currentSource = 'Sine Wave';
      break;
    case 3: // square mode
      osc.setType('triangle');
      currentSource = 'Triangle Wave';
      break;
    case 4: // square mode
      osc.setType('square');
      currentSource = 'Square Wave';
      break;
    case 5: // square mode
      osc.setType('sawtooth');
      currentSource = 'Sawtooth Wave';
      break;
  }
}

var logView = true;
function toggleScale() {
  logView = !logView;
}

function mouseMoved() {
  if (soundFile.isLoaded()) {
    for (var i = 0; i < bins.length; i++) {
      if ( (bins[i].x + bins[i].width) <= mouseX && mouseX <= bins[i].x) {
        bins[i].isTouching = true;
      }
      else {
        bins[i].isTouching = false;
      }
    }
  }
  osc.freq(map(mouseX, 0, width, 20, 400));
}

// ==========
// Bin Class
// ==========

var Bin = function(index, totalBins) {
  // maybe redundant
  this.index = index;
  this.totalBins = totalBins;
  this.color = color( map(this.index, 0, this.totalBins, 0, 255), 255, 255 );

  this.isTouching = false;
  this.x;
  this.width;
  this.value;
}

Bin.prototype.drawLog = function(i, totalBins, value, prev) {
  this.x = map(Math.log(i+2), 0, Math.log(totalBins), 0, width - 200);
  var h = map(value, 0, 255, height, 0)- height;
  this.width = prev - this.x;
  this.value = value;
  this.draw(h);
  return this.x;
}

Bin.prototype.drawLin = function(i, totalBins, value) {
  this.x = map(i, 0, totalBins, 0, width - 200);
  this.width = -width/totalBins;
  this.value = value;
  var h = map(value, 0, 255, height, 0)- height;
  this.draw(h);
}

var selectedBin;

Bin.prototype.draw = function(h) {
  if (this.isTouching) {
    selectedBin = bins[this.index];
    this.freq = Math.round( this.index * 22050 / this.totalBins );
    fill(100)
  } else {
    fill( this.color);
  }
  rect(this.x, height, this.width, h );
}



// helper functions via
// https://github.com/borismus/spectrograph/blob/master/g-spectrograph.js
// MIT license

/**
 * Given an index and the total number of entries, return the
 * log-scaled value.
 */
function logScale(index, total, opt_base) {
  var base = opt_base || 2;
  var logmax = logBase(total + 1, base);
  var exp = logmax * index / total;
  return Math.round(Math.pow(base, exp) - 1);
}

function logBase(val, base) {
  return Math.log(val) / Math.log(base);
}
