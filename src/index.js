console.log('webpack is working!')

//-------------------------------------------Canvas Configuration
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.scale(30, 30); //scale everything x 30

context.fillStyle = "white";
context.fillRect(0, 0, canvas.clientWidth, canvas.height);

//-------------------------------------------Draw Piece
const drawPiece = (type, offset) => {
    type.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                context.fillStyle = "green";
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const draw = () => {
    context.fillStyle = "white"; //clear the canvas, consider clearRect instead?
    context.fillRect(0, 0, canvas.clientWidth, canvas.height); 
    drawPiece(newPiece.matrix, newPiece.pos);
}

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

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
    [1, 1, 1],
    [0, 0, 0]
];

const newPiece = {
    pos: {x: 3, y: 0},
    matrix: pieceMatrix
}
window.newPiece = newPiece;

//----------------------------------------------Drop Piece by One
const dropPieceByOne = () => {
    newPiece.pos.y += 1;
    dropCounter = 0 //set counter back to zero
}

//---------------------------------------------Create Grid
const setGrid = (width, height) => {
    let g = [];
    while (height > 0) {
        g.push(new Array(width).fill(0))
        height--;
    }
    return g;
}

const grid = setGrid(10, 20);

const mergePieceToGrid = (grid, piece) => {
    piece.matrix.forEach((row, y) => {
        row.forEach((val, x) => {
            if (y === piece.pos.y){
                y = 1;
            }
        })
    })    
}

document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 37:
            newPiece.pos.x -= 1;
            console.log('moved left');
            break;
        case 38:
            console.log('rotate piece');
            break;
        case 39:
            newPiece.pos.x += 1;
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


update();
