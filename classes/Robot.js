class Robot {

    constructor(x, y, id, matrix, objectMatrix) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        this.objectMatrix = objectMatrix;
        this.energy = 11;
        this.updateCoordinates();
        this.updateExplosionCoordinates();
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

    updateExplosionCoordinates() {
    this.explosionDirections = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1],
        [this.x, this.y-2],
        [this.x-1, this.y-2],
        [this.x-2, this.y-2],
        [this.x+1, this.y-2],
        [this.x+2, this.y-2],
        [this.x-2, this.y - 1],
        [this.x+2, this.y - 1],
        [this.x - 2, this.y],
        [this.x +2, this.y],
        [this.x+2, this.y + 1],
        [this.x-2, this.y + 1],
        [this.x, this.y+2],
        [this.x-1, this.y+2],
        [this.x-2, this.y+2],
        [this.x+1, this.y+2],
        [this.x+2, this.y+2]
        
    ];
    }

    chooseExplosionCoordinates(){
        this.updateExplosionCoordinates();
        let found = [];
        for (let i = 0; i < this.explosionDirections.length; i++) {
            let coordinates = this.explosionDirections[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if (x >= 0 && x < this.matrix[0].length && y >= 0 && y < this.matrix.length) {
                found.push(this.explosionDirections[i]);
            }
        }
        return found;    
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

    explode() {
        if (this.energy % 10 == 0) { 
            let cells = this.chooseExplosionCoordinates();      
            for(let y = 0;y<cells.length;y++){
                let coordinates = cells[y];
                let targetX = coordinates[0];
                let targetY = coordinates[1];
                this.matrix[targetY][targetX] = 0;
                this.objectMatrix[targetY][targetX] = null;
            }
        }
    }

    move() {
        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells);

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

        }
        this.die();
    }

    eat() {
        let firstTargets = this.chooseCells(2);
        let secondTargets = this.chooseCells(3);
        let thirdTargets = this.chooseCells(4);
        let fourthTargets = this.chooseCells(1);
        let targets = fourthTargets.concat(thirdTargets.concat(secondTargets.concat(firstTargets)));
        let newCell = random(targets);

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy++;

            this.explode();
        }else{
            this.move();
        }
        
    }

    die() {
        if (this.energy >= 60) {
            this.matrix[this.y][this.x] = 0;
            this.objectMatrix[this.y][this.x] = null;
            this.explode();
        }
    }

    update(){
        this.eat();
    }
}