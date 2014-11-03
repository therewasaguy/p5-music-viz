/*
 * Music lyrics visualizer, a hack by:
 * @kevindefinit, Jon Howard, and Kimmi Gan at the MozFest 2014 workshop on 
 * Music visualization with p5.js
 * The detectBeat() function decides whether we have a beat or not
  based on amplitude level and Beat Detect Variables.
 */
var soundFile;
var amplitude;
var particles = [];
var backgroundColor;
var img;
var lyricObj;
songStamps = [];
currLyric = "";
var lyricIndex = 0;

/* 
 Beat Detect Variables
*/
// how many draw loop frames before the beatCutoff starts to decay
// so that another beat can be triggered.
// frameRate() is usually around 60 frames per second,
// so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
// we wont respond to every beat.
var beatHoldFrames = 20;

// what amplitude level can trigger a beat?
var beatThreshold = 0.11;

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
var beatCutoff = 0;
var beatDecayRate = 0.95; // how fast does beat cutoff decay?
var framesSinceLastbeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.

function preload() {
  soundFile = loadSound('https://p.scdn.co/mp3-preview/15a1a9a90006bdfffbadd9307e29484544b77697'); //spotify 30s soundfile location
  lyricObj = loadJSON('./data/allaboutthatbass.json'); //lyrics from allaboutthatbass
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  amplitude = new p5.Amplitude();
  soundFile.play();
  soundFile.loop();

  // make a single particle.
  particles.push( new Particle() );
}

function draw() {
  background(backgroundColor);

  var level = amplitude.getLevel();
  detectBeat(level);
  //@TODO
  //getGif needs some work to get performance up
  if(!img){
    // getGif(lyricObj.song[lyricIndex].lyric);
  } else {
    var r = backgroundColor.rgba[0];//red
    var g = backgroundColor.rgba[1];//green
    var b = backgroundColor.rgba[2];//blue
    tint(r,g,b);
    image(img, 0,0 );
    //@todo
    // getGif(lyricObj.song[lyricIndex].lyric);
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].update(level);
    particles[i].draw();
  }
  if (soundFile.currentTime() > lyricObj.song[lyricIndex].time && soundFile.currentTime() < lyricObj.song[lyricIndex + 1].time) {
    
    currLyric = lyricObj.song[lyricIndex].lyric;
  } else {
      if(lyricIndex === lyricObj.song.length - 1){
        lyricIndex = 0;
      } else {
        lyricIndex++;
      }
      currLyric = lyricObj.song[lyricIndex].lyric;
    }
    fill(255,255,255);
    textSize(127 * beatCutoff);
    text(currLyric, windowWidth/2 - 40, windowHeight / 2);
}

function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat();
    beatCutoff = level *1.1;
    framesSinceLastbeat = 0;
  } else{
    if (framesSinceLastbeat <= beatHoldFrames){
      framesSinceLastbeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat() {
  backgroundColor = color( random(0,255), random(0,255), random(0,255) );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function getGif(keywords){
  var keywordCoded = keywords.split(' ').join('+');
  var request = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + keywordCoded;
  loadJSON(request, function(e){
    var imgURL = e.data.image_url;
    img = loadImage(imgURL);
  });
}

// ===============
// Particle class
// ===============

var Particle = function() {
  this.position = createVector( random(0, width), height/2 );
  this.scale = random(1, 2);
  this.speed = random(0, 10);
  this.color = color( random(0,255), random(0,255), random(0,255) );
};

Particle.prototype.update = function(levelRaw) {
  this.diameter = map(levelRaw, 0, 1, 0, 400) * this.scale;
};

Particle.prototype.draw = function() {
  fill(this.color);
  ellipse(
    this.position.x, this.position.y,
    this.diameter, this.diameter
  );
};