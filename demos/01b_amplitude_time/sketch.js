

/*
  Store an array of amplitude values and draw them over time.

  Inspired by http://tybenz.com/visualizr.

  getLevel() from the p5.Amplitude object and map it to the ellipse position.

  Press "T" to toggle between a sound file and audio input (mic).
 */

var mic, soundFile;

var amplitude;

var prevLevels = new Array(100);


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
  amplitude.smooth(0.8);
}

function draw() {
  background(0);

  var level = amplitude.getLevel();

  // add new level to end of array
  prevLevels.push(level);

  // remove first item in array
  prevLevels.splice(1, 1);

  var w = 5;

  for (var i = 0; i < prevLevels.length; i++) {
    var x = map(i, prevLevels.length, 0, width/2, width);
    var h = map(prevLevels[i], 0, 0.5, 10, height/2);

    // fill
    fill(255,255,255, map(i, 0, prevLevels.length, 0, 255));
    // rect(x, height/2, w, h);
    // rect(width - x, height/2, w, h);

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