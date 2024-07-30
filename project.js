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

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc((this.col * 100) + 50, (this.row * 100) + 50, 35, 0, 2 * Math.PI);
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
array[5] = [new Piece(5, 0, "gray"), "", new Piece(5, 2, "gray"), "", new Piece(5, 4, "gray"), "", new Piece(5, 6, "gray"), ""];
array[6] = ["", new Piece(6, 1, "gray"), "", new Piece(6, 3, "gray"), "", new Piece(6, 5, "gray"), "", new Piece(6, 7, "gray")];
array[7] = [new Piece(7, 0, "gray"), "", new Piece(7, 2, "gray"), "", new Piece(7, 4, "gray"), "", new Piece(7, 6, "gray"), ""];

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
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col ++) {
            if (array[row][col] != "") {
                array[row][col].draw();
            }
        }
    }
}

function getSelectedPiece() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (array[row][col] != "") {
                if (array[row][col].isClicked == true) {
                    return array[row][col];
                }
            }
        }
    }
}

// calls functions when finish reloading
window.addEventListener("load", function() {
    drawBoard();
    drawPieces();
})
