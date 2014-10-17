/*
  getLevel() from the p5.Amplitude object and map it to the ellipse size
 */

var sound;

var amplitude;

function preload() {
  sound = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  sound.play();

  // create a p5.Amplitude object. This will listen to all output and measure the level
  amplitude = new p5.Amplitude();
  
  // // amplitude options:  
  // amplitude.noramlize = true;
  // amplitude.smooth(0.98);

  // full screen!
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