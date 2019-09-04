
class Tower {
    constructor({damage = 2, position = {x: 0, y: 0}, img = null} = {}) {
        this.damage   = damage;
        this.position = position;
        this.isPlaced = false;
        this.img = img;
        this.isDragging = false;
    }


    clicked(posX, posY) {
        if(dist(this.position.x, this.position.y, posX, posY) < 100) {
            console.log("clicked!");
            
        }
    }

    /* Show functions displays the turret
     * @params posX is the position of the turret on the X axis
     * @params posY is the position of the turret on the Y axis
     * @params w is the width of the ellipse
     * @params h is the height of the ellipse
     */
    show(posX, posY, w, h) {
        if(false) {
            
        }else {
            stroke(0);
            noFill();
            strokeWeight(4);
            ellipse(posX, posY, w*2, h*2);
            fill(55);
            ellipse(posX, posY, w, h);
        }
    }
}