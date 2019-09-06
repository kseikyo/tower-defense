
class Enemy {
    constructor({health = 5, position = {x: -10, y: -200}, img = null} = {}) {
        this.health = health;
        this.img = img;
        this.position = createVector(position.x, position.y);
        this.isDown = true;
        this.isRight = false;
        this.actions = 1;
        this.walkedY = 0;
        this.walkedX = 0;
        this.sizeMod = 1; //Size multiplier on top of objSize
        this.removable = false;
        this.scale = createVector(1, 1);
    }

    

    show() {
        if (this.img) {

            //*** This is loading the sprite. Each frame shall be 64x64 with this fixed code.
            //*** If you want to add sprites with different sizes. Change the 64's by the
            for (let i = 0; i < this.img.width - 64; i += 64) {
                // PARAMETERS {i : pixel position on x axis, 0 : pixel position in y axis, 64 : width, 64 : height}
                //for(let j = enemy_path_x[0]; j < enemy_path_x)
                image(this.img.get(i, 0, 64, 64), this.position.x, this.position.y, width/7, height/4);
            }
        }
        else {
            fill(0);
            rect(this.position.x, this.position.y, 50, 50);
        }
    }

    launch() {
        this.position.x = -10;
        this.position.y = -200;
    }

}