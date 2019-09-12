
class Enemy {
    constructor({health = 5, position = {x: -10, y: -200}, img = null} = {}) {
        this.health = health;
        this.img = img;
        this.position = createVector(position.x, position.y);
        this.isDown = true;
        this.isRight = false;
        //this.walkedY = 0;
        this.walkedX = 0;
        this.sizeMod = 6; //Size multiplier on top of objSize
        this.scale = objSize * this.sizeMod;
    }
    

    show() {
        
        if (this.img) {
            //*** This is loading the sprite. Each frame shall be 64x64 with this fixed code.
            //*** If you want to add sprites with different sizes. Change the 64's by the image size
            for (let i = 0; i < this.img.width - 64; i += 64) {
                // PARAMS {i : pixel position on x axis, 0 : pixel position in y axis, 64 : width, 64 : height}
                image(this.img.get(i, 0, 64, 64), this.position.x, this.position.y, this.scale, this.scale);
            }
        }
        else {
            fill(0);
            rect(this.position.x, this.position.y, 50, 50);
        }
    }

    goDown(speed) {
        this.show();
        this.position.y += speed;
        this.walkedY += speed;
    }

    goUp(speed) {
        this.show();
        this.position.y -= speed;
        this.walkedY -= speed;
    }

    goRight(speed) {
        this.show();
        this.position.x += speed;
        this.walkedX += speed;
    }

    shouldGoUp() {
        if(this.position.y >= -70 && !this.isDown && !this.isRight) {
            return true;
        }
        this.isRight = true;
        return false;
    }

    shouldGoRight() {
        if(this.isRight && this.walkedX <= width/7+this.scale) {
            return true;
        }else if(!this.isDown && this.isRight){
            this.walkedX = 0;
            this.isRight = false;
            this.isDown  = false;
            return false;
        }else {
            this.walkedX  = 0;
            this.isRight  = false;
            this.isDown   = true;
            return true;
        }
    }

    shouldGoDown() {
        if(this.isDown && this.position.y >= -70 && this.position.y < height-this.scale) {
            return true;
        }
        else if(this.wentDown){
            this.isDown  = false;
            this.isRight = true;
            return false;
        }
        return false;
        
    }

    launch() {
        this.position.x = -10;
        this.position.y = -70;
    }

}