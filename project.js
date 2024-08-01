// cpsc 1045 project: checkers

const $ = id => document.getElementById(id);
const ctx = $("myCanvas").getContext("2d");

$("myCanvas").addEventListener("click", pickPiece);

// color variables
let hl = "#DBD461";
let p1Bg = "#CE3D46";
let p1Fg = "#A73339";
let p2Bg = "#EFE0BE";
let p2Fg = "#D5C7AA";
let tile1 = "#F3F2EF";
let tile2 = "#78AE80";

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
            ctx.fillStyle = hl;
            ctx.fillRect((this.col * 100), (this.row * 100), 100, 100);
            ctx.fill();
        }

        if (this.color == "red") {
            this.drawCircle(p1Bg, 38);
            this.drawRing(p1Fg, 30);
            this.drawRing(p1Fg, 16);
        } else {
            this.drawCircle(p2Bg, 38);
            this.drawRing(p2Fg, 30);
            this.drawRing(p2Fg, 16);
        }

        if (this.isKing == true) {
            if (this.color == "red") {
                this.drawCircle(p1Bg, 18);
                this.drawCrown(p1Fg);
            } else {
                this.drawCircle(p2Bg, 18);
                this.drawCrown(p2Fg);
            }
        }
    }

    drawCircle(color, radius) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc((this.col * 100) + 50, (this.row * 100) + 50, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawRing(color, radius) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.arc((this.col * 100) + 50, (this.row * 100) + 50, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    drawCrown(color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo((this.col * 100) + 40, (this.row * 100) + 62);
        ctx.lineTo((this.col * 100) + 35, (this.row * 100) + 44);
        ctx.lineTo((this.col * 100) + 45, (this.row * 100) + 54);
        ctx.lineTo((this.col * 100) + 50, (this.row * 100) + 38);
        ctx.lineTo((this.col * 100) + 55, (this.row * 100) + 54);
        ctx.lineTo((this.col * 100) + 65, (this.row * 100) + 44);
        ctx.lineTo((this.col * 100) + 60, (this.row * 100) + 62);
        ctx.lineTo((this.col * 100) + 40, (this.row * 100) + 62);
        ctx.stroke();
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
        if (Math.abs(newRow - this.row) == 1 && newCol == this.col ||
            Math.abs(newCol - this.col) == 1 && newRow == this.row) {
            return false;
        } else if ((this.color == "red" || this.isKing == true) &&
            (newRow == this.row + 1 && Math.abs(newCol - this.col) == 1) ||
            (this.color == "gray" || this.isKing == true) &&
            (newRow == this.row - 1 && Math.abs(newCol - this.col) == 1) &&
            array[newRow][newCol] == "") {
            return true;
        } else if ((this.color == "red" || this.isKing == true) &&
            (newRow == this.row + 2 && Math.abs(newCol - this.col) == 2)) {
            if (newCol - this.col == 2 &&
                array[newRow - 1][newCol - 1] != "" &&
                array[newRow - 1][newCol - 1].color == (this.color == "red" ? "gray" : "red")) {
                array[newRow - 1][newCol - 1] = "";
                return true;
            } else if (newCol - this.col == -2 &&
                array[newRow - 1][newCol + 1] != "" &&
                array[newRow - 1][newCol + 1].color == (this.color == "red" ? "gray" : "red")) {
                array[newRow - 1][newCol + 1] = "";
                return true;
            } else {
                return false;
            }
        } else if ((this.color == "gray" || this.isKing == true) &&
            (newRow == this.row - 2 && Math.abs(newCol - this.col) == 2)) {
            if (newCol - this.col == 2 &&
                array[newRow + 1][newCol - 1] != "" &&
                array[newRow + 1][newCol - 1].color == (this.color == "gray" ? "red" : "gray")) {
                array[newRow + 1][newCol - 1] = "";
                return true;
            } else if (newCol - this.col == -2 &&
                array[newRow + 1][newCol + 1] != "" &&
                array[newRow + 1][newCol + 1].color == (this.color == "gray" ? "red" : "gray")) {
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
                j % 2 != 0 ? ctx.fillStyle = tile1 : ctx.fillStyle = tile2;
            } else {
                j % 2 != 0 ? ctx.fillStyle = tile2 : ctx.fillStyle = tile1;
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
            if (getSelectedPiece() == array[row][col]) {
                getSelectedPiece().isClicked = false;
            } else {
                getSelectedPiece().isClicked = false;
                array[row][col].isClicked = !array[row][col].isClicked;
            }
        } else {
            array[row][col].isClicked = !array[row][col].isClicked;
        }
    } else if (getSelectedPiece() != null){
        if (getSelectedPiece().isValidMove(row, col)) {
            let picked = getSelectedPiece();

            array[getSelectedPiece().row][getSelectedPiece().col] = "";
            picked.move(row, col);
            array[row][col] = picked;

            // console.log(array);
        }

        getSelectedPiece().isClicked = false;
    }

    ctx.clearRect(0, 0, 800, 800);
    drawBoard();
    drawPieces();

    // console.log(`row: ${row}, col: ${col}`);
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

// returns selected piece
function getSelectedPiece() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (array[row][col].isClicked === true) {
                return array[row][col];
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
