p5-music-viz
============
Welcome! Here are some resources to visualize sound with p5.js and p5.sound

Libraries:
=============================
* **p5.js** is "Processing for the web," a JavaScript library that can help us manipulate the html5 canvas.
  * [p5js.org](http://p5js.org)
    * [/learn](http://p5js.org/learn)
    * [/reference](http://p5js.org/reference/)
  * [github](https://github.com/lmccart/p5.js)
  * [processing.org discussion forum](http://forum.processing.org/two/categories/p5-js)
* **p5.sound.js** is an addon library that brings the Processing approach to the [Web Audio API](http://w3.org/TR/webaudio/).
  * [p5.sound documentation](http://p5js.org/reference/#/libraries/p5.sound)
  * [github](https://github.com/therewasaguy/p5.sound)


Getting Started
===============
* [Running p5.js on a local server](https://github.com/lmccart/p5.js/wiki/Local-server)
* Download this github repo, run a local server
* You'll need a text editor. Some options:
  * [SublimeText](http://www.sublimetext.com/)
  * [p5 IDE](http://p5js.org/download/)

1. Load & Play a file (source) (online demo)
==============
* [preload()](http://p5js.org/reference/#/p5/preload)
* loadSound gives us a [p5.SoundFile](http://p5js.org/reference/#/p5.SoundFile)


2. Control "volume" (source) (online demo)
==================

3. p5 Canvas (source) (online demo)
===

4. Amplitude (source) (online demo)
===
* [p5.Amplitude](http://p5js.org/reference/#/p5.Amplitude)
* smooth()
* getLevel()
* other ways to view amplitude:
  * getPeaks()  --> ***demo***
  * waveform --> ***demo***

5. (Toggle Source)
===

6. (Particle class, getting ready for FFT Spectrum)
===

7. Frequency Spectrum
===
* EQ filter ((demo)[http://p5js.org/reference/#/p5.Filter])
* p5.FFT
* Spectrum Tool ***demo***

8. Peak Detection using Amplitude
===
* [Beat Detection is complicated!](http://stackoverflow.com/questions/657073/how-to-detect-bpm-of-the-song-by-programming)

9. Peak Detection using FFT?
===
...maybe we will try this during the workshop!

More Resources...
* [Making Audio Reactive Visuals w/ Web Audio API](http://www.airtightinteractive.com/2013/10/making-audio-reactive-visuals/)
* [Another Approach to Beat Detection Using Web Audio API](http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/)
* [Marius Watz' Sound As Data workshop with Processing](https://github.com/mariuswatz/ITP2013Parametric/blob/master/ITP-workshops/20131111-ITP-Sound-As-Data/) // [blog post](http://workshop.evolutionzone.com/2013/11/12/itp-sound-as-data-workshop-code/)
* [Pitch Detection - Web Audio Demo](https://webaudiodemos.appspot.com/pitchdetect/)
* Echo Nest [Remix API](http://echonest.github.io/remix/) can get you beats, tatums, [regular API](http://developer.echonest.com/docs/v4) has more data about music/artists/songs

Music Visualization Inspiration...
* [Optical Poem, Oskar Fischinger's 1938 visualization of Franz Liszt's "2nd Hungarian Rhapsody"](https://www.youtube.com/watch?v=they7m6YePo)
* [Kandinsky's Color Theory](http://lettersfrommunich.wikispaces.com/Kandinsky's+Color+Theory)
* [Notations21](http://www.notations21.net/)
* [Music Makes You Travel](http://www.openprocessing.org/sketch/138877)


Please feel free to add inspiration by submitting a pull request!
