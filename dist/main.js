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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map