
class Enemy {
    constructor(health = 5, img = null, position = {x: 0, y: 0}) {
        this.path = [];
        this.health = health;
        this.img = img;
        this.position = position;
    }

    move_to_objective(width, height) {
        
    }

    show() {
        image(this.img, this.position.x, this.position.y, 60, 40);
    }

}