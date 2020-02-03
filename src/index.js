console.log('webpack is working!')
//-----------------------------------------Add JS functionality to panel buttons


//-------------------------------------------Canvas Configuration
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.scale(20, 20); //scale everything x 30

context.fillStyle = "lemonchiffon";
context.fillRect(0, 0, canvas.clientWidth, canvas.height);

//------------------------------------------Is Paused
let isPaused = false;

//------------------------------------------Toggle Pause
const togglePause = () => {
    isPaused = !isPaused;
    let modal = document.getElementById("modal");
    modal.classList.toggle('paused');
    //modal.innerHTML = modal.innerHTML === "" ? "Paused" : "";
}

//-------------------------------------------Draw Piece
const drawPiece = (type, offset) => {
    type.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                context.fillStyle = colors[val];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const draw = () => {
    context.fillStyle = "lemonchiffon"; //first clear canvas
    context.fillRect(0, 0, canvas.width, canvas.height); 
    drawPiece(newPiece.matrix, newPiece.pos); //then draw piece
    drawPiece(grid, {x: 0, y: 0}) //draw grid
}

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

//---------------------------------------------Implement Animation of Piece
const update = (time = 0) => {
    const runTime = time - lastTime;
    lastTime = time;
    dropCounter += runTime
    if ((dropCounter > dropInterval) && !isPaused) {
        dropPieceByOne();
    }
    draw();
    requestAnimationFrame(update);  
}

//----------------------------------------------Build Next Piece


const resetPiece = () => {
    let pieces = ["T", "Z", "S", "O", "L", "J", "I"];
    let rand = Math.floor(pieces.length * Math.random())
    newPiece.matrix = createPiece(pieces[rand]) 
    //randomly created piece should be pushed onto array of next three pieces, newPiece.matrix should come from the first element in that array
    newPiece.pos.y = 0;
    newPiece.pos.x = (Math.floor(grid[0].length / 2)) - (Math.floor(newPiece.matrix.length / 2))  
    //if full, don't add more, trigger game over. right now this will just clear board. afterward, implement game over
    if (pieceCollision(grid, newPiece)) {
        gameOver();
    }
}

//---------------------------------------------Game Over
const gameOver = () => {
    isPaused = true;
    let modal = document.getElementById("modal");
    modal.classList.add("game-over");
    modal.innerHTML = "Try again!";
    modal.addEventListener('click', exitGameOver);
}

const exitGameOver = () => {
    let modal = document.getElementById("modal");
    modal.classList.remove("game-over");
    modal.innerHTML = "";
    modal.removeEventListener('click', exitGameOver);
    gameReset();
}

//---------------------------------------------Game Reset
const gameReset = () => {
    grid.forEach(row => row.fill(0));
    //set level back to 0
    isPaused = false;
}

//numbers correspond to various colors
const createPiece = (type) => {
    if (type === "T") {

        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    } else if (type === "Z") {
        return [
            [2, 2, 0],
            [0, 2, 2],
            [0, 0, 0]
        ];
    } else if (type === "S") {
        return [
            [0, 3, 3],
            [3, 3, 0],
            [0, 0, 0]
        ];
    } else if (type === "L") {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4]
        ];
    } else if (type === "J") {
        return [
            [0, 5, 0],
            [0, 5, 0],
            [5, 5, 0]
        ];
    } else if (type === "I") {
        return [
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0]
        ];
    } else if (type === "O") {
        return [
            [7, 7],
            [7, 7]
        ];
    };
};

const pieceMatrix = [
    [0, 4, 0],
    [0, 4, 0],
    [0, 4, 4]
];

const newPiece = {
    pos: {x: 3, y: 0},
    matrix: pieceMatrix
}
window.newPiece = newPiece;

const colors = [
    null,
    'palevioletred',
    'gold',
    'cornflowerblue',
    'lightseagreen',
    'coral',
    'darkorange',
    'teal'
];

//---------------------------------------------Check for Complete Rows

const gridCheck = () => {
    outer: for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 0) {
                continue outer;
            }
        }

        const row = grid.splice(y, 1)[0].fill(0) //takes row out at index y and fills it with zeros
        grid.unshift(row) //add that row to the top of the grid
    }
}

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
       resetPiece();
       gridCheck();
    }
    dropCounter = 0; //set counter back to zero
}

//------------------------------------------------Hard Drop Piece

const hardDrop = () => {
    while (!pieceCollision(grid, newPiece)) {
        newPiece.pos.y += 1;
    }
    newPiece.pos.y -=1;
    mergePieceToGrid(grid, newPiece);
    resetPiece();
    gridCheck();
    dropCounter = 0;
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

//---------------------------------------------Merge Piece to Grid

const mergePieceToGrid = (grid, piece) => {
    piece.matrix.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val !== 0) {
                grid[y + piece.pos.y][x + piece.pos.x] = val
            }
        })
    })   
}

//---------------------------------------------Check for Piece Collision

const pieceCollision = (grid, piece) => {
    const matrix = piece.matrix;
    const pos = piece.pos;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if ((matrix[y][x] !== 0) && (grid[y + pos.y] && grid[y + pos.y][x + pos.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

//---------------------------------------------Key Events

document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 37:
            movePiece(-1);
            break;
        case 38:
            rotatePiece(newPiece);
            break;
        case 39:
            movePiece(1);
            break;
        case 40:
            dropPieceByOne();
            break;
        case 80:
            togglePause();
            break;
        case 32:
            hardDrop();
            break;
    }
});

//-----------------------------------------------------Set level - level up every 10 lines


// document.querySelector('audio').addEventListener('play', () => {
//     console.log('audio playing')
// })

update();

