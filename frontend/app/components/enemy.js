
class Enemy {
    constructor(health = 5, image = null, position = {x: null, y: null}) {
        this.path = [];
        this.health = health;
        this.image = image;
        this.position = position;
    }

    move_to_objective(path) {
        for(let i = 0; i < path.length; i++) {
                this.position.x = path[i][0];
                this.position.y = path[i][1];
        }
    }

    show() {
        image(this.image, this.position.x, this.position.y);
    }

}