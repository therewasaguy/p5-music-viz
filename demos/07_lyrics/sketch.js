/**
 *  Display lyrics as a song plays.
 *
 *  This example uses the p5.dom library to create an HTML5 Audio Element.
 *
 *  It also uses a JavaScript to JSON parser https://github.com/justan/lrc
 *  
 *  This is a quick way to generate an LRC file http://lrcgenerator.com/
 */

var audioEl;

var lrcStrings;
var lrc;

var currentLyric = '';
var lyricDiv;

var bgColor = 255;

function preload() {
  lrcStrings = loadStrings('../../music/Alaclair_Ensemble_-_14_-_Twit_JournalisT.lrc')
}

function setup() {
  var c = createCanvas(0, 0);

  colorMode(HSB, 255);

  audioEl = createAudio('../../music/Alaclair_Ensemble_-_14_-_Twit_JournalisT.mp3');
  audioEl.showControls();

  // join the lyrics
  lrcStrings = lrcStrings.join('\n');

  lrc = new Lrc(lrcStrings, outputHandler);

  for (var i = 0; i < lrc.lines.length; i++) {
    var time = lrc.lines[i].time;
    var lyric = lrc.lines[i].txt.valueOf();

    audioEl.setTimeline(outputHandler, time, lyric);
  }

  audioEl.setTimeline(changeBackground, 1.5);

  lyricDiv = createDiv('');
  lyricDiv.style('font-size', '48px')
  lyricDiv.style('padding', '10px')
  lyricDiv.style('margin', 'auto')

}

function outputHandler(time, lyric) {

  // if lyric is empty, clear the lyricDiv
  if (lyric === '') {
    lyricDiv.html('');
    return;
  }

  currentLyric = lyric + ' ';
  var newLyric = createSpan(currentLyric);

  // give it a random color
  newLyric.style('color', 'rgba(' + int(random(0,255)) + ', ' + int(random(0,255)) + ', ' + int(random(0,255)) +', 255)' );

  // append it to the lyricDiv
  lyricDiv.child(newLyric);
}

function changeBackground() {
  bgColor = 0;
}