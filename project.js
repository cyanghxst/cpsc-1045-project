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
array[0] = ["", "red", "", "red", "", "red", "", "red"];
array[1] = ["red", "", "red", "", "red", "", "red", ""];
array[2] = ["", "red", "", "red", "", "red", "", "red"];
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
            ctx.beginPath();

            if (array[i][j] == "red") {
                ctx.fillStyle = "#ff0000";
                ctx.arc((j * 100) + 50, (i * 100) + 50, 35, 0, 2 * Math.PI);
                ctx.fill();
            } else if (array[i][j] == "gray") {
                ctx.fillStyle = "#808080";
                ctx.arc((j * 100) + 50, (i * 100) + 50, 35, 0, 2 * Math.PI);
                ctx.fill();
            }

        }
    }

}

// calls functions when finish reloading
window.addEventListener("load", function() {
    drawBoard();
    drawPieces();
})
