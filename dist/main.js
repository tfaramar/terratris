/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
                context.fillStyle = colors[val];
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

const resetPiece = () => {
    let pieces = ["T", "Z", "S", "O", "L", "J", "I"];
    let rand = Math.floor(pieces.length * Math.random())
    newPiece.matrix = createPiece(pieces[rand]) 
    newPiece.pos.y = 0;
    newPiece.pos.x = (Math.floor(grid[0].length / 2)) - (Math.floor(newPiece.matrix.length / 2))  
    //if full, don't add more, trigger game over. right now this will just clear board. afterward, implement game over
    if (pieceCollision(grid, newPiece)) {
        grid.forEach(row => row.fill(0));
    }
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
        //color: saddlebrown #933d26
        return [
            [2, 2, 0],
            [0, 2, 2],
            [0, 0, 0]
        ];
    } else if (type === "S") {
        //color: 
        return [
            [0, 3, 3],
            [3, 3, 0],
            [0, 0, 0]
        ];
    } else if (type === "L") {
        //color: orange
        return [
            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4]
        ];
    } else if (type === "J") {
        //color: blue
        return [
            [0, 5, 0],
            [0, 5, 0],
            [5, 5, 0]
        ];
    } else if (type === "I") {
        //color: cyan
        return [
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0]
        ];
    } else if (type === "O") {
        //color: yellow
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
    'brown',
    'cornflowerblue',
    'lightseagreen',
    'khaki',
    'darkorange',
    'darkolivegreen'
];

//---------------------------------------------Check for Complete Rows

const gridCheck = () => {
    outer: for (let y = grid.length - 1; y > 0; y--) {
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



/***/ })

/******/ });
//# sourceMappingURL=main.js.map