const $ = id => document.getElementById(id);
const ctx = $("myCanvas").getContext("2d");

$("myCanvas").addEventListener("click", getCoordinates);

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
    for (let i = 0; i <= 800; i += 100) {
        for (let j = 0; j <= 800; j += 100) {
            if (i % 200 != 0) {
                j % 200 != 0 ? ctx.fillStyle = "#ffffff" : ctx.fillStyle = "#000000";
            } else {
                j % 200 != 0 ? ctx.fillStyle = "#000000" : ctx.fillStyle = "#ffffff";
            }

            ctx.fillRect(j, i, 100, 100);
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
                ctx.fillStyle = "red";
                ctx.arc((j * 100) + 50, (i * 100) + 50, 35, 0, 2 * Math.PI);
                ctx.fill();
            } else if (array[i][j] == "gray") {
                ctx.fillStyle = "gray";
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
