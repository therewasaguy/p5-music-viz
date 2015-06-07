/**
 *  Adapted from Daniel Shiffman
 *  learningprocessing.com
 *
 *  When level exceeds a threshold, trigger some action.
 *
 *  Then, increase the overall threshold by adding an additional cutoff value.
 *
 *  The cutoff decays every frame by a decay rate, so a beat can
 *  be triggered again.
 *  
 */

var input;

var threshold = 0.1;
var cutoff = 0;
var decayRate = 0.95;

function setup() {
  createCanvas(710, 200);
  background(255);

  // Create an Audio input
  input = new p5.AudioIn();
  input.start();
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  var volume = input.getLevel();

  // If the volume > threshold + cutoff, a rect is drawn at a random location. 
  // The louder the volume, the larger the rectangle.
  if (volume > threshold + cutoff) {
    stroke(0);
    fill(0, 100);
    rect(random(40, width), random(height), volume*50, volume*50);

    // increase the cutoff
    cutoff = 0.5;
  }

  //
  cutoff = cutoff * decayRate;

  // Graph the overall potential volume, w/ a line at the threshold
  var y = map(volume, 0, 1, height, 0);
  var ythreshold = map(threshold + cutoff, 0, 1, height, 0);

  noStroke();
  fill(175);
  rect(0, 0, 20, height);

  // Then draw a rectangle on the graph, sized according to volume
  fill(0);
  rect(0, y, 20, y);
  stroke(0);
  line(0, ythreshold, 19, ythreshold);
}