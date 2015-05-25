/**
  Get track data by uploading a file to the echo nest. You'll need an API Key. 
  Then, open up the terminal and make this POST request with your mp3 path and API key:
  
  curl -F "api_key=[YOURAPIKEY]" -F "filetype=mp3" -F "track=@[PATH]" "http://developer.echonest.com/api/v4/track/upload"
  
  wait for the response...and copy the 'id' which is unique to your track upload.

  Paste the ID and your API key into this GET request:
  http://developer.echonest.com/api/v4/track/profile?api_key=[YOURAPIKEY]&format=json&id=[YOURTRACKID]&bucket=audio_summary

  Click through to analysis_url, and save that JSON file

  more info http://developer.echonest.com/raw_tutorials/faqs/faq_03.html
  Further reading: http://developer.echonest.com/docs/v4/_static/AnalyzeDocumentation.pdf
 */

var echonestAnalysis;
var cnv;
var notes = new Array(12);

var audioEl;

var beatDiameter = 400;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  colorMode(HSB, 255);

  // draw keys
  for (var i = 0; i < notes.length; i++) {
    var diameter = width/8;
    var angle = TWO_PI/notes.length;
    var hue = round( map(i, 0, notes.length, 0, 255) );
    var c = color(hue, 255, 255, 255);
    notes[i] = new Arc(i, diameter, angle, c);
    notes[i].draw();
  }

  loadJSON('../../music/Alaclair_Ensemble_-_Twit_JournalisT.json', gotData);
  audioEl = createAudio('../../music/Alaclair_Ensemble_-_14_-_Twit_JournalisT.mp3');
}

function draw() {
  background(0);

  for (var i = 0; i < notes.length; i++) {
    notes[i].draw(); 
  }

}


function gotData(data) {
  echonestAnalysis = data;

  scheduleSegments(data.segments);

  scheduleBeats(data.beats);
}

///////////
function scheduleSegments(segments) {

  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    if (seg.confidence > 0.5) {
      var startTime = seg.start;
      var endTime = seg.start + seg.duration;
      var pitches = seg.pitches;

      audioEl.setTimeline(triggerNote, startTime, pitches);
      audioEl.setTimeline(releaseNote, endTime);

    }
  }
}

function scheduleBeats(beats) {
  for (var i = 0; i < beats.length; i++) {
    var beat = beats[i];
    var startTime = beat.start;

    audioEl.setTimeline(triggerBeat, startTime);
  }
}


/////////
function triggerNote(time, pitches) {
  for (var i = 0; i < notes.length; i++) {
    if (pitches[i] > 0.5) {
      notes[i].triggerNote(pitches[i]);
    }
  }
}

function releaseNote() {
  for (var i = 0; i < notes.length; i++) {
    notes[i].releaseNote();
  }
}

function triggerBeat() {
  for (var i = 0; i < notes.length; i++) {
    notes[i].triggerBeat();
  }
}



var Arc = function(index, diameter, angle, c) {
  this.index = index;
  this.diameter = diameter;
  this.extraRad = 0;

  this.angle = angle;
  this.color = c;
  this.alpha = this.color.rgba[3];
  this.decayRate = 0.95;
}

Arc.prototype.triggerNote = function(val) {
  this.alpha = 255 * val;
  this.decayRate = 1;
  this.color.rgba[3] = this.alpha;
}

Arc.prototype.releaseNote = function() {
  this.decayRate = 0.9;
}

Arc.prototype.triggerBeat = function() {
  this.extraRad = beatDiameter;
}

Arc.prototype.draw = function() {
  this.alpha *= this.decayRate;
  this.extraRad *= this.decayRate;

  this.color.rgba[3] = this.alpha;
  fill(this.color);

  var d = this.diameter + this.extraRad;

  arc(width/2, height/2, d, d, this.index*this.angle, (this.index*this.angle) + this.angle);
}