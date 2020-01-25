class Destroyer {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
        this.color = "#0051ff";
        this.time = 0;
        this.id = random(1, 3);
        this.id = parseInt(this.id);
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

    starting() {
        this.time++;
        if (this.time < 10) {
            this.color = "#0051ff";
        } else if (this.time == 10) {
            this.color = "#0095ff"
        } else if (this.time == 20) {

            //sounds
            if (!NoSounds) {
                destSounds.setVolume(20 * volume);
                destSounds.play();
            }


            this.color = "#00aeff";
        } else if (this.time >= 30) {
            this.eat();
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
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrCells = this.chooseCell(this.id);

        if (this.id == 1) {
            var newCell = random(GrCells);
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;

                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (this.energy > 0) {
                this.move();
            } else {
                this.die();
            }
        } else if (this.id == 2) {
            var GrEaterCells = this.chooseCell(2);
            var newCell = random(GrEaterCells);
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;

                for (var i in grEaterArr) {
                    if (newX == grEaterArr[i].x && newY == grEaterArr[i].y) {
                        grEaterArr.splice(i, 1);
                        break;
                    }
                }

            } else if (this.energy > 0) {
                this.move();

            } else {
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in DestArr) {
            if (this.x == DestArr[i].x && this.y == DestArr[i].y) {
                DestArr.splice(i, 1);
                break;
            }
        }
    }
}