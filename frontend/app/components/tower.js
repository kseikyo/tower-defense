
class Tower {
    constructor(damage = 2, position = {x: 0, y: 0}, img = null) {
        this.damage   = damage;
        this.position = position;
        this.isPlaced = false;
        this.img = img;
    }

    touchStarted() {
        // while (!this.isPlaced){
        //     this.position.x = mouseX;
        //     this.position.y = mouseY;
        // }
        // if(!this.isPlaced) {
        //     this.show();
        // }
        // return false;
    }

    touchMoved(canvas) {
        this.position.x = mouseX;
        this.position.y = mouseY;
        if(this.img) {
            image(this.img, this.position.x, this.position.y);
            
        }
        else {
            fill(0);
            rect(this.position.x, this.position.y, 50, 50);
            
        }
    }

    touchEnded() {
        this.isPlaced = true;
    }

    show() {
        if(this.img) {
            image(this.img, this.position.x, this.position.y);
        }
        else {
            fill(0);
            rect(this.position.x, this.position.y, 50, 50);
        }
    }
}