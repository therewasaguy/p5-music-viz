/*
  Load and play a sound. Preload ensures that the sound has loaded by the time
  setup is called.
 */
var sound;

// load stuff before setup
function preload() {
  sound = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
}

// now the sound is loaded. Play!
function setup() {
  sound.play();
}