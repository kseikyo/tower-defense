let imgBackground;
let imgCursor;
let cursor;
let imgTile_1;
let imgTile_2;

// GAME OBJECTS
let towers = [];
let enemies = [];

let spritedata;

let imgEnemy1;
let imgEnemy2;
let imgEnemy3;

// GAME OBJECTS CONFIGURATIONS
let shift_path = false;
let launch_wave = false;

let gameOver = true;

let speedX = 5;
let speedY = 5;

let cols = 10;
let rows = 10;

//Sizing
let objSize; //base size modifier of all objects, calculated based on screen size

//game size in tiles, using bigger numbers will decrease individual object sizes but allow more objects to fit the screen
//Keep in mind that if you change this, you might need to change text sizes as well
let gameSize = 18;
let gameWidth;

// OTHER CONFIGURATIONS
let sndTap;
let tale = 9;
let score;
let isReady = false;

//===This function is called before starting the game
//Load everything here
function preload() {

    // if (Koji.config.images.background != "") {
    //     imgBackground = loadImage(Koji.config.images.background);
    // }

    if (Koji.config.images.enemy_sprite != "") {
        spritedata = loadImage(Koji.config.images.enemy_sprite);

    }
    else {
        if (Koji.config.images.enemy1 != "") {
            imgEnemy1 = loadImage(Koji.config.images.enemy1);
            enemies.push(imgEnemy1);
        }

        if (Koji.config.images.enemy2 != "") {
            imgEnemy2 = loadImage(Koji.config.images.enemy2);
            enemies.push(imgEnemy2);
        }

        if (Koji.config.images.enemy3 != "") {
            imgEnemy3 = loadImage(Koji.config.images.enemy3);
            enemies.push(imgEnemy3);
        }
    }

    if (Koji.config.images.cursor != "") {
        imgCursor = loadImage(Koji.config.images.cursor);
    }
    if (Koji.config.images.ground_1 != "") {
        imgTile_1 = loadImage(Koji.config.images.ground_1);
    }
    if (Koji.config.images.ground_2 != "") {
        imgTile_2 = loadImage(Koji.config.images.ground_2);
    }
    //===Load Sounds here
    //Include a simple IF check to make sure there is a sound in config, also include a check when you try to play the sound, so in case there isn't one, it will just be ignored instead of crashing the game
    //if (Koji.config.sounds.tap) sndTap = loadSound(Koji.config.sounds.tap);
    towers[0] = new Tower();
}


//This function runs once after the app is loaded
function setup() {
    //Set our canvas size to full window size
    width = window.innerWidth;
    height = window.innerHeight;

    noCursor();
    let sizeModifier = 0.65;
    if (height > width) {
        sizeModifier = 1;
    }

    //Get the lower one, used for centering the game
    gameWidth = min(width, height);

    playButton = new PlayButton();
    soundButton = new SoundButton();
    leaderboardButton = new LeaderboardButton();
    roundButton = new StartRoundButton();
    towerButton = new TowerButton(9);

    isMobile = detectMobile();

    createCanvas(width, height);

    //Magically determine basic object size depending on size of the screen
    objSize = floor(min(floor(width / gameSize), floor(height / gameSize)) * sizeModifier);


    score = 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    width = window.innerWidth;
    height = window.innerHeight;

    //===How much of the screen should the game take, this should usually be left as it is
    let sizeModifier = 0.65;
    if (height > width) {
        sizeModifier = 1;
    }

    //Get the lower one, used for centering the game
    gameWidth = min(width, height);



    //Magically determine basic object size depending on size of the screen
    objSize = floor(min(floor(width / gameSize), floor(height / gameSize)) * sizeModifier);

}


function draw() {

    //Draw background if there is one or a solid color
    // if (imgBackground) {
    //     background(imgBackground);
    // } else {
    //     background(Koji.config.colors.backgroundColor);
    // }
    if (gameOver) {
        background(Koji.config.colors.backgroundColor);
        showInstructions();
        image(imgCursor, mouseX, mouseY);
    } else {
        drawBackground();




        //  Drawing tower being dragged
        // for(let i = 0 ; i < len; i++) {
        //     if(towers[i].isDragging && !towers[i].isPlaced) {
        //         offsetX = mouseX;
        //         offsetY = mouseY;
        //         towers[i].show(offsetX, offsetY);
        //     }else{
        //         towers[i].show(towers[i].position.x, towers[i].position.y);
        //     }
        // }

        if (launch_wave) {
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].move(); 
            }
        }
        else{
            fill(0);
            textAlign(CENTER, TOP);
            textSize(32);
            roundButton.update();
            roundButton.btn.draw();
            // text('Press a mouse button to launch a wave!', 0, 10, width);
        }
        image(imgCursor, mouseX, mouseY);
    
}

}


//===Handle mouse/tap input here
function touchStarted() {

    if (soundButton.checkClick()) {
        toggleSound();
        return;
    }
    //launch_wave = true;
    //Play sound
    //if (sndTap) sndTap.play();
}

function showInstructions() {
    let titleText = Koji.config.strings.title;
    let titleSize = floor(objSize * 2);
    textSize(titleSize);

    //Resize title until it fits the screen
    while (textWidth(titleText) > width * 0.7) {
        titleSize *= 0.9;
        textSize(titleSize);
    }
    fill(Koji.config.colors.titleColor);
    textAlign(CENTER, TOP);
    text(Koji.config.strings.title, width / 2, objSize * 1.5);

    //===Draw instructions
    let instructionsText = [];
    instructionsText[0] = Koji.config.strings.instructions1;
    instructionsText[1] = Koji.config.strings.instructions2;
    instructionsText[2] = Koji.config.strings.instructions3;

    let instructionsSize = [];

    for (let i = 0; i < instructionsText.length; i++) {
        instructionsSize[i] = floor(objSize * 0.75);
        textSize(instructionsSize[i]);

        //Resize text until it fits the screen
        while (textWidth(instructionsText[i]) > width * 0.9) {
            instructionsSize[i] *= 0.9;
            textSize(instructionsSize[i]);
        }
    }

    textSize(instructionsSize[0]);
    fill(Koji.config.colors.instructionsColor);
    textAlign(CENTER, TOP);
    text(instructionsText[0], width / 2, objSize * 5);

    textSize(instructionsSize[1]);
    fill(Koji.config.colors.instructionsColor);
    textAlign(CENTER, TOP);
    text(instructionsText[1], width / 2, objSize * 7);

    textSize(instructionsSize[2]);
    fill(Koji.config.colors.instructionsColor);
    textAlign(CENTER, TOP);
    text(instructionsText[2], width / 2, objSize * 9);

    playButton.update();
    playButton.btn.draw();

    leaderboardButton.update();
    leaderboardButton.btn.draw();
}

function drawBackground() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * width / cols;
            let y = j * height / rows;
            if (i === 9) {
                fill(255);
                rect(x, y, width / cols, height / rows);
                //towers[0].show(x + 20, y + 25, width / cols, height / rows);
                towerButton.update();
                towerButton.btn.draw();
            }
            else {
                if (i % 2 === 0) {
                    image(imgTile_1, x, y, width / cols, height / rows);
                } else if ((i === 1 && j === 9) || (i === 3 && j === 0) || (i === 5 && j === 9) || (i === 7 && j === 0)) {
                    image(imgTile_1, x, y, width / cols, height / rows);
                } else
                    image(imgTile_2, x, y, width / cols, height / rows);
            }
        }
    }
}

function init() {
    gameOver = false;
    enemies = [];
    launch_wave = false;
    score = 0;
}

//***** OLD WAY TO CREATE TOWERS. IT'S NOT RESPONSIVE

// function mousePressed() {
//     if(dist(mouseX, mouseY, width-40, (height/10)/2) < height/10) {
//         towers.push(new Tower(damange = 0, position={x: width-40, y: (height/10)/2}, img=spritedata));
//         len = towers.length;
//     }
//     len = towers.length;
//     for(let i = 0; i < len; i++) {
//         if(!towers[i].isPlaced) {
//             if(dist(towers[i].position.x, towers[i].position.y, mouseX, mouseY) < height/10){
//                 //console.log(`${true} posX ${towers[i].position.x} posY ${towers[i].position.y} mX = ${mouseX} mY = ${mouseY}`)
//                 towers[i].isDragging = true;
//                 offsetX = mouseX;
//                 offsetY = mouseY;
//             }

//         }
//     }

//}

// function mouseReleased() {
//     len = towers.length;
//     for(let i = 0; i < len; i++) {

//         if(towers[i].isPlaced || !towers[i].isDragging)
//             continue;

//         towers[i].isPlaced = true;
//         towers[i].isDragging = false;
//     }
// }


// OLD ENEMIES PATH 
// console.log(`I = ${i} 1 X = ${enemies[i].position.x} Y = ${enemies[i].position.y} wX ${enemies[i].walkedX} wY ${enemies[i].walkedY}`)
                // if (enemies[i].walkedY - (i * 10) === (Math.round(height / 5 ) * 5) + 65 && enemies[i].isDown && !enemies[i].isRight) {
                //     enemies[i].actions += 1;
                //     enemies[i].isRight = true;
                //     enemies[i].isDown = !enemies[i].isDown;
                // }
                // else if (enemies[i].walkedX === (Math.round((width / 5) / 5) * 5) && enemies[i].isRight && !enemies[i].isDown) {
                //     enemies[i].actions += 1;
                //     if (enemies[i].actions === 5 || enemies[i].actions === 9) {
                //         enemies[i].walkedX = 0;
                //         enemies[i].isRight = false;
                //         enemies[i].isDown = true;
                //     } else {
                //         enemies[i].walkedX = 0;
                //         enemies[i].isRight = false;
                //         enemies[i].isDown = false;
                //     }
                //     //console.log(`2 X = ${enemies[0].position.x} Y = ${enemies[0].position.y} wX ${enemies[0].walkedX} wY ${enemies[0].walkedY}`)
                // } else if (enemies[i].walkedY === 120 + (i * 10) && !enemies[i].isDown && !enemies[i].isRight) {
                //     enemies[i].actions += 1;
                //     enemies[i].isRight = true;
                //     enemies[i].isDown = false;
                //     //console.log(`3 X = ${enemies[0].position.x} Y = ${enemies[0].position.y} wX ${enemies[0].walkedX} wY ${enemies[0].walkedY}`)
                // }


                
                // if (enemies[i].actions === 10) {
                //     enemies.splice(i, 1);
                //     if(enemies[0] == undefined) {
                //         launch_wave = false;
                //     }
                // }

function touchMoved() {

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

    if (keyCode == ESCAPE) {
        gameOver = true;
    }
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

    }

}

//Same usage as keyPressed, but is called on key released instead
function keyReleased() {

}
