# Visualizing Music with p5.js

Music can trigger our emotions, and evoke the full range of our senses. Take the sinesthetic artist Kandinsky, who associated musical qualities with particular colors and shapes. A computer processes music differently, as a stream of numbers. As data. How can we map this data onto meaningul visuals that enhance our experience of music?

This workshop is for anyone who would like to explore sound data, music, and visuals. We'll demonstrate types of data we can get from digital signal processing using interactive "sketches" in p5.js. We'll likely focus on Amplitude, Frequency Spectrum, and Beat Detection. We'll play with various approaches for mapping sound data onto meaningul visuals, and collaborate in the creation of online music visualizations.

### Libraries
Participants may use whatever tools they wish, but the demos in this repo use the following libraries:

**p5.js** is a JavaScript library that starts with the original goal of Processing, to make coding accessible for artists, designers, educators, and beginners, and reinterprets this for today’s web.
 * [p5js.org](http://p5js.org)
    * [/learn](http://p5js.org/learn)
    * [/reference](http://p5js.org/reference/)
  * [github](https://github.com/lmccart/p5.js)
  * [processing.org discussion forum](http://forum.processing.org/two/categories/p5-js)

**p5.sound.js** is an addon library that brings the Processing approach to the [Web Audio API](http://w3.org/TR/webaudio/).
  * [p5.sound documentation](http://p5js.org/reference/#/libraries/p5.sound)
  * [github](https://github.com/therewasaguy/p5.sound)


### Setup
* Download this github repo, and build off of the empty **example sketch in the viz_gallery folder**. It links to the libraries.
* [Running p5.js on a local server](https://github.com/lmccart/p5.js/wiki/Local-server)
* You'll need a text editor. Some options:
  * [SublimeText](http://www.sublimetext.com/)
  * [p5 IDE](http://p5js.org/download/)

### >> [Getting Started with p5](http://p5js.org/get-started/#your-first-sketch)

---

### p5.sound Highlights for Music Viz:

**p5.AudioIn** - [documentation](http://p5js.org/reference/#/p5.AudioIn) | [source code](https://github.com/therewasaguy/p5.sound/blob/master/src/audioin.js)
*microphone!*

**p5.SoundFile** - [documentation](http://p5js.org/reference/#/p5.SoundFile) | [source code](https://github.com/therewasaguy/p5.sound/blob/master/src/soundfile.js)
*play an mp3 or ogg file*
- To ensure file is loaded by the time you want to play it, ```loadsound()``` during p5's ```preload()```, or with a callback.
- To ensure browser compatability, you can provide both mp3 and ogg options.
   + Convert to ogg [here](http://media.io/), and specify multiple filetypes with the [soundFormats()](http://p5js.org/reference/#/p5.sound/soundFormats) method.
- ```.getPeaks()``` - an array of peak amplitudes over the course of the entire sound file. ([demo](http://therewasaguy.github.io/p5-music-viz/demos/drawpeaks_with_playhead/) | [source](https://github.com/therewasaguy/p5-music-viz/tree/master/demos/drawpeaks_with_playhead/sketch.js)

**p5.Amplitude** - [documentation](http://p5js.org/reference/#/p5.Amplitude) | [source code](https://github.com/therewasaguy/p5.sound/blob/master/src/amplitude.js)
*Analyze overall volume level*
* .getLevel() returns a Root Mean Square (RMS) amplitude reading, between 0.0 and 1.0
* try smoothing!

**p5.FFT** - [documentation](http://p5js.org/reference/#/p5.FFT) | [source code](https://github.com/therewasaguy/p5.sound/blob/master/src/fft.js)
*Get an array of amplitude levels across the frequency spectrum, or the time domain*
* ```.analyze()``` returns amplitude readings from 0-255 across the frequency spectrum
* ```.waveform()``` returns amplitude readings across a brief snapshot of time ([demo](http://therewasaguy.github.io/p5-music-viz/fftwaveform)) | [source](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/fftwaveform/sketch.js)

## Demos:
### [FFT Spectrum Drag 'n Drop multi-tool](http://therewasaguy.github.io/p5-music-viz/demos/fftspectrum/) | [Source Code](https://github.com/therewasaguy/p5-music-viz/tree/master/demos/fftspectrum)

### [Beat Detection](http://therewasaguy.github.io/p5-music-viz/demos/08_beat_detect_amplitude) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/08_beat_detect_amplitude/sketch.js)

### [FFT Particle System](http://therewasaguy.github.io/p5-music-viz/demos/07_fft) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/07_fft/sketch.js)

----------

### More Resources...
* [Making Audio Reactive Visuals w/ Web Audio API](http://www.airtightinteractive.com/2013/10/making-audio-reactive-visuals/)
* [Another Approach to Beat Detection Using Web Audio API](http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/)
* [Marius Watz' Sound As Data workshop with Processing](https://github.com/mariuswatz/ITP2013Parametric/blob/master/ITP-workshops/20131111-ITP-Sound-As-Data/) // [blog post](http://workshop.evolutionzone.com/2013/11/12/itp-sound-as-data-workshop-code/)
* [Pitch Detection - Web Audio Demo](https://webaudiodemos.appspot.com/pitchdetect/)
* Echo Nest [Remix API](http://echonest.github.io/remix/) can get you beats, tatums, [regular API](http://developer.echonest.com/docs/v4) has more data about music/artists/songs.
* [Tone.js](https://github.com/TONEnoTONE/Tone.js) is a JS library for composing interactive music.

### Music Visualization Inspiration...
* [Optical Poem, Oskar Fischinger's 1938 visualization of Franz Liszt's "2nd Hungarian Rhapsody"](https://www.youtube.com/watch?v=they7m6YePo)
* [Kandinsky's Color Theory](http://lettersfrommunich.wikispaces.com/Kandinsky's+Color+Theory)
* [Notations21](http://www.notations21.net/)
* [Music Makes You Travel](http://www.openprocessing.org/sketch/138877)
