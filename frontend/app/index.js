let imgBackground;
let imgCursor;

let towers = [];
let enemyes = [];
let imgEnemy1;
let imgEnemy2;
let imgEnemy3;

let x = 50;
let y = 0;
let speedX = 1;
let speedY = 1;

let sndTap;

let score;

//===This function is called before starting the game
//Load everything here
function preload() {

    if (Koji.config.images.background != "") {
        imgBackground = loadImage(Koji.config.images.background);
    }

    if (Koji.config.images.enemy1 != "") {
        imgEnemy1 = loadImage(Koji.config.images.enemy1);
        enemyes.push(imgEnemy1);
    }

    if (Koji.config.images.enemy2 != "") {
        imgEnemy2 = loadImage(Koji.config.images.enemy2);
        enemyes.push(imgEnemy2);
    }

    if (Koji.config.images.enemy3 != "") {
        imgEnemy3 = loadImage(Koji.config.images.enemy3);
        enemyes.push(imgEnemy3);
    }    
    imgCursor = loadImage(Koji.config.images.cursor);
    //===Load Sounds here
    //Include a simple IF check to make sure there is a sound in config, also include a check when you try to play the sound, so in case there isn't one, it will just be ignored instead of crashing the game
    if (Koji.config.sounds.tap) sndTap = loadSound(Koji.config.sounds.tap);

}


//This function runs once after the app is loaded
function setup() {
    //Set our canvas size to full window size
    width = window.innerWidth;
    height = window.innerHeight;

    createCanvas(width, height);

    score = 0;
}

function draw() {

    //Draw background if there is one or a solid color
    if (imgBackground) {
        background(imgBackground);
    } else {
        background(Koji.config.colors.backgroundColor);
    }

    for (let i = 0; i < 3; i++) {
      image(enemyes[i], x, y, 48, 48);
      if( x < 0) {
        speedX *= -1;
        if (sndTap) sndTap.play();
      }
      if( x > width-48) {
        speedX *= -1;
        if (sndTap) sndTap.play();
      }
      if ( y < 0){
        speedY *= -1;
        if (sndTap) sndTap.play();
      }
      if ( y > height-48) {
        speedY *= -1;
        if (sndTap) sndTap.play();
      }

      x += speedX;
      y += speedY ;
    }

    image(imgCursor, mouseX, mouseY, 50, 50);

    fill(Koji.config.colors.titleColor);
    textAlign(CENTER, TOP);
    textSize(15);
    text(Koji.config.strings.title, width / 2, 20);


}


//===Handle mouse/tap input here
function touchStarted() {

    //Play sound
    if (sndTap) sndTap.play();
}

function touchEnded() {

}

//Keyboard input
/*
For non-ASCII keys, use the keyCode variable. You can check if the keyCode equals:

BACKSPACE, DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, OPTION, ALT, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW.
*/

function keyPressed() {

    //Ingame
    if (keyCode == UP_ARROW) {
        console.log("up")
    }
    if (keyCode == DOWN_ARROW) {
        console.log("down")
    }
    if (keyCode == LEFT_ARROW) {
        console.log("left")
    }
    if (keyCode == RIGHT_ARROW) {
        console.log("right")
    }

    if (key == ' ') {
        console.log("Space")
        score = 50;
        submitScore();
    }

    if (key == 'p') {
        console.log("Pressed: p")
    }

}

//Same usage as keyPressed, but is called on key released instead
function keyReleased() {

}


//Takes the player to the "setScore" view for submitting the score to leaderboard
//Notice that it makes use of the "score" variable. You can change this if you wish.
function submitScore() {
    window.setScore(score);
    window.setAppView("setScore");
}