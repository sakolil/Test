const matrix = createMatrix(50,50);
const objectMatrix = createObjectsMatrix(matrix);
const side = 50;

function setup(){
    createCanvas(matrix[0].length*side,matrix.length*side);
    background("grey");   
    frameRate(30);
}

function draw(){
    drawMatrix(matrix);
    updateObjectsMatrix(objectMatrix);
}

function createObjectsMatrix(matrix){
    const newObjectsMatrix = []
    for(let y = 0;y<matrix.length;y++){
        newObjectsMatrix[y]=[];
        for(let x = 0;x<matrix[y].length;x++){
            if(matrix[y][x]===1){
                const newGrass= new Grass(x,y,1,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newGrass;
            }
            else if(matrix[y][x]===2){
                const newGrassEater= new GrassEater(x,y,2,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newGrassEater;
            }
            else if(matrix[y][x]===3){
                const newPredator= new Predator(x,y,3,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newPredator;
            }
            else if(matrix[y][x]===4){
                const newParasite= new Parasite(x,y,4,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newParasite;
            }
            else if(matrix[y][x]===5){
                const newRobot= new Robot(x,y,5,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newRobot;
            }    
            else{
                newObjectsMatrix[y][x]=null;
            }

        }
    }
    return newObjectsMatrix;
}


function createMatrix(horizontalLength, verticalLength) {
    let newMatrix = [];
    for (let y = 0; y < verticalLength; y++) {
        newMatrix[y] = [];
        for (let x = 0; x < horizontalLength; x++) {
            const randomSectionCursor = Math.random()*100;
            if (randomSectionCursor < 45) {
                newMatrix[y][x] = 1;
            }
            else if (randomSectionCursor < 70) {
                newMatrix[y][x] = 2;
            }
            else if (randomSectionCursor < 85) {
                newMatrix[y][x] = 3;
            }
            else if (randomSectionCursor < 87.5) {
                newMatrix[y][x] = 4;
            }
            else if (randomSectionCursor > 99.7) {
                newMatrix[y][x] = 5;
            }
            else {
                newMatrix[y][x] = 0
            }
        }
    }
    return newMatrix;
}

function drawMatrix(matrix){
    for(let y  = 0;y<matrix.length;y++){
        for (let x = 0;x<matrix[0].length;x++){
            if(matrix[y][x]===1){
                fill("green");
            }
            else if(matrix[y][x]==2){
                fill("yellow");
            }
            else if(matrix[y][x]==3){
                fill("red");
            }
            else if(matrix[y][x]==4){
                fill("blue");
            }
            else if(matrix[y][x]==5){
                fill("orange");
            }
            else{
                fill("grey")
            }
            rect(x*side,y*side,side,side)
        }
    }
}

function updateObjectsMatrix(objectMatrix){
    for(let y =0;y<objectMatrix.length;y++){
        for(let x = 0;x<objectMatrix[y].length;x++){
            const object = objectMatrix[y][x]; 
            if(object){
                object.update();
            }
        }
    }
}