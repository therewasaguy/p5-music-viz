/*
  Store an array of amplitude values and draw them over time.

  Inspired by http://tybenz.com/visualizr.

  getLevel() from the p5.Amplitude object and map it to the ellipse position.

  Press "T" to toggle between a sound file and audio input (mic).
 */

var mic, soundFile;

var amplitude;

var prevLevels = new Array(300);


function setup() {
  c = createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  noStroke();

  rectMode(CENTER);

  mic = new p5.AudioIn();
  mic.start();

  // load the sound, but don't play it yet
  soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  amplitude.smooth(0.6);
}

function draw() {
  background(0,0,0,10);

  var level = amplitude.getLevel();
  var w = 5;
  var minH = 2;
  var roundness = 2;


  // add new level to end of array
  prevLevels.push(level);

  // remove first item in array
  prevLevels.splice(1, 1);

  // loop through all the previous levels
  for (var i = 0; i < prevLevels.length; i++) {
    var x = map(i, prevLevels.length, 0, width/2, width);
    var h = map(prevLevels[i], 0, 0.5, minH, height);

    // fill
    fill(255,255,255, map(i, 0, prevLevels.length, 0, 200));
    rect(x, height/2, w, h, roundness, roundness, roundness, roundness);
    rect(width - x, height/2, w, h, roundness, roundness, roundness, roundness);

  }

}



// ================
// Helper Functions
// ================

// resize canvas on windowResized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// T stands for toggleInput().
// note: in p5, keyPressed is not case sensitive. keyTyped is
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
}

/*
  Toggle input and change which
  source is feeding the p5.Amplitude.
 */
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