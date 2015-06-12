# Visualizing Music with p5.js

This session is for anyone who would like to explore music, visuals and creative coding for the web. We'll demonstrate types of data we can get from digital signal processing using interactive sketches in p5.js and the p5.sound library that builds upon the Web Audio API. We'll explore various methods to map this data onto meaningful visuals that enhance our experience of music.

# Slides
**[Intro Slides](http://slides.com/jasonsigal/deck)**

**[Code Slides](http://slides.com/jasonsigal/h)**


# Demos:
##1. Amplitude
### [Hello Amplitude](http://therewasaguy.github.io/p5-music-viz/demos/01_hello_amplitude) | [Source Code](https://github.com/therewasaguy/p5-music-viz/tree/master/demos/01_hello_amplitude/sketch.js)

### [Amplitude over time](http://therewasaguy.github.io/p5-music-viz/demos/01b_amplitude_time/)

### [Amplitude Threshold](http://therewasaguy.github.io/p5-music-viz/demos/01c_amplitude_threshold/)

### [Simple Beat Detection](http://therewasaguy.github.io/p5-music-viz/demos/01d_beat_detect_amplitude/)

### [Draw Full Waveform w/ Playhead](http://therewasaguy.github.io/p5-music-viz/demos/02_draw_peaks_and_playhead)

### [Time Domain (Oscilloscope)](http://therewasaguy.github.io/p5-music-viz/demos/03_time_domain_oscilloscope) | [Source Code](https://github.com/therewasaguy/p5-music-viz/tree/master/demos/03_time_domain_oscilloscope/sketch.js)

##2. Frequency
*FFT - Fast Fourier Transform*
### [FFT Spectrum Drag, Drop 'n Analyze](http://therewasaguy.github.io/p5-music-viz/demos/04_fft_freq_spectrum/) | [Source Code](https://github.com/therewasaguy/p5-music-viz/tree/master/demos/04_fft_freq_spectrum/sketch.js)

### [FFT Spectrograph](http://therewasaguy.github.io/p5-music-viz/demos/04b_fft_spectrograph/)

### [FFT Particle System](http://therewasaguy.github.io/p5-music-viz/demos/05a_fft_particle_system) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system/sketch.js)

*Scaling the FFT*
### [FFT Scale by Neighbors](http://therewasaguy.github.io/p5-music-viz/demos/05_fft_scaleNeighbors/)

### [FFT Scale by 1/3 Octave](http://therewasaguy.github.io/p5-music-viz/demos/05_fft_scaleOneThirdOctave/)

### [FFT Unknown Pleasures](http://therewasaguy.github.io/p5-music-viz/demos/05_fft_scaleOneThirdOctave_UnknownPleasures/)

### [FFT Particle System Scaled / Seek (Fireworks)](http://therewasaguy.github.io/p5-music-viz/demos/05a_fft_particle_system_seekScaled/)

### [FFT Peak Detect](http://therewasaguy.github.io/p5-music-viz/demos/05b_p5PeakDetect_simple) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05b_p5PeakDetect_simple/sketch.js)

##3. Pitch
*autocorrelation in the time domain to detect fundamental frequency*

### [Autocorrelate Time Domain](http://therewasaguy.github.io/p5-music-viz/demos/06a_autoCorrelation) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05b_p5PeakDetect_simple/sketch.js)

### [Autocorrelation Circle](http://therewasaguy.github.io/p5-music-viz/demos/06b_autoCorrelationCircle) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/06b_autoCorrelationCircle/sketch.js)

### [Pitch Track](http://therewasaguy.github.io/p5-music-viz/demos/06c_autoCorrelation_PitchTrack) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/06c_autoCorrelation_PitchTrack/sketch.js)

#4. Musical Timing
*sync music to timestamped lyrics*
### [Display Lyrics](http://therewasaguy.github.io/p5-music-viz/demos/07_lyrics) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/07_lyrics/sketch.js)

*pre-analyze file with the Echo Nest API, and visualize the result*
### [Pre-rendered Analysis (via Echo Nest - Beat + Pitch)](http://therewasaguy.github.io/p5-music-viz/demos/08_echonestBeatPitch) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/08_echonestBeatPitch/sketch.js)

### [Pre-rendered Analysis (via Echo Nest) - Pitch Segment 1](http://therewasaguy.github.io/p5-music-viz/demos/08_echonestPitchSegment) | [Source Code](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/08_echonestPitchSegment/sketch.js)

---

# Libraries
Participants may use whatever tools they wish, but the demos in this repo use the following libraries:

**p5.js** is a JavaScript library that starts with the original goal of Processing, to make coding accessible for artists, designers, educators, and beginners, and reinterprets this for today’s web.
 * [p5js.org](http://p5js.org)
    * [/learn](http://p5js.org/learn)
    * [/reference](http://p5js.org/reference/)
  * [github](https://github.com/processing/p5.js)

**p5.sound.js** is an addon library that brings the Processing approach to the [Web Audio API](http://w3.org/TR/webaudio/).
  * [p5.sound documentation](http://p5js.org/reference/#/libraries/p5.sound)
  * [github](https://github.com/processing/p5.js-sound)

**p5.dom.js** is an addon library that helps us manipulate the DOM.
  * [p5.dom documentation](http://p5js.org/reference/#/libraries/p5.dom)

# Setup
* Download this github repo, and build off of the empty **example sketch in the template folder**. It links to the libraries.
* [Running p5.js on a local server](https://github.com/lmccart/p5.js/wiki/Local-server)
* You'll need a text editor. Some options:
  * [SublimeText](http://www.sublimetext.com/)
  * [p5 IDE](http://p5js.org/download/)
* [Getting Started: Your First Sketch](http://p5js.org/get-started/#your-first-sketch)

## Inspiration:
* [p5.js port of Dan Shiffman's Nature of Code](https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/)
* [Forces](http://p5js.org/learn/examples/Simulate_Forces.php)
* [Particle System](http://p5js.org/learn/examples/Simulate_Particle_System.php)
* [Perlin Noise](http://p5js.org/learn/examples/Math_Noise_Wave.php)
* [Flocking](http://p5js.org/learn/examples/Simulate_Flocking.php)
* [Star Brush](http://codepen.io/scottgarner/pen/ltImK)

---

### p5.sound Classes That We'll Use For Music Visualizations:

[**p5.AudioIn**](http://p5js.org/reference/#/p5.AudioIn) - *microphone!* [documentation](http://p5js.org/reference/#/p5.AudioIn) | [source code](https://github.com/processing/p5.js-sound/blob/master/src/audioin.js)

[**p5.SoundFile**](http://p5js.org/reference/#/p5.SoundFile) - *load and play .mp3 / .ogg files.*   [documentation](http://p5js.org/reference/#/p5.SoundFile) | [source code](https://github.com/processing/p5.js-sound/blob/master/src/soundfile.js)
- ```loadsound()``` creates a SoundFile using a Web Audio API buffer. Use during ```preload()```, or with a callback, or with drag and drop.

[**p5.PeakDetect**](http://p5js.org/reference/#/p5.PeakDetect) - *detect beats and/or onsets within a frequency range* [documentation](http://p5js.org/reference/#/p5.PeakDetect) }| [source code](https://github.com/processing/p5.js-sound/blob/master/src/peakdetect.js)

[**p5.Amplitude**](http://p5js.org/reference/#/p5.Amplitude) - *Analyze volume (amplitude).* [documentation](http://p5js.org/reference/#/p5.Amplitude) | [source code](https://github.com/processing/p5.js-sound/blob/master/src/amplitude.js) 
- ```.getLevel()``` returns a Root Mean Square (RMS) amplitude reading, between 0.0 and 1.0, usually peaking at 0.5
- ```.smooth()```

[**p5.FFT**](http://p5js.org/reference/#/p5.FFT) - *Analyze amplitude over time / frequency.* [documentation](http://p5js.org/reference/#/p5.FFT) | [source code](https://github.com/processing/p5.js-sound/blob/master/src/fft.js) 
- ```.analyze()``` returns amplitude readings from 0-255 in the frequency domain.
- ```.waveform()``` returns amplitude readings from -1 to 1 in the time domain. [demo](http://therewasaguy.github.io/p5-music-viz/demos/03_time_domain_oscilloscope) | [source](https://github.com/therewasaguy/p5-music-viz/blob/master/demos/03_time_domain_oscilloscope/sketch.js)


***Music included in the demos/repo:***
- [Yacht](http://teamyacht.com/) - Summer Song (Instrumental) - [See Mystery Lights Instrumentals](http://freemusicarchive.org/music/YACHT/See_Mystery_Lights_Instrumentals/) [Creative Commons BY-NC-SA](http://creativecommons.org/licenses/by-nc-sa/3.0/us/)
- [Broke For Free](http://brokeforfree.bandcamp.com/) - As Colorful As Ever - [Layers](http://freemusicarchive.org/music/Broke_For_Free/Layers/) - [Creative Commons BY-NC](http://creativecommons.org/licenses/by-nc/3.0/)
- [Alaclair Ensemble](http://alaclair.com/) - Twit Journalist - [This Is America](http://freemusicarchive.org/music/Alaclair_Ensemble/This_Is_America/) - [Creative Commons BY-SA](http://creativecommons.org/licenses/by-sa/3.0/)
- [Peter Johnston](https://freemusicarchive.org/music/Peter_Johnston/) - La ere gymnopedie (Erik Satie) - [Best of Breitband Vol1](https://freemusicarchive.org/music/Various_Artists_Breitband/Best_Of_Breitband_Vol_1/)
- [Inara George](https://www.facebook.com/inarageorge) - Q - [Sargent Singles Vol 1](http://freemusicarchive.org/music/inara_george/sargent_singles_volume_1/01_q) [Creative Commons BY-NC-SA](http://creativecommons.org/licenses/by-nc-sa/3.0/us/)
- For more Creative Commons resources, check out the [Free Music Archive's Guide to Online Audio Resources](https://docs.google.com/document/d/1mbF5vgWp9duoGMxNl-Y8tEyWbFhkgw0JBK8F7A2cg68/edit?usp=sharing)

----

# Dig Deeper into Web Audio Music Visualization...
* [Pitch Detection - Web Audio Demo](https://webaudiodemos.appspot.com/pitchdetect/)
* [Another Approach to Beat Detection Using Web Audio API](http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/)
* [Making Audio Reactive Visuals w/ Web Audio API](http://www.airtightinteractive.com/2013/10/making-audio-reactive-visuals/)
* [Marius Watz' Sound As Data workshop with Processing](https://github.com/mariuswatz/ITP2013Parametric/blob/master/ITP-workshops/20131111-ITP-Sound-As-Data/) // [blog post](http://workshop.evolutionzone.com/2013/11/12/itp-sound-as-data-workshop-code/)
* Echo Nest [Remix API](http://echonest.github.io/remix/) can get you beats, tatums, [regular API](http://developer.echonest.com/docs/v4) has more data about music/artists/songs.
* [p5.gibber](http://charlie-roberts.com/gibber/p5-gibber/) Rapid music sequencing and synthesis. Also its own [live coding environment](http://gibber.mat.ucsb.edu/).
* [Tone.js](https://github.com/TONEnoTONE/Tone.js) is a JS library for composing interactive music.
* [dancer.js](https://github.com/jsantell/dancer.js) is a JS library for audio visualizations.
* [heartbeat.js](http://abudaan.github.io/heartbeat/) is a JS library for working with MIDI.

# Deeper into DSP
* [Music and Computers online book, Columbia University](http://music.columbia.edu/cmc/MusicAndComputers/)
* [A Compact Primer on Digital Signal Processing](http://jackschaedler.github.io/circles-sines-signals/)

# Music Visualization Inspiration...
* [Kandinsky's Color Theory](http://lettersfrommunich.wikispaces.com/Kandinsky's+Color+Theory)

**Notation**
* [Optical Poem, Oskar Fischinger's 1938 visualization of Franz Liszt's "2nd Hungarian Rhapsody"](https://www.youtube.com/watch?v=they7m6YePo)
* [Notations21](http://www.notations21.net/)
* [Piano Phase (Alex Chen)](http://www.pianophase.com/)
* [George & Jonathan](http://www.georgeandjonathan.com/)
* [dennis.video, generative video by George ^](http://www.dennis.video/)
* [Stephen Malinowski's Music Animation Machine](http://www.musanim.com/)
* [Artikulation (Rainer Wehinger / Gyorgy Ligeti)](https://www.youtube.com/watch?v=71hNl_skTZQ)
* [animatednotation.com](http://animatednotation.com)
* [John Whitney](https://www.youtube.com/watch?list=PLReZkoQinwGwrB_XqiBMqfRpq5gxDB03Z&v=ZrKgyY5aDvA)
* [Mark Fell - Skydancer](https://www.youtube.com/watch?v=XnemXS9bVhk)

**Interactive**
* [computer.jazz (Yotam Mann, Sarah Rothberg)](http://computer.jazz)
* [Patatap (Jono Brandel)](http://www.patatap.com/)
* [jeffro / xtal](http://jeffro.nfshost.com/)
* [Incredibox](http://indredibox.com)

**Audio**
* [Cymatics](https://vimeo.com/111593305)
* [Golan Levin, Zach Lieberman, Jaap Blonk, Joan La Barbara (w/ autocorrelation)](https://vimeo.com/25037421)
* [Oscillator Art (TK Broderick)](http://oscillator-art.herokuapp.com)
* [Music Makes You Travel (makio135)](http://www.openprocessing.org/sketch/138877)
* [Ripple](http://wemakeawesomesh.it/musicviz/ripple/)
* [Ryoji Ikeda](https://www.youtube.com/watch?v=omDK2Cm2mwo)

**Data Sonification**
* [Listening to the Data](http://blog.chartbeat.com/2013/10/09/listening-to-the-data/)
* [Listen to Wikipedia](http://listen.hatnote.com/)
* [Metadata - Echo Nest's Map of Musical Styles](http://static.echonest.com/playlist/moms/)
* [Making Music with Tennis Data](https://www.youtube.com/watch?v=BUkwbsd-NcA)
* [Sonifying the Flocking Algorithm (@b2renger)](http://b2renger.github.io/pages_p5js/flock/index.html)

**Musical Form**
* [The Shape of Song (Martin Wattenberg)](http://www.bewitched.com/song.html)
* [Infinite Jukebox (Paul Lamere / Echo Nest)](http://labs.echonest.com/Uploader/index.html?trid=TRSFLTX13AFB700570)

**Lyrics**
* [Solar (Robert Hodgin)](https://vimeo.com/658158)
* [Lyrical Particles (Salem Al-Mansoori)](https://vimeo.com/80573061)
