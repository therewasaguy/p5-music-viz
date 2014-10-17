var mic, soundfile; // input sources

var amplitude;

var fft;
var binCount = 1024; // bins of analysis

var particles =  new Array(binCount);

function preload() {
  soundfile = loadSound('../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  soundfile.play();
  mic = new p5.AudioIn();

  amplitude = new p5.Amplitude();

  var smoothing = 0.8;
  fft = new p5.FFT(smoothing, binCount);

  // instantiate the particles
  for (var i = 0; i < particles.length; i++) {
    var pos = createVector(
      map(i, 0, 1023, 0, width),
      random(0, height)
    );
    particles[i] = new Particle(pos, random(0, 5), i, particles.length);
  }
}

function draw() {
  background(0, 0, 0, 100);

  var spectrum = fft.analyze();

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

function toggleInput() {
  if (soundfile.isPlaying() ) {
    soundfile.pause();
    mic.start();
    fft.setInput(mic);
    amplitude.setInput(mic);
  } else {
    soundfile.play();
    mic.stop();
    fft.setInput(soundfile);
    amplitude.setInput(soundfile);
  }
}


// ===============
// Particle class
// ===============

var Particle = function(position, scale, index, totalBins) {
  this.position = position;
  this.scale = scale;
  this.speed = random(0, 10);
  // var mappedColor =  map(index, 0, totalBins, 0, 255);
  this.color = [random(0, 255), random(0,255), random(0,255)];
}

Particle.prototype.update = function(someLevel, index, totalBins) {
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