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

var mic, audioFile, fft;
var bNormalize = true;

var audioIsPlaying = false;

// if > 0, ignores levels below this threshold
var centerClip = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  // default mode is radians
  angleMode(RADIANS);
  translate(width/2, height/2);

  mic = new p5.AudioIn();
  mic.start();

  audioFile = createAudio('../../music/Peter_Johnston_-_La_ere_gymnopedie.mp3');

  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(255, 255, 255, 100);
  stroke(237, 34, 93, 120);

  // min radius of ellipse
  var minRad = 2;

  // max radius of ellipse
  var maxRad = height;

  // array of values from -1 to 1
  var timeDomain = fft.waveform(2048, 'float32');
  var corrBuff = autoCorrelate(timeDomain);

  var len = corrBuff.length;


  // draw a circular shape
  beginShape();

  for (var i = 0; i < len; i++) {
    var angle = map(i, 0, len, 0, HALF_PI);
    var offset = map(abs(corrBuff[i]), 0, 1, 0, maxRad) + minRad;
    var x = (offset) * cos(angle);
    var y = (offset) * sin(angle);
    curveVertex(x, y);
  }

  for (var i = 0; i < len; i++) {
    var angle = map(i, 0, len, HALF_PI, PI);
    var offset = map(abs(corrBuff[len - i]), 0, 1, 0, maxRad) + minRad;
    var x = (offset) * cos(angle);
    var y = (offset) * sin(angle);
    curveVertex(x, y);
  }

  // semi circle with mirrored
  for (var i = 0; i < len; i++) {
    var angle = map(i, 0, len, PI, HALF_PI + PI);
    var offset = map(abs(corrBuff[i]), 0, 1, 0, maxRad) + minRad;
    var x = (offset) * cos(angle);
    var y = (offset) * sin(angle);
    curveVertex(x, y);
  }

  for (var i = 0; i < len; i++) {
    var angle = map(i, 0, len, HALF_PI + PI, TWO_PI);
    var offset = map(abs(corrBuff[len - i]), 0, 1, 0, maxRad) + minRad;
    var x = (offset) * cos(angle);
    var y = (offset) * sin(angle);
    curveVertex(x, y);
  }


  endShape(CLOSE);

}


function autoCorrelate(buffer) {
  var newBuffer = [];
  var nSamples = buffer.length;

  var autocorrelation = [];

  // center clip removes any samples under 0.1
  if (centerClip) {
    var cutoff = centerClip;
    for (var i = 0; i < buffer.length; i++) {
      var val = buffer[i];
      buffer[i] = Math.abs(val) > cutoff ? val : 0;
    }
  }

  for (var lag = 0; lag < nSamples; lag++){
    var sum = 0; 
    for (var index = 0; index < nSamples; index++){
      var indexLagged = index+lag;
      var sound1 = buffer[index];
      var sound2 = buffer[indexLagged % nSamples];
      var product = sound1 * sound2;
      sum += product;
    }

    // average to a value between -1 and 1
    newBuffer[lag] = sum/nSamples;
  }

  if (bNormalize){
    var biggestVal = 0;
    for (var index = 0; index < nSamples; index++){
      if (abs(newBuffer[index]) > biggestVal){
        biggestVal = abs(newBuffer[index]);
      }
    }
    // dont divide by zero
    if (biggestVal !== 0) {
      for (var index = 0; index < nSamples; index++){
        newBuffer[index] /= biggestVal;
      }
    }
  }

  return newBuffer;
}


// toggle input
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
}

function toggleInput() {
  if (audioIsPlaying ) {
    audioFile.pause();
    mic.start();
    fft.setInput(mic);
    audioIsPlaying = false;
  } else {
    audioFile.play();
    mic.stop();
    fft.setInput(audioFile);
    audioIsPlaying = true;
  }
}