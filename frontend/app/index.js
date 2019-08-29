let imgBackground;
let imgCursor;
// let extraCanvas;
let cursor;
let imgTile_1;
let imgTile_2;

// GAME OBJECTS
let towers = [];
let enemies = [];

let enemy_path_x = [-100, 100, 200, 250, 250, 470, 600, 800, 870];
let enemy_path_y = [-100, 100, 250, 300, 500, 650, 730, 850, 900];
let path = [];
let dif_path = [];
let tower;

let spritedata;

let imgEnemy1;
let imgEnemy2;
let imgEnemy3;

// GAME OBJECTS CONFIGURATIONS
let shift_path = false;
let launch_wave = true;
let len = 0;
let cols = 10;
let rows = 10;

// OTHER CONFIGURATIONS
let sndTap;
let tale = 9;
let score;

//===This function is called before starting the game
//Load everything here
function preload() {

    if (Koji.config.images.background != "") {
        imgBackground = loadImage(Koji.config.images.background);
    }

    if(Koji.config.images.enemy_sprite != "") {
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

    imgEnemy1 = loadImage(Koji.config.images.enemy1);
    
    enemies.push(new Enemy(health = 5, img = spritedata, position= {x: -8000, y: 0}));
    
    imgCursor = loadImage(Koji.config.images.cursor);

    if (Koji.config.images.ground_1 != "") {
        imgTile_1 = loadImage(Koji.config.images.ground_1);
    }
    if (Koji.config.images.ground_2 != "") {
        imgTile_2 = loadImage(Koji.config.images.ground_2);
    }
    //===Load Sounds here
    //Include a simple IF check to make sure there is a sound in config, also include a check when you try to play the sound, so in case there isn't one, it will just be ignored instead of crashing the game
    if (Koji.config.sounds.tap) sndTap = loadSound(Koji.config.sounds.tap);

}


//This function runs once after the app is loaded
function setup() {
    //Set our canvas size to full window size
    width = window.innerWidth;
    height = window.innerHeight;
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i* width/cols;
            let y = j* height/rows;
            
            if (i % 2 === 0) {
                path.push([Math.trunc(x),Math.trunc(y)]);
            }else if((i === 1 && j === 9) || (i === 3 && j === 0) || (i === 5 && j === 9)  || (i === 7 && j === 0) ){
                path.push([Math.trunc(x), Math.trunc(y)]);
            }
        }
    }

    
    for(let i = path.length-1; i >=0; i--) {
        if(i === 0) break;
        dif_path.push([path[i][0] - path[i-1][0],path[i][1] - path[i-1][1]]);
    }
    noCursor();
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
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i* width/cols;
            let y = j* height/rows;
            
            if (i % 2 === 0) {
                image(imgTile_1, x, y, width/cols, height/rows);
            }else if((i === 1 && j === 9) || (i === 3 && j === 0) || (i === 5 && j === 9)  || (i === 7 && j === 0) ){
                image(imgTile_1, x, y, width/cols, height/rows);
            }else
                image(imgTile_2, x, y, width/cols, height/rows);
        }
        
    }

    
    


    // Drawing the rectangles from top to bottom right side
    for (let i = 9; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i* width/cols;
            let y = j* height/rows;
            
            rect(x, y, width/cols, height/rows);
            
            
        }
    }
    

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
    

    image(imgCursor, mouseX, mouseY);

    if(launch_wave) {
        for(let i = 0; i < 5; i++) {
            image(enemies[0].img, enemies[0].position.x, enemies[0].position.y)
            enemies[0].move_to_objective(shift_path);
            shift_path = !shift_path;
        }
        launch_wave = false;
    }

}


//===Handle mouse/tap input here
function touchStarted() {
    enemies[0].launch();
    launch_wave = true;
    //Play sound
    //if (sndTap) sndTap.play();
    
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