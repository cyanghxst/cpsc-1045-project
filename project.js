const $ = id => document.getElementById(id);
const ctx = $("myCanvas").getContext("2d");

// $("myCanvas").addEventListener("click", getCoordinate);

let row = [];
row[0] = ["", "red", "", "red", "", "red", "", "red"];
row[1] = ["red", "", "red", "", "red", "", "red", ""];
row[2] = ["", "red", "", "red", "", "red", "", "red"];
row[3] = ["", "", "", "", "", "", "", ""];
row[4] = ["", "", "", "", "", "", "", ""];
row[5] = ["grey", "", "grey", "", "grey", "", "grey", ""];
row[6] = ["", "grey", "", "grey", "", "grey", "", "grey"];
row[7] = ["grey", "", "grey", "", "grey", "", "grey", ""];

function drawBoard() {
    for (let row = 0; row <= 800; row += 100) {
        for (let col = 0; col <= 800; col += 100) {
            if (row % 200 != 0) {
                col % 200 != 0 ? ctx.fillStyle = "#ffffff" : ctx.fillStyle = "#000000";
            } else {
                col % 200 != 0 ? ctx.fillStyle = "#000000" : ctx.fillStyle = "#ffffff";
            }

            ctx.fillRect(row, col, 100, 100);
        }
    }
}

drawBoard();

// function drawPieces() {
//     for (let row = 0; row <= 800; row += 100) {
//         for (let col = 0; col <= 800; col += 100) {
//             ctx.beginPath();
//             ctx.fillStyle = "#ff0000";

//             if (row % 200 != 0) {
//                 if (col % 200 != 0) {
//                     ctx.arc(row + 25, col - 75, 35, 0, 2 * Math.PI);
//                 }
//             }

//             ctx.fill();
//         }
//     }
// }

// drawPieces();
