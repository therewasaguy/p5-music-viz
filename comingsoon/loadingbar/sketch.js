var fft, mic, soundfile, amplitude;

var particles = [];


function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);

  soundfile = loadSound('../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3', setupSound, doLoading);// function(progress) {
}

function draw() {
  if (!isLoading) {
    background(0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

var isLoading = true;

function doLoading(progress) {
  fill(255);
  var progWidth = map(progress, 0, 1, 0, width);
  rect(0, 0, progWidth, 30);
  console.log('loading');
}

function setupSound() {
  isLoading = false;
  soundfile.play();
}