var source, fft;
var divisions = 5;
var cnv;
var speed = 1;

function setup() {
  background(220, 220, 220);

  cnv = createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(0,100);
  source = new p5.AudioIn();
  source.start();

  fft = new p5.FFT(0.9, 2048);
  fft.setInput(source);
}

function draw() {
  var h = height/divisions;
  var spectrum = fft.analyze();
  var newBuffer = [];

  var scaledSpectrum = splitOctaves(spectrum, 12);
  var len = scaledSpectrum.length;

  background(200, 200, 200, 1);
  // copy before clearing the background
  copy(cnv,0,0,width,height,0,speed,width,height);

  // draw shape
  beginShape();

    // one at the far corner
    curveVertex(0, h);

    for (var i = 0; i < len; i++) {
      var point = smoothPoint(scaledSpectrum, i);
      var x = map(i, 0, len-1, 0, width);
      var y = map(point, 0, 255, h, 0);
      curveVertex(x, y);
    }

    // one last point at the end
    curveVertex(width, h);

  endShape();
}


/**
 *  Divides an fft array into octaves with each
 *  divided by three, or by a specified "slicesPerOctave".
 *
 *  @method splitOctaves
 *  @param {Array} spectrum Array of fft.analyze() values
 *  @param {Number} [slicesPerOctave] defaults to thirds
 *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
 *                                 of octaves
 */
function splitOctaves(spectrum, slicesPerOctave) {
  var scaledSpectrum = [];
  var len = spectrum.length;
  var sRate = sampleRate();
  var nyquist = sRate/2;

  // default to thirds
  var n = slicesPerOctave|| 3;
  var nthRootOfTwo = Math.pow(2, 1/n);

  // the last N bins get their own 
  var lowestBin = slicesPerOctave;

  var binIndex = len - 1;
  var i = binIndex;

  while (i > lowestBin) {
    var nextBinIndex = round( binIndex/nthRootOfTwo );

    if (nextBinIndex === 1) return;

    var total = 0;
    var numBins = 0;

    // add up all of the values for the frequencies
    for (i = binIndex; i > nextBinIndex; i--) {
      total += spectrum[i];
      numBins++;
    }

    // divide total sum by number of bins
    var energy = total/numBins;
    scaledSpectrum.push(energy);

    // keep the loop going
    binIndex = nextBinIndex;
  }

  scaledSpectrum.reverse();

  // add the lowest bins at the end
  for (var j = 0; j < i; j++) {
    scaledSpectrum.push(spectrum[j]);
  }

  return scaledSpectrum;
}


// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {

  // default to 4 neighbors
  var neighbors = numberOfNeighbors || 4;
  var len = spectrum.length;

  var val = 0;

  for (var i = index; i < (index+neighbors) && i < len; i++) {
    val += spectrum[i];
  }

  val = val/neighbors

  return val;
}