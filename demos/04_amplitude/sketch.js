/*
  getLevel() from the p5.Amplitude object and map it to the ellipse size
 */

var sound;

var amplitude;

function preload() {
  sound = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  background(0);

  sound.play();

  // create a p5.Amplitude object. This will listen to all output and measure the level
  amplitude = new p5.Amplitude();
  
  // amplitude options:  
  amplitude.normalize = true;
  amplitude.smooth(0.01);

}

function draw() {
  background(0);

  var level = amplitude.getLevel();

  fill(255);
  ellipse(width/2, height/2, level*500, level*500);
}

// helper methods
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}