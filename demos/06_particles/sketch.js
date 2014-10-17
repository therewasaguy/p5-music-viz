var mic, soundfile, amplitude;

var particles = [];


function preload() {
  soundfile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  soundfile.play();
  mic = new p5.AudioIn();
  amplitude = new p5.Amplitude();

  mousePressed(); // make one particle to start...
}

function draw() {
  background(0, 0, 0, 100);

  // global variable
  var level = amplitude.getLevel();
  for (var i = 0; i < particles.length; i++) {
    particles[i].update(level);
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
    amplitude.setInput(mic);
  } else {
    soundfile.play();
    mic.stop();
    amplitude.setInput(soundfile);
  }
}

function mousePressed() {
  var pos = createVector(mouseX, mouseY);
  var particle = new Particle(pos, random(0,5));
  particles.push(particle);
}

// ===============
// Particle class
// ===============

var Particle = function(position, scale) {
  this.position = position;
  this.scale = scale;
  this.speed = random(0, 10);
  this.color = [random(0,255), random(0,255), random(0,255)];
}

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