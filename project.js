// cpsc 1045 project: checkers

const $ = id => document.getElementById(id);
const ctx = $("myCanvas").getContext("2d");

$("myCanvas").addEventListener("click", pickPiece);

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
        if (this.isClicked == true) {
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.arc((this.col * 100) + 50, (this.row * 100) + 50, 40, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc((this.col * 100) + 50, (this.row * 100) + 50, 35, 0, 2 * Math.PI);
        ctx.fill();

        if (this.isKing == true) {
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc((this.col * 100) + 37, (this.row * 100) + 40, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc((this.col * 100) + 63, (this.row * 100) + 40, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.arc((this.col * 100) + 50, (this.row * 100) + 50 + 6, 10, 0, Math.PI);
            ctx.stroke();
        }
    }

    checkKing() {
        if (this.color == "red" && this.row == 7 ) {
            this.isKing = true;
        } else if (this.color == "gray" && this.row == 0 ) {
            this.isKing = true;
        }
    }

    move(newRow, newCol) {
        this.row = newRow;
        this.col = newCol;

        this.checkKing();
    }

    isValidMove(newRow, newCol) {
        if (Math.abs(newRow - this.row) == 1 && newCol == this.col || Math.abs(newCol - this.col) == 1 && newRow == this.row) {
            return false;
        } else if ((this.color == "red" || this.isKing == true) && (newRow == this.row + 1 && Math.abs(newCol - this.col) == 1) || (this.color == "gray" || this.isKing == true) && (newRow == this.row - 1 && Math.abs(newCol - this.col) == 1) && array[newRow][newCol] == "") {
            return true;
        } else if ((this.color == "red" || this.isKing == true) && (newRow == this.row + 2 && Math.abs(newCol - this.col) == 2)) {
            if (newCol - this.col == 2 && array[newRow - 1][newCol - 1] != "" && array[newRow - 1][newCol - 1].color == (this.color == "red" ? "gray" : "red")) {
                array[newRow - 1][newCol - 1] = "";
                return true;
            } else if (newCol - this.col == -2 && array[newRow - 1][newCol + 1] != "" && array[newRow - 1][newCol + 1].color == (this.color == "red" ? "gray" : "red")) {
                array[newRow - 1][newCol + 1] = "";
                return true;
            } else {
                return false;
            }
        } else if ((this.color == "gray" || this.isKing == true) && (newRow == this.row - 2 && Math.abs(newCol - this.col) == 2)) {
            if (newCol - this.col == 2 && array[newRow + 1][newCol - 1] != "" && array[newRow + 1][newCol - 1].color == (this.color == "gray" ? "red" : "gray")) {
                array[newRow + 1][newCol - 1] = "";
                return true;
            } else if (newCol - this.col == -2 && array[newRow + 1][newCol + 1] != "" && array[newRow + 1][newCol + 1].color == (this.color == "gray" ? "red" : "gray")) {
                array[newRow + 1][newCol + 1] = "";
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
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

// gets x and y locations for each tile, checks if it's already clicked then redraws board and pieces
function pickPiece(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    let col = Math.floor(x/100);
    let row = Math.floor(y/100);

    if (array[row][col] != "") {
        if (getSelectedPiece() != null) {
            getSelectedPiece().isClicked = false;
            array[row][col].isClicked = !array[row][col].isClicked;
        } else {
            array[row][col].isClicked = !array[row][col].isClicked;
        }
    } else if (getSelectedPiece() != null){
        if (getSelectedPiece().isValidMove(row, col)) {
            let picked = getSelectedPiece();

            array[getSelectedPiece().row][getSelectedPiece().col] = "";
            picked.move(row, col);
            array[row][col] = picked;
            console.log(array);
        }

        getSelectedPiece().isClicked = false;
    }

    ctx.clearRect(0, 0, 800, 800);
    drawBoard();
    drawPieces();

    console.log(`row: ${row}, col: ${col}`);
    // alert(array[row][col]);
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
                if (array[row][col].isClicked === true) {
                    return array[row][col];
                }
            }
        }
    }

    return null;
}

// calls functions when finish reloading
window.addEventListener("load", function() {
    drawBoard();
    drawPieces();
})
