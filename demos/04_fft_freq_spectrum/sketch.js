var mic, osc, soundFile;
var currentSource = 'Broke For Free - As Colorful As Ever';

var fft;
var binCount = 1024;
var bins = new Array(binCount);


function preload() {
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB);

  // make canvas drag'n'dropablle with gotFile as the callback
  makeDragAndDrop(cnv, gotFile);

  soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
  mic = new p5.AudioIn();
  osc = new p5.Oscillator();
  osc.amp(0.5);

  var smoothing = 0.6;
  fft = new p5.FFT(smoothing, binCount);

  for (var i = 0; i < binCount; i++) {
    bins[i] = new Bin(i, binCount);
  }

  toggleInput(1);
}

function draw() {
  background(0);

  var spectrum = fft.analyze();

  if (logView) {
    var prevPoint = 0;
    for (var i = 0; i < binCount; i++) {
      var previousValue = prevPoint;
      prevPoint = bins[i].drawLog(i, binCount, spectrum[i], previousValue);
    }
  }
  else {
    for (var i = 0; i < binCount; i++) {
      bins[i].drawLin(i, binCount, spectrum[i]);
    }
  }

  if (typeof selectedBin !== 'undefined') {
    labelStuff();
    osc.freq(selectedBin.freq);
  }
}




// draw text
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
  text('Drag a soundfile here to play it', width/2, 100);

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
// Window Resize
// ============
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// ============
// toggle input
// ============

// in p5, keyPressed is not case sensitive, but keyTyped is
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
  if (key == 'L') {
    console.log('l');
    toggleScale();
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
