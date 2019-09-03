
class Tower {
    constructor(damage = 2, position = {x: 0, y: 0}, img = null) {
        this.damage   = damage;
        this.position = position;
        this.isPlaced = false;
        this.img = img;
        this.isDragging = false;
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

    clicked(posX, posY) {
        if(dist(this.position.x, this.position.y, posX, posY) < 100) {
            console.log("clicked!");
            
        }
    }

    touchMoved(canvas) {
            if(this.img) {
                this.show();
            }
            else {
                fill(0);
                rect(this.position.x, this.position.y, 50, 50);
            }
    }

    touchEnded() {
        
    }

    show(posX, posY) {
        this.position.x = posX;
        this.position.y = posY;
        if(this.img) {

    //*** This is loading the sprite. Each frame shall be 64x64 with this fixed code.
    //*** If you want to add sprites with different sizes. Change the 64's by the
            for(let i = 0; i < this.img.width-64; i+=64) {
                // PARAMETERS {i : pixel position on x axis, 0 : pixel position in y axis, 64 : width, 64 : height}
                    //for(let j = enemy_path_x[0]; j < enemy_path_x)
                    
                    image(this.img.get(i, 0, 64, 64), this.position.x-64, this.position.y-64, 100, 100);
                    
                }
                // image(this.img, this.position.x, this.position.y);
        }
        else {
            fill(0);
            rect(this.position.x, this.position.y, 50, 50);
        }
    }
}