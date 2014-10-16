var mic, soundfile; // input sources

var amplitude;

var fft;

var particles = [];

function preload() {
  soundfile = loadSound('../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  soundfile.jump(24);
  soundfile.play();
  mic = new p5.AudioIn();

  amplitude = new p5.Amplitude();

  var smoothing = 0.8;
  var binCount = 1024;
  fft = new p5.FFT(smoothing, binCount);


  // make three shapes that listen to different frequencies
  var bass = new Particle(40, 60);
  var snare = new Particle(150, 155);
  var click = new Particle(3700);
  particles.push(bass);
  particles.push(snare);
  particles.push(click);
}

function draw() {
  background(0, 0, 0, 100);

  var spectrum = fft.analyze();

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
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

var Particle = function(freqs) {
  this.position = createVector( random(0, width), height/2 );
  this.scale = random(0, 1);
  this.speed = random(0, 10);
  this.color = color( random(0,255), random(0,255), random(0,255) );
  this.freqs = freqs;
};

Particle.prototype.update = function() {
  var levelRaw = fft.getEnergy(this.freqs);
  var levelMapped = map(levelRaw, 0, 255, 0, 1);
  this.diameter = map(levelMapped, 0, 1, 0, 100) * this.scale;
};

Particle.prototype.draw = function() {
  fill(this.color);
  ellipse(
    this.position.x, this.position.y,
    this.diameter, this.diameter
  );
};