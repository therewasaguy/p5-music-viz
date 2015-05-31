var source, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  source = new p5.AudioIn();
  source.start();

  fft = new p5.FFT(0.8, 2048);
  fft.setInput(source);
}

function draw() {
  background(220, 220, 220, 20);
  var spectrum = fft.analyze();
  var newBuffer = [];

  var scaledSpectrum = splitOctaves(spectrum, 3);
  var len = scaledSpectrum.length;

  // draw shape
  beginShape();

    // one at the far corner
    curveVertex(0, height);

    for (var i = 0; i < len; i++) {
      var point = smoothPoint(scaledSpectrum, i);
      var x = map(i, 0, len-1, 0, width);
      var y = map(point, 0, 255, height, 0);
      curveVertex(x, y);
    }

    // one last point at the end
    curveVertex(width, height);

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
  var lowestBin = 3;

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