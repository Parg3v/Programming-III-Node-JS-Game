class Box {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.time = 0;
        this.index = index;
        this.directions = [];
        this.color = "red";
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

    Generate() {
        this.getNewCoordinates();
        this.time++;
        if (this.time == 1 && !NoSounds) {
            box1.setVolume(0.01 * volume);
            box1.play();
        } else if (this.time < 10) {
            this.color = "red";
        }
        else if (this.time == 10) {
            if (!NoSounds) {
                box2.setVolume(0.01 * volume);
                box2.play();
            }
            this.color = "orange";
        }
        else if (this.time == 20) {
            if (!NoSounds) {
                box3.setVolume(0.01 * volume);
                box3.play();
            }
            this.color = "yellow";
        }
        else if (this.time >= 30) {
            this.Randoming();
            this.time = 0;
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

    Randoming() {
        var newCell = random(this.chooseCell(0));
        var newCellGrass = random(this.chooseCell(1));
        if (newCell) {
            var char = random(1, 4);

            char = parseInt(char);

            if (char == 1) {
                var newPredatorA = new Predator(newCell[0], newCell[1], 3);
                predatorArr.push(newPredatorA);
                matrix[newCell[1]][newCell[0]] = 3;
            }
            else if (char == 2) {
                var newGrassEaterA = new GrassEater(newCell[0], newCell[1], 2);
                grEaterArr.push(newGrassEaterA);
                matrix[newCell[1]][newCell[0]] = 2;
            }
            else if (char == 3) {
                var newGrassA = new Grass(newCell[0], newCell[1], 1);
                grassArr.push(newGrassA);
                matrix[newCell[1]][newCell[0]] = 1;
            }
            else if (i == 5) {
                boxArr.length = 0;
            }
        }






        else if (newCellGrass) {
            var char = random(1, 4);

            char = parseInt(char);

            if (char == 1) {
                var newPredatorA = new Predator(newCellGrass[0], newCellGrass[1], 3);
                predatorArr.push(newPredatorA);
                matrix[newCellGrass[1]][newCellGrass[0]] = 3;
            }
            else if (char == 2) {
                var newGrassEaterA = new GrassEater(newCellGrass[0], newCellGrass[1], 2);
                grEaterArr.push(newGrassEaterA);
                matrix[newCellGrass[1]][newCellGrass[0]] = 2;
            }
            else if (char == 3) {
                var newGrassA = new Grass(newCellGrass[0], newCellGrass[1], 1);
                grassArr.push(newGrassA);
                matrix[newCellGrass[1]][newCellGrass[0]] = 1;
            }
            else if (i == 5) {
                boxArr.length = 0;
            }
        }
    }
}