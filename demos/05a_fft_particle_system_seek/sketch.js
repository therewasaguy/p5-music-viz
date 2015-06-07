/**
 *  Every FFT Bin is a Bird in our particle system.
 *  
 *  Each Bird has an angle, from from zero to TWO_PI.
 *  
 *  In the draw loop, each bird reacts to energy in that part of the frequency spectrum.
 *  
 *  Inspired by
 *   - Dan Shiffman http://natureofcode.com/book/chapter-6-autonomous-agents/
 *   - Zhenzhen Qi http://zhenzhenqi.info/COMP104demo/contact.html
 */

var mic, fft, audioEl;

var smoothing = 0;
var binCount = 256;

var birds = [];
var birdCount = binCount;

var currentInput;

function setup() {

  //create full width and full height p5 canvas
  var myCanvas = createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 255);
  noStroke();

  for (var i = 0; i < birdCount; i++) {
    var newBird = new Bird(i);
    birds.push( newBird );
  }

  // setup mic
  mic = new p5.AudioIn();
  mic.start();

  audioEl = createAudio('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
  currentInput = mic;

  // initialize the FFT, plug in our variables for smoothing and binCount
  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(mic);
}


function draw() {
  background(0, 0, 20, 20);

  // translate all x / y coordinates to the center of the screen
  translate(width/2, height/2);


  var spectrum = fft.analyze(binCount);
  var center = createVector(windowWidth/2, windowHeight/2);

  for (var i = 0; i < birdCount; i++) {
    var fftAmp = spectrum[i];
    birds[i].seek(fftAmp);
    birds[i].update();
    birds[i].display();
  }

  labelStuff();
}


// ===========
// Bird Class
// ===========

function Bird(index) {
  this.index = index;
  this.location = createVector(0, 0);

  var angle = map(index, 0, birdCount, 0, TWO_PI);
  this.angle = p5.Vector.fromAngle(angle);

  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector(0, 0);

  this.maxforce = random(0.01, 0.1);
  this.maxspeed = random(1, 3);

  this.r = 5; //radius of the "bird"
}

Bird.prototype.seek = function(fftAmp) {
  // bird seeks angle by fftAmp
  var newTarget = createVector(this.angle.x, this.angle.y);
  newTarget.mult(fftAmp);

  var desired = p5.Vector.sub(newTarget, this.location);

  //normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);

  // Steering = Desired minus velocity (just remember this magic formule..)
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); //don't turn too fast, otherwise we lost the steering animation

  //apply the force, we got the acceleration!
  this.acceleration.add(steer);
};

Bird.prototype.update = function() {

  //update velocity
  this.velocity.add(this.acceleration);

  //limit speed
  this.velocity.limit(this.maxspeed);
  this.location.add(this.velocity);

  //reset acceleration to 0 each cycle. 
  this.acceleration.mult(0);

  this.checkEdges();
};

Bird.prototype.display = function() {
  fill(this.index, 255, 255);
  ellipse(this.location.x, this.location.y, this.r, this.r);
};


// prevent birds from flying off screen
Bird.prototype.checkEdges = function() {
  var x = this.location.x;
  var y = this.location.y;

  if (x > width || x < 0 || y > height || y < 0) {
    x = width/2;
    y = height/2;
  }

};

// =======
// Helpers
// =======

function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
}

function toggleInput() {
  if (currentInput === mic) {
    mic.stop();
    audioEl.play();
    currentInput = audioEl;
  } else {
    audioEl.stop();
    mic.start();
    currentInput = mic;
  }
  fft.setInput(currentInput);
}

function labelStuff() {
  var inputName = currentInput === mic ? "mic" : "soundfile";
  text('Current Input: ' + inputName, -width/2 + 20, -height/2 + 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}