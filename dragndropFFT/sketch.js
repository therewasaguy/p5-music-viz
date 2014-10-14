var fft, mic, soundfile, amplitude;

function preload() {
  soundfile = loadSound('../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  // Hue Saturation Brightness
  colorMode(HSB);

  soundfile.play();
  mic = new p5.AudioIn();
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(0);

  var spectrum = fft.analyze();


  if (logView) {

    var prevPoint = 0;

    for (var i = 0; i < spectrum.length; i++) {
      var x = map(Math.log(i), 0, Math.log(spectrum.length), 0, width);
      var h = map(spectrum[i], 0, 255, height, 0)- height;
      fill( map(i, 0, spectrum.length, 0, 255), 255, 255 );
      rect(x, height, prevPoint - x, h );
      prevPoint = x;
    }
  }
  else {
    for (var i = 0; i < spectrum.length; i++) {
      var x = map(i, 0, spectrum.length, 0, width);
      var h = map(spectrum[i], 0, 255, height, 0)- height;
      fill( map(i, 0, spectrum.length, 0, 255), 255, 255 );
      rect(x, height, width/spectrum.length, h );
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// in p5, keyPressed is not case sensitive, but keyTyped is
function keyPressed() {
  if (key == 'T') {
    toggleInput();
  }
  if (key == 'L') {
    toggleScale();
  }
}

function toggleInput() {
  if (soundfile.isPlaying() ) {
    soundfile.pause();
    mic.start();
    fft.setInput(mic);
  } else {
    soundfile.play();
    mic.stop();
    fft.setInput(soundfile);
  }
}

var logView = true;
function toggleScale() {
  logView = !logView;
  console.log('logView');
}

function mousePressed() {
  var thisBand = map(mouseX, 0, width, 20, 22050)
  console.log(thisBand);
}


// ==========
// Band Class
// ==========

var Band = function(index, totalBands) {
  this.index = index;
  this.totaBands = totalBands;
}

Band.prototype.drawLog = function(prev) {

}

Band.prototype.drawLin = function() {
  
}
