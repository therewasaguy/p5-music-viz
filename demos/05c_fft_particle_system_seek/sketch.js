/**
 *  Adding sound to an example originaly by Zhenzhen Qi
 *  
 *  http://zhenzhenqi.info/COMP104demo/contact.html
 */

var mic, soundFile; // input sources, press T to toggleInput()
var fft;
var smoothing = 0.8; // play with this, between 0 and .99
var binCount = 256; // size of resulting FFT array. Must be a power of 2 between 16 and 1024


//create an array for storing all bird objects
var birds = [];
var birdNumber = binCount;


// preload ensures that the sound is loaded and ready to play in time for setup
function preload() {
  soundFile = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3')
}

function setup() {

    //create full width and full height p5 canvas
    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);

    // img = loadImage("img/cloud.png"); 

    for (var i = 0; i < birdNumber; i++) {
        birds.push(new Bird(random(0, windowWidth), random(0, windowHeight)));
    }

    // mic = new p5.AudioIn();
    // mic.start();
    soundFile.play();

    // initialize the FFT, plug in our variables for smoothing and binCount
    fft = new p5.FFT(smoothing, binCount);
    fft.smooth(0.2);
    fft.setInput(soundFile);


}


function draw() {
    //instead of using clear(), we draw a semi-transparent rectangle as big as the screen.
    //because it has color filled (white), so every frame it overlaps some of the piexels. 
    //so we will have trace effect caused by not clearing the canvas
    fill(255, 255, 255, 50);
    rect(0, 0, windowWidth, windowHeight);

    var spectrum = fft.analyze(binCount);

    // var mousePos = createVector(mouseX, mouseY); //create a vector to store mouse's position
    var center = createVector(windowWidth/2, windowHeight/2);

    for (var i = birds.length - 1; i >= 0; i--) {

        if (spectrum[i] > 100 || spectrum[i] < 20) {
          birds[i].maxforce = ( map(spectrum[i], 0, 255, 0.2, -0.5 ) );
          birds[i].maxspeed = ( map(spectrum[i], 0, 255, 1, 3 ) );
        }

        birds[i].seek(center);
        birds[i].update();
        birds[i].display();

    };
}

//the Bird Class, uppercase B of class name for best practice
function Bird(x, y) {

    this.location = createVector(x, y); //create at (x,y)
    //x & y would be passed in when an object is creted

    this.velocity = createVector(-2, -2); //just a random value...
    this.acceleration = createVector(0, 0); //make it 0 for now
    this.r = 5; //radius of the "bird"
    this.maxforce = random(0.001, 0.01);
    this.maxspeed = random(1, 3);



    //finally, move the bird by adding velocity to location
    this.update = function () {

        //update velocity
        this.velocity.add(this.acceleration);

        //limit speed
        this.velocity.limit(this.maxspeed);
        this.location.add(this.velocity);

        //reset acceleration to 0 each cycle. 
        this.acceleration.mult(0);

        if (this.location.x > width || this.location.x < 0 || this.location.y > height || this.location.y < 0) {
          this.location.x = width/2;
          this.location.y = height/2;
        }
    }

    this.seek = function (target) {

        var desired = p5.Vector.sub(target, this.location);

        //normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus velocity (just remember this magic formule..)
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); //don't turn too fast, otherwise we lost the steering animation

        //apply the force, we got the acceleration!
        this.acceleration.add(steer);
    }

    this.display = function () {
        fill(0);
        noStroke();
        //use this code to draw the image you loded in setup()//
        // image(img, this.location.x, this.location.y);
        
        //or use this code to draw ellipse, like we did previously in class.
       ellipse(this.location.x, this.location.y, this.r, this.r);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}