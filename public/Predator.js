class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.multiply = 0;
        this.directions = [];
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

            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            grEaterArr.slice(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
        }
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        } return found;

    }

    move() {
        this.getNewCoordinates()
        var newCell = random(this.chooseCell(0));
        var grCells = random(this.chooseCell(1));
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        } else if (grCells) {
            this.energy--;
            var newX = grCells[0];
            var newY = grCells[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrEaterCells = this.chooseCell(2);
        var newCell = random(GrEaterCells);
        if (newCell) {

            // sounds
            if (!NoSounds) {
                pred.setVolume(0.5 * volume);
                pred.play();
            }

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grEaterArr) {
                if (newX == grEaterArr[i].x && newY == grEaterArr[i].y) {
                    grEaterArr.splice(i, 1);
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
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}