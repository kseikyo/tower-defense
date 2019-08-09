let myFont; //The font we'll use throughout the app

let gameOver = false; //If it's true the game will render the main menu
let gameBeginning = true; //Should be true only before the user starts the game for the first time

//===Game objects
//Declare game objects here like player, enemies etc
let nodes = [];


//===Buttons
let playButton;
let soundButton;
let leaderboardButton;


//===Score data
let score = 0;
let scoreGain;

//===Data taken from Game Settings
let startingLives;
let lives;

//===Images
let imgLife;
let imgBackground;

//===Audio
let sndMusic;
let sndTap;

let soundEnabled = true;
let canMute = true;

let soundImage;
let muteImage;


//===Size stuff
let objSize; //base size modifier of all objects, calculated based on screen size

//game size in tiles, using bigger numbers will decrease individual object sizes but allow more objects to fit the screen
//Keep in mind that if you change this, you might need to change text sizes as well
let gameSize = 18;

let isMobile = false;
let touching = false; //Whether the user is currently touching/clicking

//===This function is called before starting the game
function preload() {
  //===Load font from google fonts link provided in game settings
  var link = document.createElement('link');
  link.href = Koji.config.strings.fontFamily;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  myFont = getFontFamily(Koji.config.strings.fontFamily);
  let newStr = myFont.replace("+", " ");
  myFont = newStr;
  //===

  //===Load images

  //Load background if there's any
  if (Koji.config.images.background != "") {
    imgBackground = loadImage(Koji.config.images.background);
  }

  imgLife = loadImage(Koji.config.images.lifeIcon);

  soundImage = loadImage(Koji.config.images.soundImage);
  muteImage = loadImage(Koji.config.images.muteImage);

  //===Load Sounds here
  //Include a simple IF check to make sure there is a sound in config, also include a check when you try to play the sound, so in case there isn't one, it will just be ignored instead of crashing the game
  if (Koji.config.sounds.tap) sndTap = loadSound(Koji.config.sounds.tap);

  //Music is loaded in setup(), to make it asynchronous


  //===Load settings from Game Settings
  startingLives = parseInt(Koji.config.strings.lives);
  lives = startingLives;
  scoreGain = parseInt(Koji.config.strings.scoreGain);


}
function setup() {
  width = window.innerWidth;
  height = window.innerHeight;

  //===How much of the screen should the game take, this should usually be left as it is
  let sizeModifier = 0.75;
  if (height > width) {
    sizeModifier = 1;
  }

  createCanvas(width, height);

  //Magically determine basic object size depending on size of the screen
  objSize = floor(min(floor(width / gameSize), floor(height / gameSize)) * sizeModifier);

  isMobile = detectMobile();

  textFont(myFont); //set our font

  document.body.style.fontFamily = myFont;


  playButton = new PlayButton();
  soundButton = new SoundButton();
  leaderboardButton = new LeaderboardButton();

  gameBeginning = true;


  //Load music asynchronously and play once it's loaded
  //This way the game will load faster
  if (Koji.config.sounds.backgroundMusic) sndMusic = loadSound(Koji.config.sounds.backgroundMusic, playMusic);



}

//Resizes canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  width = window.innerWidth;
  height = window.innerHeight;

  //===How much of the screen should the game take, this should usually be left as it is
  let sizeModifier = 0.75;
  if (height > width) {
    sizeModifier = 1;
  }

  //Magically determine basic object size depending on size of the screen
  objSize = floor(min(floor(width / gameSize), floor(height / gameSize)) * sizeModifier);

}

function draw() {

  //Manage cursor - show it on main menu, and hide during game, depending on game settings
  if (!gameOver && !gameBeginning) {
    if (!Koji.config.strings.enableCursor) {
      noCursor();
    }
  } else {
    cursor(ARROW);
  }


  //Draw background or a solid color
  if (imgBackground) {
    background(imgBackground);
  } else {
    background(Koji.config.colors.backgroundColor);
  }

  //===Draw UI
  if (gameOver || gameBeginning) {

    //From utilities.js
    drawMainMenu();

  } else {

    //Update and render all game objects here
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].render();
    }


    //===Update all floating text objects
    for (let i = 0; i < floatingTexts.length; i++) {
      floatingTexts[i].update();
      floatingTexts[i].render();
    }

    //===Ingame UI

    //===Score draw
    let scoreX = width - objSize / 2;
    let scoreY = objSize / 3;
    textSize(objSize * 2);
    fill(Koji.config.colors.scoreColor);
    textAlign(RIGHT, TOP);
    text(score, scoreX, scoreY);

    //Lives draw
    let lifeSize = objSize;
    for (let i = 0; i < lives; i++) {
      image(imgLife, lifeSize / 2 + lifeSize * i, lifeSize / 2, lifeSize, lifeSize);
    }

    cleanup();

  }

  soundButton.render();
}


//===Go through objects and see which ones need to be removed
//A good practive would be for objects to have a boolean like removable, and here you would go through all objects and remove them if they have removable = true;
function cleanup() {
  for (let i = 0; i < floatingTexts.length; i++) {
    if (floatingTexts[i].timer <= 0) {
      floatingTexts.splice(i, 1);
    }
  }
}


//===Handle input
function touchStarted() {

  if (gameOver || gameBeginning) {

  }

  if (soundButton.checkClick()) {
    toggleSound();
    return;
  }

  if (!gameOver && !gameBeginning) {
    //Ingame
    touching = true;


    //EXAMPLE
    if (sndTap) sndTap.play();
    score += scoreGain;
    floatingTexts.push(new FloatingText(mouseX, mouseY, scoreGain, Koji.config.colors.scoreColor, objSize));

    //===
  }
}

function touchEnded() {
  //===This is required to fix a problem where the music sometimes doesn't start on mobile
  if (soundEnabled) {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
  }

  touching = false;
}


//Keyboard input
/*
For non-ASCII keys, use the keyCode variable. You can check if the keyCode equals:

BACKSPACE, DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, OPTION, ALT, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW.
*/

function keyPressed() {
  if (!gameOver && !gameBeginning) {
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
    }

    if (key == 'p') {
      console.log("Pressed: p")
    }

  }

  //submitScore();
}

//Same usage as keyPressed, but is called on key released instead
function keyReleased() {
  if (!gameOver && !gameBeginning) {

  }
}

//===Call this every time you want to start or reset the game
//This is a good place to clear all arrays like enemies, bullets etc before starting a new game
//It gets called when you press the PLAY button
function init() {
  gameOver = false;

  score = 0;
  lives = startingLives;

  //Clear out all arrays
  floatingTexts = [];


  //EXAMPLE
  spawnNodes();
  //===

}

//EXAMPLE
function spawnNodes() {
  let nodeCount = floor(random(80, 100));
  if (isMobile) {
    nodeCount = 30;
  }
  for (let i = 0; i < nodeCount; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let node = new Node(x, y);
    nodes.push(node);
    node.changeVelocity();
  }
}
//===


//===Call this when a lose life event should trigger
function loseLife() {

  lives--;
  if (lives <= 0) {
    gameOver = true;

    // Go to leaderboard submission
    window.setScore(score);
    window.setAppView('setScore');
    if (sndMusic) {
      sndMusic.stop();
    }
  }
}


//===The way to use Floating Text:
//floatingTexts.push(new FloatingText(...));
//Everything else like drawing, removing it after it's done etc, will be done automatically
function FloatingText(x, y, txt, color, size) {
  this.pos = createVector(x, y);
  this.size = 1;
  this.maxSize = size;
  this.timer = 1;
  this.txt = txt;
  this.color = color;

  this.update = function () {
    if (this.timer > 0.3) {
      if (this.size < this.maxSize) {
        this.size = Smooth(this.size, this.maxSize, 4);
      }
    } else {
      this.size = Smooth(this.size, 0.01, 4);
    }


    this.timer -= 1 / frameRate();
  }

  this.render = function () {
    textSize(this.size);
    fill(this.color);
    textAlign(CENTER, BOTTOM);
    text(this.txt, this.pos.x, this.pos.y);
  }
}
