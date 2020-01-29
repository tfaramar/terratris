console.log('webpack is working!')

//-------------------------------------------Canvas Configuration
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.scale(20, 20); //scale everything x 30

context.fillStyle = "white";
context.fillRect(0, 0, canvas.clientWidth, canvas.height);

//-------------------------------------------Draw Piece
const drawPiece = (type, offset) => {
    type.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                context.fillStyle = "palevioletred";
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const draw = () => {
    context.fillStyle = "white"; //clear the canvas, consider clearRect instead?
    context.fillRect(0, 0, canvas.width, canvas.height); 
    drawPiece(newPiece.matrix, newPiece.pos);
    drawPiece(grid, {x: 0, y: 0})
}

let lastTime = 0; //replace with timestamp, broadly supported
let dropCounter = 0;
let dropInterval = 1000;

//---------------------------------------------Implement Animation of Piece
const update = (time = 0) => {
    const runTime = time - lastTime;
    lastTime = time;
    dropCounter += runTime
    if (dropCounter > dropInterval) {
      dropPieceByOne();  
    }
    draw();
    requestAnimationFrame(update);
}

const pieceMatrix = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
];

const newPiece = {
    pos: {x: 3, y: 0},
    matrix: pieceMatrix
}
window.newPiece = newPiece;

//----------------------------------------------Move Piece

const movePiece = (direction) => {
    newPiece.pos.x += direction;
    if (pieceCollision(grid, newPiece)) {
        newPiece.pos.x -= direction; //if we bump into something, move back
    }  
}

//----------------------------------------------Drop Piece by One

const dropPieceByOne = () => {
    newPiece.pos.y += 1;
    if (pieceCollision(grid, newPiece)) {
       newPiece.pos.y -= 1; //set back one cube on y-axis
       mergePieceToGrid(grid, newPiece);
       newPiece.pos.y = 0;
    }
    dropCounter = 0 //set counter back to zero
}

//-----------------------------------------------Rotate Piece

const rotatePiece = (piece) => {
    let m = piece.matrix
    let newMatrix = []
    for (let i = 0; i < m.length; i++) {
        newMatrix.push([]);
    };

    for (let i = 0; i < m.length; i++) {
       for (let j = 0; j < m.length; j++) {
            newMatrix[j].push(m[i][j]);
       }; 
    };

    piece.matrix = newMatrix.map((row) => row.reverse());

    if (pieceCollision(grid, piece)) {
        if (piece.pos.x < 0) {
            piece.pos.x += 1;
        } else if (piece.pos.x > (grid[0].length - piece.matrix.length)) {
            piece.pos.x -= 1;
        }
    };
}

//---------------------------------------------Create Grid
const setGrid = (width, height) => {
    let g = [];
    while (height > 0) {
        g.push(new Array(width).fill(0))
        height -= 1;
    }
    return g;
}

const grid = setGrid(10, 20);

const mergePieceToGrid = (grid, piece) => {
    piece.matrix.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                grid[y + piece.pos.y][x + piece.pos.x] = val
                //console.log(grid);
            }
        })
    })   
}

const pieceCollision = (grid, piece) => {
    const matrix = piece.matrix;
    const pos = piece.pos;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if ((matrix[y][x] !== 0) && (grid[y + pos.y] && grid[y + pos.y][x + pos.x]) !== 0) {
                //console.log('collision!', grid);
                return true;
            }
        }
    }
    return false;
}

document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 37:
            movePiece(-1);
            console.log('moved left');
            break;
        case 38:
            rotatePiece(newPiece);
            console.log('rotate piece');
            break;
        case 39:
            movePiece(1);
            console.log('moved right');
            break;
        case 40:
            dropPieceByOne()
            console.log('down one');
            break;
        case 80:
            console.log('paused');
            break;
        case 32:
            console.log('drop piece');
            break;
    }
});

//-----------------------------------------------------Set points

//-----------------------------------------------------Set level
//when to level up? every 10 lines?



update();

