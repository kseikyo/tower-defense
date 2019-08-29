
class Enemy {
    constructor(health = 5, img = null, position = {x: 0, y: 0}) {
        this.path = [];
        this.health = health;
        this.img = img;
        this.position = position;
    }

    move_to_objective(isFinished) {
        /*
         * Write a loop that goes from 0 to 495 (Y = POSITION)
         * Then a loop that goes from 0 to 60 (X += POSITION)
         * And after that, I need to go form 495 to O
         */
        
        if(isFinished) {
            for(let i = 0; i <= 495; i++) {
                this.position.y = i;
                console.log('y= '+this.position.y);
            }

        } else {
            for(let i = 495; i >= 0; i--) {
                this.position.y = i;
            }
        }
        for(let i = 0; i < 60; i++) {
            this.position.x += i;
            console.log('x= '+this.position.x);
        }
    }

    show() {
        if(this.img) {

            //*** This is loading the sprite. Each frame shall be 64x64 with this fixed code.
            //*** If you want to add sprites with different sizes. Change the 64's by the
                    for(let i = 0; i < this.img.width-64; i+=64) {
                        // PARAMETERS {i : pixel position on x axis, 0 : pixel position in y axis, 64 : width, 64 : height}
                            //for(let j = enemy_path_x[0]; j < enemy_path_x)
                            image(this.img.get(i, 0, 64, 64), this.position.x-64, this.position.y-64, 100, 100); 
                        }
                }
                else {
                    fill(0);
                    rect(this.position.x, this.position.y, 50, 50);
                }
    }

    launch() {
        this.position.x = -8000;
        this.position.y = 0;
    }

}