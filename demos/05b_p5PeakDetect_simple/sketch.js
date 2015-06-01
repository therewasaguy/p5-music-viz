/**
 *  p5.PeakDetect listens for peaks at a specific part of the
 *  frequency spectrum.
 *
 *  In this example, we listen for the shaker.
 *
 *  For more, see: http://p5js.org/reference/#/p5.PeakDetect
 */

var cnv, soundFile, fft, peakDetect;
var ellipseWidth = 10;

function setup() {
  background(0);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255);
  textAlign(CENTER);

  soundFile = loadSound('../../music/YACHT_-_06_-_Summer_Song_Instrumental.mp3');

  // p5.PeakDetect requires a p5.FFT
  fft = new p5.FFT();

  peakDetect = new p5.PeakDetect(4000, 12000, 0.2);

}

function draw() {
  background(0);
  text('click to play/pause', width/2, height/4);

  // peakDetect accepts an fft post-analysis
  fft.analyze();
  peakDetect.update(fft);

  if ( peakDetect.isDetected ) {
    ellipseWidth = 300;
  } else {
    ellipseWidth *= 0.95;
  }

  ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
}

// toggle play/stop when canvas is clicked
function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (soundFile.isPlaying() ) {
      soundFile.stop();
    } else {
      soundFile.play();
    }
  }
}