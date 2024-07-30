const $ = id => document.getElementById(id);
const ctx = $("myCanvas").getContext("2d");

$("myCanvas").addEventListener("click", getCoordinates);

// blueprints for piece object
class Piece {
    constructor(row, col, color, isClicked, isKing) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.isClicked = isClicked;
        this.isKing = isKing;
    }

    draw(color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc((col * 100) + 50, (row * 100) + 50, 35, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// global array for storing checkers board
let array = [];
array[0] = ["", new Piece(0, 1, "red"), "", new Piece(0, 3, "red"), "", new Piece(0, 5, "red"), "", new Piece(0, 7, "red")];
array[1] = [new Piece(1, 0, "red"), "", new Piece(1, 2, "red"), "", new Piece(1, 4, "red"), "", new Piece(1, 6, "red"), ""];
array[2] = ["", new Piece(2, 1, "red"), "", new Piece(2, 3, "red"), "", new Piece(2, 5, "red"), "", new Piece(2, 7, "red")];
array[3] = ["", "", "", "", "", "", "", ""];
array[4] = ["", "", "", "", "", "", "", ""];
array[5] = ["gray", "", "gray", "", "gray", "", "gray", ""];
array[6] = ["", "gray", "", "gray", "", "gray", "", "gray"];
array[7] = ["gray", "", "gray", "", "gray", "", "gray", ""];

// draws the board
function drawBoard() {
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            if (i % 2 != 0) {
                j % 2 != 0 ? ctx.fillStyle = "#ffffff" : ctx.fillStyle = "#000000";
            } else {
                j % 2 != 0 ? ctx.fillStyle = "#000000" : ctx.fillStyle = "#ffffff";
            }

            ctx.fillRect(j * 100, i * 100, 100, 100);
        }
    }
}

// gets x and y locations for each tile and alert whether if it's red or gray
function getCoordinates(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    let col = Math.floor(x/100);
    let row = Math.floor(y/100);

    // console.log(`\nX: ${x}, Y: ${y}`);
    console.log(`row: ${row}, col: ${col}`);
    alert(array[row][col]);
}

// draws checkers pieces
function drawPieces() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j ++) {
            array[j][i].draw();
        }
    }
}

// calls functions when finish reloading
window.addEventListener("load", function() {
    drawBoard();
    drawPieces();
})
