let imgBackground;
let imgCursor;
let extraCanvas;
let cursor;
// GAME OBJECTS
let towers = [];
let enemyes = [];

let enemy_path_x = [-100, 100, 200, 250, 250, 470, 600, 800, 870];
let enemy_path_y = [-100, 100, 250, 300, 500, 650, 730, 850, 900];

let tower;

let spritedata;

let imgEnemy1;
let imgEnemy2;
let imgEnemy3;

// GAME OBJECTS CONFIGURATIONS
let len = 0;
let x = -100;
let y = -100;
let offsetX, offsetY;
let cols = 10;
let rows = 10;

// OTHER CONFIGURATIONS
let sndTap;

let score;

//===This function is called before starting the game
//Load everything here
function preload() {

    

    if (Koji.config.images.background != "") {
        imgBackground = loadImage(Koji.config.images.background);
    }

    //*** Trying to load a whole sprite and make the animation
    //*** I don't know why, but I cannot read the the images width by, e.g, spritedata.width
    //*** It returns undefined. But when using spritedata on the web console, it works there.

    if(Koji.config.images.enemy_sprite != "") {
       spritedata = loadImage(Koji.config.images.enemy_sprite);
    }
    else {
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
    }
    
    console.log(towers);
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
    
    noCursor();

    //SETTING UP THE PATH ARRAY
    

    createCanvas(width, height);

    score = 0;
}

function draw() {
    
    //image(extraCanvas, 0, 0);
    //Draw background if there is one or a solid color
    if (imgBackground) {
        background(imgBackground);
    } else {
        background(Koji.config.colors.backgroundColor);
    }
    
    // for (let i = 0; i < cols; i++) {
    //     for (let j = 0; j < rows; j++) {
    //         let x = i* width/cols;
    //         let y = j* height/rows;
    //         enemy_path.push([i,j]);
    //         stroke(0);
    //         fill(255);
    //         rect(x, y, width/cols, height/rows);
    //     }
    //     //console.log(enemy_path[i]);
        
    // }
    // 


    for (let i = 9; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i* width/cols;
            let y = j* height/rows;
            stroke(0);
            fill(255);
            rect(x, y, width/cols, height/rows);
        }
    }

    
    for(let i = 0 ; i < len; i++) {
        if(towers[i].isDragging && !towers[i].isPlaced) {
            offsetX = mouseX;
            offsetY = mouseY;
            towers[i].show(offsetX, offsetY);
        }else{
            towers[i].show(towers[i].position.x, towers[i].position.y);
        }
    }
    

    image(imgCursor, mouseX, mouseY);
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

function mousePressed() {
    if(dist(mouseX, mouseY, width-40, -10) < height/10) {
        towers.push(new Tower(damange = 0, position={x: width-40, y: -10}, img=spritedata));
        len = towers.length;
    }
    console.log(towers);
    len = towers.length;
    for(let i = 0; i < len; i++) {
        if(!towers[i].isPlaced) {
            if(dist(towers[i].position.x, towers[i].position.y, mouseX, mouseY) < height/10){
                //console.log(`${true} posX ${towers[i].position.x} posY ${towers[i].position.y} mX = ${mouseX} mY = ${mouseY}`)
                towers[i].isDragging = true;
                offsetX = mouseX;
                offsetY = mouseY;
            }
            
        }
    }
    
}

function mouseReleased() {
    len = towers.length;
    for(let i = 0; i < len; i++) {

        if(towers[i].isPlaced || !towers[i].isDragging)
            continue;
        
        towers[i].isPlaced = true;
        towers[i].isDragging = false;
    }
}

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
        var encodedUri = encodeURI(enemy_path);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.txt");
        document.body.appendChild(link); // Required for FF

        link.click();
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