/*
  Analyze the frequency spectrum with FFT.
  Particles represent bins of the FFT frequency spectrum. 
 */

var mic, soundfile; // input sources

var fft;
var smoothing = 0.8;
var binCount = 1024;

var particles =  new Array(binCount);

function preload() {
  soundfile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  soundfile.play();
  mic = new p5.AudioIn();

  // FFT
  var smoothing = 0.8; // play with this number, between 0 and 0.99
  fft = new p5.FFT(smoothing, binCount);

  // instantiate the particles.
  for (var i = 0; i < particles.length; i++) {
    var pos = createVector(
      // x position corresponds with its position in the frequency spectrum
      map(i, 0, 1023, 0, width),
      random(0, height)
    );
    particles[i] = new Particle(pos);
  }
}

function draw() {
  background(0, 0, 0, 100);

  var spectrum = fft.analyze();

  // update and draw all 1024 particles!
  // Each particle gets a level that corresponds to
  // the level at one bin of the FFT spectrum. 
  // This level is like amplitude, but usually called "energy."
  // It will be a number between 0-255.
  for (var i = 0; i < particles.length; i++) {
    var thisLevel = map(spectrum[i], 0, 255, 0, 1);
    particles[i].update( thisLevel );
    particles[i].draw();
  }

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
}

// To prevent feedback, mic doesnt send its output.
// So we need to tell fft to listen to the mic, and then switch back.
function toggleInput() {
  if (soundfile.isPlaying() ) {
    soundfile.pause();
    mic.start();
    fft.setInput(mic);
  } else {
    soundfile.play();
    mic.stop();
    fft.setInput(soundfile);
  }
}


// ===============
// Particle class
// ===============

var Particle = function(position) {
  this.position = position;
  this.scale = random(0, 5);
  this.speed = random(0, 10);
  this.color = [random(0, 255), random(0,255), random(0,255)];
}

// use FFT bin level to change speed and diameter
Particle.prototype.update = function(someLevel) {
  this.position.y += this.speed / (someLevel*2);
  if (this.position.y > height) {
    this.position.y = 0;
  }
  this.diameter = map(someLevel, 0, 1, 0, 100) * this.scale;
}

Particle.prototype.draw = function() {
  fill(this.color);
  ellipse(
    this.position.x, this.position.y,
    this.diameter, this.diameter
  );
}