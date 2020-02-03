const Colors = [
    null,
    'palevioletred',
    'gold',
    'cornflowerblue',
    'lightseagreen',
    'coral',
    'darkorange',
    'teal'
];

const Types = {
    "T": [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    "Z": [
        [2, 2, 0],
        [0, 2, 2],
        [0, 0, 0]
    ],
    "S": [
        [0, 3, 3],
        [3, 3, 0],
        [0, 0, 0]
    ],
    "L": [
        [0, 4, 0],
        [0, 4, 0],
        [0, 4, 4]
    ],
    "J": [
        [0, 5, 0],
        [0, 5, 0],
        [5, 5, 0]
    ],
    "I": [
        [0, 6, 0, 0],
        [0, 6, 0, 0],
        [0, 6, 0, 0],
        [0, 6, 0, 0]
    ],
    "O": [
        [7, 7],
        [7, 7]
    ]
}
class Piece {
    constructor() {
        // this.matrix = //call create with a random type
        // this.pos = { x: 3, y: 0 }
    }

    drawPiece(type, offset, context) {
        type.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val !== 0) {
                    context.fillStyle = Colors[val];
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    move(direction, grid) {
        newPiece.pos.x += direction;
        if (collision(grid)) {
            newPiece.pos.x -= direction;
        } 
    }

    collision(grid) {
        const matrix = this.matrix;
        const pos = this.pos;
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if ((matrix[y][x] !== 0) && (grid[y + pos.y] && grid[y + pos.y][x + pos.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;  
    }

    mergeToGrid(grid) {
        this.matrix.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val !== 0) {
                    grid[y + piece.pos.y][x + piece.pos.x] = val;
                }
            });
        });
    }

    dropByOne(grid) {
        newPiece.pos.y += 1;
        if (pieceCollision(grid, newPiece)) {
            newPiece.pos.y -= 1;
            mergeToGrid(grid, newPiece);
            resetPiece();
            gridCheck();
        }
        dropCounter = 0; 
    }

    hardDrop() {
        while (!pieceCollision(grid, newPiece)) {
            newPiece.pos.y += 1;
        }
        newPiece.pos.y -= 1;
        mergePieceToGrid(grid, newPiece);
        resetPiece();
        gridCheck();
        dropCounter = 0; 
    }

    rotate() {
        let m = this.matrix;
        let newMatrix = [];
        for (let i = 0; i < m.length; i++) {
            newMatrix.push([]);
        };
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m.length; j++) {
                newMatrix[j].push(m[i][j]);
            };
        };
        this.matrix = newMatrix.map((row) => row.reverse());

        if (collision()) {
            if (this.pos.x < 0) {
                this.pos.x += 1;
            } else if (this.pos.x > (grid[0].length - this.matrix.length)) {
                this.pos.x -= 1;
            }
        };
    }

}

