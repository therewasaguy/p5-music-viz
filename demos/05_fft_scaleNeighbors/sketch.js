/**
 *  Scale each FFT value by its neighbors
 */

var source, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  source = new p5.AudioIn();
  source.start();

  fft = new p5.FFT(0, 2048);
  fft.setInput(source);
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  var newBuffer = [];

  var quarterSpectrum = spectrum.length/2;

  beginShape();
  for (var i = 0; i < quarterSpectrum; i++) {
    var point = smoothPoint(spectrum, i, 8);
    newBuffer.push(point);
    var x = map(i, 0, quarterSpectrum, 0, width);
    var y = map(point, 0, 255, height, 0);
    curveVertex(x, y);
  }
  endShape();
}



// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {

  // default to 2 neighbors on either side
  var neighbors = numberOfNeighbors || 2;
  var len = spectrum.length;

  var val = 0;

  // start below the index
  var indexMinusNeighbors = index - neighbors;
  var smoothedPoints = 0;

  for (var i = indexMinusNeighbors; i < (index+neighbors) && i < len; i++) {
    // if there is a point at spectrum[i], tally it
    if (typeof(spectrum[i]) !== 'undefined') {
      val += spectrum[i];
      smoothedPoints++;
    }
  }

  val = val/smoothedPoints;

  return val;
}