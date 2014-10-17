var sound;

// load stuff before setup
function preload() {
  sound = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

// The setup function is called once, when the page loads
function setup() {
  sound.play();

  // full screen!
  c = createCanvas(windowWidth, windowHeight);
  background(0);
}

// The draw function runs every time the browser requests a new animation frame (~60 times per second)
function draw() {
  // redraw the background
  background(0);

  var volume = map(mouseY, 0, windowHeight, 1, 0);
  sound.setVolume(volume);

  // draw circle to represent the output volume
  fill(255);
  ellipse(width/2, height/2, volume*100, volume*100);
}

// resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}