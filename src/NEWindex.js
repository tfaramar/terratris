const Tetris = require("./tetris.js");
const GamePlay = require("./gameplay.js");

console.log('webpack is working!')

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.scale(20, 20);

    context.fillStyle = "lemonchiffon";
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
});