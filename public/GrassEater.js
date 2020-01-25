class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul() {
        this.getNewCoordinates()
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {

            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grEaterArr.push(newGrassEater);
            grassArr.slice(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0;
        }
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
 

    move() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrCells = this.chooseCell(1);
        var newCell = random(GrCells);
        if (newCell) {
            // sound
            if (!NoSounds) {
                grEaterSounds.setVolume(0.1 * volume);
                grEaterSounds.play();
            }
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.mul()

        } else if (this.energy > 0) {
            this.move();

        } else {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grEaterArr) {
            if (this.x == grEaterArr[i].x && this.y == grEaterArr[i].y) {
                grEaterArr.splice(i, 1);
                break;
            }
        }
    }
}