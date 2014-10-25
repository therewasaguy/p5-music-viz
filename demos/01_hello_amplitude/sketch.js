/*
  getLevel() from the p5.Amplitude object and map it to the ellipse position.

  Press "T" to toggle between a sound file and audio input (mic).
 */

var mic, soundFile;

var amplitude;

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  noStroke();

  mic = new p5.AudioIn();
  mic.start();

  // load the sound, but don't play it yet
  soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  // amplitude.smooth(0.8); // <-- try this!
}

function draw() {
  background(0);

  var level = amplitude.getLevel();

  text('Amplitude: ' + level, 20, 20);
  var ellipseHeight = map(level, 0, 0.5, height, 0);
  ellipse(width/2, ellipseHeight, 100, 100);
}



// ================
// Helper Functions
// ================

// resize canvas on windowResized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// T stands for toggleInput().
// note: in p5, keyPressed is not case sensitive. keyTyped is
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
}

/*
  Toggle input and change which
  source is feeding the p5.Amplitude.
 */
function toggleInput() {
  if (soundFile.isPlaying() ) {
    soundFile.pause();
    mic.start();
    amplitude.setInput(mic);
  } else {
    soundFile.play();
    mic.stop();
    amplitude.setInput(soundFile);
  }
}