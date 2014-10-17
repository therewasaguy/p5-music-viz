/*
  Toggle the source of the sound file between a sound file and audio input (mic).

  By default, the Amplitude measures the output of all sound in the sketch.
  But the mic doesn't send sound out by default because that would create feedback.
  So, when we change the source to a mic in the toggleInput() function below,
  we need to reset the input of the Amplitude object.
 */

var mic;
var soundfile;

var amplitude;

function preload() {
  soundfile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  soundfile.play();

  mic = new p5.AudioIn();

  // create a p5.Amplitude object. This will listen to all output and measure the level
  amplitude = new p5.Amplitude();  
  // // amplitude options:  
  // amplitude.noramlize = true;
  // amplitude.smooth(0.98);

  c = createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0);

  var level = amplitude.getLevel();

  fill(255);
  ellipse(width/2, height/2, level*500, level*500);
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

// toggle input and change which source is feeding the Amplitude
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