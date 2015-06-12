/*
 * Dancing characters music beat visualizer, a hack by:
 * by @RobStenzinger at EYEO 2015 workshop
 * Based on Jason Sigal's workshop peak detect example, mashed up with music and characters from
 * https://github.com/robstenzinger/Creative-Code-Kit-Underwater-Tomato-Ninja-Edition
 */

var cnv; //canvas
var fft; //Fast Fourier Transform
var peakDetect1; // lower range peak
var peakDetect2; // mid range peak
var peakDetect3; // higher range peak
var soundFile;

//
// variables to manage the three character images
//

var w1 = null;
var w2 = null;
var w3 = null;

var minimumWidth1 = 130;
var minimumWidth2 = 120;
var minimumWidth3 = 110;

var maximumWidth1 = minimumWidth1 + (minimumWidth1 * .25);
var maximumWidth2 = minimumWidth2 + (minimumWidth1 * .25);
var maximumWidth3 = minimumWidth3 + (minimumWidth1 * .25);

var imagePath1 = "astronaut.png";
var imagePath2 = "crab.png";
var imagePath3 = "dragon.png";

var imageCache = {};

function preload(){

  imageCache[imagePath1] = loadImage(imagePath1);
  imageCache[imagePath2] = loadImage(imagePath2);
  imageCache[imagePath3] = loadImage(imagePath3);

  soundFile = loadSound("song1.mp3");
}

function setup() {

  var cnv = createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  fill(255);
  textAlign(CENTER);

  // p5.PeakDetect requires a p5.FFT
  fft = new p5.FFT();
  peakDetect1 = new p5.PeakDetect(40,20000);
  peakDetect2 = new p5.PeakDetect(2000,4000);
  peakDetect3 = new p5.PeakDetect(4000,10000);

  fft = new p5.FFT(0.8, 1024);
  fft.setInput(soundFile);
}

function draw() {

  //
  // update the background and UI elements
  //
  background(0);
  stroke(255, 0, 20);
  text('click to play/pause', width/10, height/10);

  //
  // update peakDetect via FFT post-analysis
  //
  fft.analyze();
  peakDetect1.update(fft);
  peakDetect2.update(fft);
  peakDetect3.update(fft);

  //
  // prepare the character size based on peak detection
  //
  if (peakDetect1.isDetected)
    w1 = maximumWidth3;
  else
    w1 *= 0.95;

  if(w1 < minimumWidth1)
    w1 = minimumWidth1;

  if (peakDetect2.isDetected)
    w2 = maximumWidth3;
  else
    w2 *= 0.95;

  if(w2 < minimumWidth2)
    w2 = minimumWidth2;

  if (peakDetect3.isDetected)
    w3 = maximumWidth3;
  else
    w3 *= 0.95;

  if(w3 < minimumWidth3)
    w3 = minimumWidth3;


  //
  // update the character images width, height, x, y based on peak detection
  //
  image(imageCache[imagePath1], width/2 - (imageCache[imagePath1].width/2) - maximumWidth1, (height/2 - (imageCache[imagePath1].height/2)) + peakDetect1.energy *100, w1, w1);

  image(imageCache[imagePath2], width/2 - (imageCache[imagePath2].width/2), (height/2 - (imageCache[imagePath2].height/2))  + peakDetect2.energy *100, w2, w2);

  image(imageCache[imagePath3], width/2 - (imageCache[imagePath3].width/2) + maximumWidth3, (height/2 - (imageCache[imagePath3].height/2)) + peakDetect3.energy *100, w3, w3);

}

// toggle play/stop when canvas is clicked
function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (soundFile.isPlaying() ) {
      soundFile.stop();
    } else {
      soundFile.loop();
    }
  }
}