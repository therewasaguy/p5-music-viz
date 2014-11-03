/*
  Analyze the frequency spectrum with FFT (Fast Fourier Transform)
  Draw a 1024 particles system that represents bins of the FFT frequency spectrum. 
  All from p5js.org
  Modified by Mark Moriarty at Mozilla Fest, fun hack!
 */

var mic, recorder, musicFile, soundFile; // input sources, press T to toggleInput()
var state = 0; // from recorder demo
var readyToRecord=0;
var currentInput = 0;
var fft;
var smoothing = 0.6; // play with this, between 0 and .99
var binCount = 256; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
var particles =  new Array(binCount);

// from http://p5js.org/learn/examples/Image_Background_Image.php
var x=0;

var maxTextSize=30; // I'm making this up
var textSizeRatio = 1;

// from http://p5js.org/learn/examples/Image_Transparency.php
var img;
var offset = 0;
var easing = 0.05;

var maxRecordingTime = 15; // number of seconds

var txt;
// var startMessage = "Press the letter T to begin";
var pauseMusicMessage = "(P)ause song or (R)ecord yourself";
var playMusicMessage = "(P)lay song";
// var toggleMessage = "Press T to activate microphone";
var allowMicMessage = "You must 'allow microphone'";
var startRecMessage = "Press Space to begin recording";
var restartRecMessage = "(S)ave, (C)heck, or Space = restart recording ";
var stopRecMessage = "Press Space to stop recording ";

// Note: the logic of using these is off... will need to fix the triggers for the different messages


// var micPermissionReceived = 0;
var numberRecsMade = 0;
var haveTriedToRecord = 0; // ++ when you hit T for first time

// preload ensures that the sound is loaded and ready to play in time for setup
function preload() {
  // soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.ogg')
  // musicFile = loadSound('https://s3.amazonaws.com/shareducate02/skyscraper.mp3');
  // Let's use a Creative Commons track
  // from http://freemusicarchive.org/music/Josh_Woodward/Dirty_Wings/JoshWoodward-DW-01-IWantToDestroySomethingBeautiful
  musicFile = loadSound('https://s3.amazonaws.com/shareducate02/Josh_Woodward--I_Want_To_Destroy_Something_Beautiful--Creative_Commons.mp3');
  
}

function setup() {
    c = createCanvas(windowWidth, windowHeight);
    noStroke();

    musicFile.play();
    mic = new p5.AudioIn();

    // initialize the FFT, plug in our variables for smoothing and binCount
    fft = new p5.FFT(smoothing, binCount);
    fft.setInput(musicFile);


    // instantiate the particles.
    for (var i = 0; i < particles.length; i++) {
      var position = createVector(
        // x position corresponds with position in the frequency spectrum
        map(i, 0, binCount, 0, width * 2),
        random(0, height)
      );
      particles[i] = new Particle(position);
    }

    // Adding code to save recording
    // ===============
    // create a sound recorder
   recorder = new p5.SoundRecorder();
    
    // connect the mic to the recorder
   recorder.setInput(mic);
    
    // this sound file will be used to
    // playback & save the recording
   soundFile = new p5.SoundFile();  // different to pre-recorded "soundFile" in this example
}

function draw() {
    background(0, 0, 70, 30);
    
    fill(255, 255, 255); // this is the colour of text
    // txt=playMusicMessage;

    if (musicFile.isPlaying() ) {
         txt = pauseMusicMessage;
        // txt += " or \n\r"+toggleMessage;
    } 
    else {
        if( state==0 && mic.enabled){
          // not recording, but have authorised mic
            if(numberRecsMade==0){
              txt = startRecMessage;
            }
            else{
              txt = restartRecMessage;
              txt += " "+Math.round(soundFile.duration() * 10) / 10;
              txt += "s"
            }  
        }
        else if (state==0){
          // not recording, haven't tried or succeeded to authorise mic
            if (haveTriedToRecord>0){
              // we have hit the letter T at least once
              txt = allowMicMessage;        
            }
            else{
              // we've never hit the letter T
              txt = playMusicMessage;
            }
       }    


       if(state==1){
        // mid-recording
          background(150,0,0);
          // image(img, 0, 0);  // Display at full opacity
          // Set colors
          // fill(204, 101, 192, 127);
          fill(255, 0, 0, 255);
          // stroke(226, 204, 0);
          // stroke(127, 63, 120);
          // line(x, 0, x, height);

          // Yet to write code ro incorporate maxRecordingTime
          // x = soundFile.currentTime()/maxRecordingTime * width;

          x++;
          x++; // to speed it up

          // original code lets the thing loop over..
          // if (x > width) {
          //   x = 0; 
          // }
          // I'll make it just once left-to-right    
          if (x > width) {
              recorder.stop(); 
              // text('Stopped', 20, 20);
              numberRecsMade++;
              state--; // back to ready mode
              x = 0;
              x = 0; 
          }



          // make it flash as we near the end:
          if (x > 0.88*width && x<=0.91* width) {
            fill(55, 0, 0, 255);
          }
          else if (x > 0.94*width && x<=0.97* width) {
            fill(55, 0, 0, 255);
          }  
          else if (x > 0.91*width && x<=0.94* width) {
            fill(255, 200, 200, 255);
          }
          else if (x > 0.97*width) {
            fill(255, 200, 200, 255);
          }
          // tint(0, 127);  // Display at half opacity
          rect(0, 0, x, height);
          // text('Recording! ', 200, 200);
          txt = stopRecMessage;
          // txt += soundFile.duration();
          // txt += "s";
          // show recording bar  
      } 

    }



  /// All the writing bits (Mark Moriarty)

    // console.log(textWidth(startMessage));
    // console.log(getAudioContext());

  ///


    // returns an array with [binCount] amplitude readings from lowest to highest frequencies
    var spectrum = fft.analyze(binCount);

    // update and draw all [binCount] particles!
    // Each particle gets a level that corresponds to
    // the level at one bin of the FFT spectrum. 
    // This level is like amplitude, often called "energy."
    // It will be a number between 0-255.
    for (var i = 0; i < binCount; i++){
      var thisLevel = map(spectrum[i], 0, 255, 0, 1);
      particles[i].update( thisLevel );
      particles[i].draw();

      // update x position (in case we change the bin count)
      particles[i].position.x = map(i, 0, binCount, 0, width * 2);
    }
    textSize(maxTextSize);
    textSizeRatio = width/textWidth(txt);
    if (abs(textSizeRatio)>0.1){
      maxTextSize *= .9*textSizeRatio;
    }

    textSize(maxTextSize);
    textAlign(CENTER);
    fill(255,255,255);
    text(txt, width/2, height/2);


}

// ===============
// Particle class
// ===============

var Particle = function(position) {
      this.position = position;
      this.scale = random(0, 1);
      this.speed = createVector(0, random(4, 10) ); // values from 0 to 10
      if(state==1){
          // we are recording, let's keep everything red
          this.color = [100, 0, 0];  // has no effect... because they're finished being made in setup()
          stroke(226, 204, 0);
      }
      else{
          this.color = [random(0, 255), random(0,255), random(0,255)];  
      }
      
};

var theyExpand = 1;

// use FFT bin level to change speed and diameter
Particle.prototype.update = function(someLevel) {
      this.position.y += this.speed.y / (someLevel*3);
      if (this.position.y > height) {
        this.position.y = 0;
      }
      // this.diameter = 2.7*log(map(someLevel, 0, 1, 0, 100) * this.scale * theyExpand);
      this.diameter = map(someLevel, 0, .7, 0, 100) * this.scale * theyExpand;

}

Particle.prototype.draw = function() {
      fill(this.color);
      ellipse(
        this.position.x, this.position.y,
        this.diameter, this.diameter
      );
};

// ================
// Helper Functions
// ================

function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
      background(0);
}



// To prevent feedback, mic doesnt send its output.
// So we need to tell fft to listen to the mic, and then switch back.
function toggleInput() {
    if (musicFile.isPlaying() ) {
        musicFile.pause();
        if(mic.enabled==0){
          mic.start();
          fft.setInput(mic);
        } 



        text('keyPress to record', 20, 20);


       // ===============
       // End of code to save recording
       // ===============

    } 
    else {
        musicFile.play();
        // mic.stop(); trying uncommenting this so we don't have to get permission each time?
        currentInput = 0;
        fft.setInput(musicFile);
      }  
}


function keyPressed() {
      if (key == 'R') {
        toggleInput();
        haveTriedToRecord ++; 
        // note, not equal to number of times we record, \
        // just goes from 0 to one the first time we switch \
        // to microphone, then is redundant variable

      }
      else if (key == 'S') {
        // if (state==0) {
        //   recorder.stop();
        // };
        // preload(soundFile);
        // soundFile.play(); // play the result!
        // text('Saving...', 20, 20);
        save(soundFile, 'awedify-demo.wav');
        // state++;
      }
      else if (key == 'P') {
         if (musicFile.isPlaying() ) {
            musicFile.pause();
         }
         else{
           musicFile.play();
         }
      }
      else if (key == 'C') { // C for "Check"
        soundFile.play(); // play the result!
         
      }
            // make sure user enabled the mic
      else if (state === 0 && mic.enabled) { // we are not recording, so let's begin
      
        // record to our p5.SoundFile

        recorder.record(soundFile); 
        // ===============

        // background(255,0,0);
        // text('Recording!', 200, 20);
        state++;

      }
      else if (state === 1) { // we are recording, so let's stop
        // background(0,255,0);

        // stop recorder and
        // send result to soundFile
        recorder.stop(); x
        
        // text('Stopped', 20, 20);
        numberRecsMade++;
        state--; // back to ready mode
        x = 0;
      }

      // else if (state === 2) {
      //   soundFile.play(); // play the result!
      //   save(soundFile, 'mySound.wav');
      //   state++;
      // }
}