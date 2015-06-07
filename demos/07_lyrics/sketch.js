/*
  Pre-analyze a song using the Echo Nest API. It returns a JSON file with every beat, segment, section and more.

  Each segment contains a start time, an end time, and an array of pitches. The pitches represent pitch classes
  (i.e. C, C#, D, D#, E, F, G, G#, A, A#, B, C).
  Each item in the pitches array gets a value between 0 and 1.0 indicating
  how much of that pitch class is present in the section.

  In this example, each slice of the pie represents one pitch class.
  The size of the slices increases for every Echo Nest beat.
  And the rotation changes when Echo Nest thinks there is a new section.

  -- HOW TO USE THE ECHO NEST ANALYZER --
  First, you'll need an API Key from developer.echonest.com.
  Then, open up the terminal and make this POST request with your mp3 path and API key:
  
  Then, Upload your file to the Echo Nest by entering this in the commnd line:
  curl -F "api_key=[YOURAPIKEY]" -F "filetype=mp3" -F "track=@[PATH]" "http://developer.echonest.com/api/v4/track/upload"
  
  wait for the response...and copy the 'id' which is unique to your track upload.

  Paste the ID and your API key into this GET request:
  http://developer.echonest.com/api/v4/track/profile?api_key=[YOURAPIKEY]&format=json&id=[YOURTRACKID]&bucket=audio_summary

  Click through to analysis_url, and save that JSON file

  more info http://developer.echonest.com/raw_tutorials/faqs/faq_03.html
  Further reading: http://developer.echonest.com/docs/v4/_static/AnalyzeDocumentation.pdf
  
  Music "Twit JournalisT" by Alaclair Ensemble (alaclair.com)
  Creative Commons Attribution-Share-Alike
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