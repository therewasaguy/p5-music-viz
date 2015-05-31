/**
 *  Auto Correlation multiples each sample in a buffer by all
 *  of the other samples. This emphasizes the fundamental
 *  frequency. Auto Correlation is useful for pitch detection,
 *  as well as for visualization
 *  
 *  This example is a Correlogram which is a plot
 *  of the autocorrelations.
 *  
 *  Example by Jason Sigal and Golan Levin.
 */

var source, fft, lowPass;

var doCenterClip = false;
var bNormalize = true;
var centerClip = 0.0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  source = new p5.AudioIn();
  source.start();

  lowPass = new p5.LowPass();
  lowPass.disconnect();
  source.connect(lowPass);

  fft = new p5.FFT();
  fft.setInput(lowPass);
}

function draw() {
  background(200);

  // array of values from -1 to 1
  var timeDomain = fft.waveform(2048, 'float32');
  var corrBuff = autoCorrelate(timeDomain);

  beginShape();
  for (var i = 0; i < corrBuff.length; i++) {
    var w = map(i, 0, corrBuff.length, 0, width);
    var h = map(corrBuff[i], -1, 1, height, 0);
    curveVertex(w, h);
  }
  endShape();

  fill(0);
  text (centerClip, 20, 20); 
  line (0, height/2, width, height/2);

  var F = findFrequency(corrBuff);
  text (F, 20, 50); 
}



//------------------------------------------
function autoCorrelate(buffer) {
  
  var nSamples = buffer.length;

  // normalize the input buffer
  if (bNormalize){
    var biggestVal = 0;
    for (var index = 0; index < nSamples; index++){
      if (abs(buffer[index]) > biggestVal){
        biggestVal = abs(buffer[index]);
      }
    }
    for (var index = 0; index < nSamples; index++){
      buffer[index] /= biggestVal;
    }
  }

  if (doCenterClip) {
    // center clip removes any samples whose abs is less than centerClip
    centerClip = map(mouseY, 0, height, 0,1); 
    if (centerClip > 0.0) {
      for (var i = 0; i < buffer.length; i++) {
        var val = buffer[i];
        buffer[i] = (Math.abs(val) > centerClip) ? val : 0;
      }
    }
  }

  var autoCorrBuffer = [];
  for (var lag = 0; lag < nSamples; lag++){
    var sum = 0; 
    for (var index = 0; index < nSamples; index++){
      var indexLagged = index+lag;
      if (indexLagged < nSamples){
        var sound1 = buffer[index];
        var sound2 = buffer[indexLagged];
        var product = sound1 * sound2;
        sum += product;
      }
    }

    // average to a value between -1 and 1
    autoCorrBuffer[lag] = sum/nSamples;
  }

  if (bNormalize){
    var biggestVal = 0;
    for (var index = 0; index < nSamples; index++){
      if (abs(autoCorrBuffer[index]) > biggestVal){
        biggestVal = abs(autoCorrBuffer[index]);
      }
    }
    for (var index = 0; index < nSamples; index++){
      autoCorrBuffer[index] /= biggestVal;
    }
  }

  return autoCorrBuffer;
}


// -------------------
function findFrequency(autocorr) {

  var nSamples = autocorr.length;
  var valOfLargestPeakSoFar = 0;
  var indexOfLargestPeakSoFar = -1;

  for (var index = 1; index < nSamples; index++){
    var valL = autocorr[index-1];
    var valC = autocorr[index];
    var valR = autocorr[index+1];

    var bIsPeak = ((valL < valC) && (valR < valC));
    if (bIsPeak){
      if (valC > valOfLargestPeakSoFar){
        valOfLargestPeakSoFar = valC;
        indexOfLargestPeakSoFar = index;
      }
    }
  }
  
  var distanceToNextLargestPeak = indexOfLargestPeakSoFar - 0; 
  var fundamentalFrequency = 44100.0 / distanceToNextLargestPeak;
  return fundamentalFrequency;
}