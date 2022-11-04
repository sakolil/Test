class GrassEater {

    constructor(x, y, id, matrix, objectMatrix) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        this.objectMatrix = objectMatrix;
        this.energy = 10;
        this.updateCoordinates();
    }

    updateCoordinates() {
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

    chooseCells(characterId) {
        this.updateCoordinates();
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let coordinates = this.directions[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if (x >= 0 && x < this.matrix[0].length && y >= 0 && y < this.matrix.length) {
                if (this.matrix[y][x] == characterId) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    multiply() {
        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells)

        if (this.energy >= 12 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newGrassEater = new GrassEater(newX, newY, this.id, this.matrix, this.objectMatrix);
            this.objectMatrix[newY][newX] = newGrassEater;
            this.energy -= 4;
        }
    }

    move() {
        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells);

        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy--;
        }
        this.die();
    }

    eat() {
        let targetCells = this.chooseCells(1);
        let newCell = random(targetCells);

        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy++;

            this.multiply();
        }else{
            this.move();
        }
        
    }

    die() {
        if (this.energy <= 0) {
            this.matrix[this.y][this.x] = 0;
            this.objectMatrix[this.y][this.x] = null;
        }
    }

    update(){
        this.eat();
    }
}