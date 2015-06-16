/**
 *  Display lyrics as a song plays.
 *
 *  Uses the p5.dom library to create an HTML5 Audio Element, and schedules
 *  events using audioEl.setCue(callback, time, value)
 *
 *  Lyrics are parsed from an LRC file, which is used for karaoke.
 *  Here is a quick way to generate your own LRC file for any song: http://lrcgenerator.com/
 *  
 *  First we loadStrings to read the LRC file, then convert the Strings to JSON using this
 *  LRC to JSON converter:
 *  https://github.com/justan/lrc (MIT License)
 *
 *  Music "Twit JournalisT" by Alaclair Ensemble (alaclair.com)
 *  Creative Commons Attribution-Share-Alike
 */

var audioEl;
var currentLyric = '';
var lyricDiv;
var lrcStrings;

function preload() {

  // loadStrings returns an array of strings.
  lrcStrings = loadStrings('../../music/Alaclair_Ensemble_-_14_-_Twit_JournalisT.lrc')
}

function setup() {
  noCanvas();

  audioEl = createAudio('../../music/Alaclair_Ensemble_-_14_-_Twit_JournalisT.mp3');
  audioEl.showControls();

  // turn the array of strings into one big string, separated by line breaks.
  lrcStrings = lrcStrings.join('\n');

  // lrc.js library converts Strings to JSON
  var lrcJSON = new Lrc(lrcStrings);

  // iterate through each line of the LRC file to get a Time and Lyric
  for (var i = 0; i < lrcJSON.lines.length; i++) {
    var time = lrcJSON.lines[i].time;
    var lyric = lrcJSON.lines[i].txt.valueOf();

    // schedule events to trigger at specific times during audioEl playback
    audioEl.addCue(time, showLyric, lyric);
  }

  // create a <div> to hold the lyrics and give it some style
  lyricDiv = createDiv('');
  lyricDiv.style('font-size', '48px')
  lyricDiv.style('padding', '10px')
  lyricDiv.style('margin', 'auto')
}


// callback specified by addCue(time, callback, value).
function showLyric(value) {
  var lyric = value;

  // if lyric is empty, clear the lyricDiv
  if (lyric === '') {
    lyricDiv.html('');
    return;
  }

  // othewrwise, create a new <span> with the lyric, followed by a space
  currentLyric = lyric + ' ';
  var newLyric = createSpan(currentLyric);

  // give it a random color
  newLyric.style('color', 'rgba(' + int(random(0,255)) + ', ' + int(random(0,255)) + ', ' + int(random(0,255)) +', 255)' );

  // append newLyric to the lyricDiv
  lyricDiv.child(newLyric);
}