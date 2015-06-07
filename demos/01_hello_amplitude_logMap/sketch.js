/*
 * Scale values logarithmically
 * using logMap from helper.js
 */

var mic, soundFile;
var amplitude;
var mapMax = 1.0;

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
  text('mapMax: ' + mapMax, 20, 40);

  // map ellipse height
  var ellipseHeight = logMap(level, 0, mapMax, 0, 1);
  console.log(ellipseHeight);
  ellipse(width/2, ellipseHeight, 100, 100);
}