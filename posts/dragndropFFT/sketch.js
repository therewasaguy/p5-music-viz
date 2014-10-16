var mic, osc, soundfile;
var currentSource = 'soundfile';

var fft;
var binCount = 1024;
var bins = new Array(binCount);



function preload() {
  soundfile = loadSound('../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  // Hue Saturation Brightness
  colorMode(HSB);

  soundfile.play();
  mic = new p5.AudioIn();
  osc = new p5.Oscillator();
  osc.amp(0.5);

  var smoothing = 0.1;
  fft = new p5.FFT(smoothing, binCount);
  for (var i = 0; i <= binCount; i++) {
    bins[i] = new Bin(i, binCount);
  }
}

function draw() {
  background(0);

  var spectrum = fft.analyze();

  if (logView) {
    var prevPoint = 0;
    for (var i = 0; i < spectrum.length; i++) {
      var previousValue = prevPoint;
      prevPoint = bins[i].drawLog(i, spectrum.length, spectrum[i], previousValue);
    }
  }
  else {
    for (var i = 0; i < spectrum.length; i++) {
      bins[i].drawLin(i, spectrum.length, spectrum[i]);
    }
  }

  labelStuff();

  osc.freq(selectedBin.freq);
}

function labelStuff() {
  fill(255);
  textSize(18);
  text('~'+selectedBin.freq + 'Hz (bin #' + selectedBin.index+')', mouseX, mouseY );
  text('Energy: ' + selectedBin.value, mouseX, mouseY + 20);

  if (soundfile.isPlaying()) {
    text('Current Time: ' + soundfile.currentTime().toFixed(3), width-300, 40);
  }

  text('Current Source: ' + currentSource, width-300, 20);
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

function mousePressed() {
  osc.setType('square');
}

var inputMode = 0;
function toggleInput() {
  inputMode += 1;
  inputMode = inputMode % 6;
  switch (inputMode) {
    case 0: // soundfile mode
      soundfile.play();
      osc.stop();
      fft.setInput(soundfile);
      currentSource = 'soundfile';
      break;
    case 1: // mic mode
      mic.start();
      soundfile.pause();
      fft.setInput(mic);
      currentSource = 'mic';
      break;
    case 2: // sine mode
      osc.setType('sine');
      osc.start();
      soundfile.pause();
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
  console.log(inputMode);
}

var logView = true;
function toggleScale() {
  logView = !logView;
  console.log('logView');
}

function mouseMoved() {
  for (var i = 0; i < bins.length; i++) {
    if ( (bins[i].x + bins[i].width) <= mouseX && mouseX <= bins[i].x) {
      bins[i].isTouching = true;
    }
    else {
      bins[i].isTouching = false;
    }
  }
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
