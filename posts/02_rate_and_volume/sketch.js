var sound;

// load stuff before setup
function preload() {
  sound = loadSound('../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

// The setup function is called once, when the page loads
function setup() {
  sound.play();
}

// The draw function runs every time the browser requests a new animation frame (~60 times per second)
function draw() {
  var rate = map(mouseX, 0, windowWidth, 0, 1);
  sound.rate(rate);

  var volume = map(mouseY, 0, windowHeight, 1, 0);
  sound.setVolume(volume);
}