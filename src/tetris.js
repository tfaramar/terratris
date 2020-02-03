const Piece = require("./piece.js");
const Level = require("./level.js");
class Tetris {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.grid = this.setGrid(10, 20);
        this.piece = new Piece(this.context, this.grid);

        this.isPaused = false;
        this.muteMusic = false;

        this.update = this.update.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.linesCleared = 0;
        this.togglePause = this.togglePause.bind(this);
        this.setKeyListeners();
        this.setMusic();

        this.lastTime = 0;
        this.dropCounter = 0;
        this.dropInterval = Level[0];
    }

    //------------------------------------------Toggle Pause
    togglePause() {
        this.isPaused = !this.isPaused;
        let modal = document.getElementById("modal");
        modal.classList.toggle('paused');
    }

    //-------------------------------------------Create Grid
    setGrid(width, height) {
        let g = [];
        while (height > 0) {
            g.push(new Array(width).fill(0))
            height -= 1;
        }
        return g;    
    }

    //-------------------------------------------Check Grid for Lines Cleared
    gridCheck() {
        outer: for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === 0) {
                    continue outer;
                }
            }
            const row = this.grid.splice(y, 1)[0].fill(0);
            this.grid.unshift(row);
            this.linesCleared += 1;
            this.dropInterval = Level[this.linesCleared / 10];
        }
    }

    //-------------------------------------------Draw Piece
    drawPiece(type, offset) { //Different draw functions for grid and piece?
        type.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val !== 0) {
                    this.context.fillStyle = colors[val];
                    this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        }); 
    }

    draw() {
        this.context.fillStyle = "lemonchiffon";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        drawPiece(newPiece.matrix, newPiece.pos); //REFACTOR 
        drawPiece(grid, { x: 0, y: 0 });
    }

    update(time = 0) {
        const runTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += runTime
        if ((this.dropCounter > this.dropInterval) && !this.isPaused) {
            this.piece.dropByOne();
        }
        draw();
        requestAnimationFrame(update);     
    }
    

    //--------------------------------------------End and Reset Game
    gameOver() {
        this.isPaused = true;
        let modal = document.getElementById("modal");
        modal.classList.add("game-over");
        modal.innerHTML = "Try again!";
        modal.addEventListener('click', exitGameOver);
    }

    exitGameOver() {
        let modal = document.getElementById("modal");
        modal.classList.remove("game-over");
        modal.innerHTML = "";
        modal.removeEventListener('click', exitGameOver);
        this.resetGame();    
    }

    resetGame() {
        this.grid.forEach(row => row.fill(0));
        this.dropInterval = Level[0];
        this.linesCleared = 0;
        this.isPaused = false;
    }

    //--------------------------------------------Set Key Listeners
    setKeyListeners() {
        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
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
    }

    //--------------------------------------------Set Music
    setMusic() {
        this.music = new Audio("../assets/audio/tetris_theme.mp3");
        this.music.volume = 0.6;
        this.music.loop = true;
    }

    toggleMute() {
        if (this.muteMusic) {
            this.muteMusic = false;
            this.music.play();
        } else {
            this.muteMusic = true;
            this.music.pause();
        }
    }
}

module.exports = Tetris;