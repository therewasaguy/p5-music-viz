// ================
// Helper Functions
// ================

// resize canvas on windowResized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// T stands for toggleInput().
// note: in p5, keyPressed is not case sensitive. keyTyped is.
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
}

// Toggle input and change which
// source is feeding the p5.Amplitude.
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

function logMap(val, inMin, inMax, outMin, outMax) {
  var offset = 0;
  if (inMax === 0 || inMin === 0) {
    offset = 1;
    inMin += offset;
    inMax += offset;
  }
  var a = (outMin - outMax) / Math.log10(inMin / inMax);
  var b = outMin - a * Math.log10(inMin);
  return a * Math.log10(val + offset) + b;
}

/**
 * Given an index and the total number of entries, return the
 * log-scaled value.
 * 
 * https://github.com/borismus/spectrograph/blob/master/g-spectrograph.js
 * MIT license
 */
function logScale(index, total, opt_base) {
  var base = opt_base || 2;
  var logmax = logBase(total + 1, base);
  var exp = logmax * index / total;
  return Math.round(Math.pow(base, exp) - 1);
}

function logBase(val, base) {
  return Math.log(val) / Math.log(base);
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


function normalize(buffer) {
  var biggestVal = 0;
  var nSamples = buffer.length;
  for (var index = 0; index < nSamples; index++){
    if (abs(buffer[index]) > biggestVal){
      biggestVal = abs(buffer[index]);
    }
  }
  for (var index = 0; index < nSamples; index++){

    // divide each sample of the buffer by the biggest val
    buffer[index] /= biggestVal;
  }
  return buffer;
}