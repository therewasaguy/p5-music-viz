/**
 *  DEMO
 *  - find the peaks in an audio file to draw the entire waveform with SoundFile.getPeaks();
 *  - draw cursor on a timeline with SoundFile.currentTime() and SoundFile.duration();
 */

// ====================

var soundFile;

var peakCount = 500;

function preload() {
  soundFile = loadSound('../../music/drum.mp3');
}

function setup() {
  createCanvas(800, 400);
  stroke(0);
  strokeWeight(2);
}


function draw() {
  background(255);

  peakCount = round( map(mouseY, height, 0, 5, 3000) );
  if (peakCount < 8) {
    peakCount = 8;
  }

  var waveform = soundFile.getPeaks(peakCount);

  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = height/2;
    var w = 1;
    var h = map(waveform[i], -1, 1, height, 0);
    line(x , height/2, x + 0, h);
  }

  drawPlayhead();
}


function drawPlayhead() {
  noStroke();
  fill(0,255,0);
  rect(map(soundFile.currentTime(), 0, soundFile.duration(), 0, width), 0, 5, height);
}

function mouseClicked() {
  soundFile.play();
}
