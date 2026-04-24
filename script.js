console.log("Script started");
let boardDiv = document.querySelector("#board");
let matrix = [];
let rowArr = [];
let bombCount = 10;
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 10; col++) {
        let squareNum = (10*row) + col;
        if (row%2 != 0) {
            squareNum++;
        }
        let square = document.createElement("div");
        if (squareNum % 2 != 0) {
            square.classList.add("square1");
        } else {
            square.classList.add("square0");
        }
        square.classList.add("square");
        square.dataset.row = row;
        square.dataset.col = col;
        rowArr.push("undecided");
        boardDiv.appendChild(square);
    }
    matrix.push(rowArr);
    rowArr = [];
    boardDiv.appendChild(document.createElement("br"));
}

function placeBombs(event) {
    matrix[event.target.dataset.row][event.target.dataset.col] = "no bomb";
    for (let i= 0; i < 10; i++) {
        let position = matrix[random(0,9)][random(0,9)];
        if (position = "undecided") {
            position = "bomb";
        }
    }
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            console.log("c++ forever");
            if (matrix[r][c] == "undecided") {
                matrix[r][c] = "no bomb";
            }
        }
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // ONLY USE OF AI IN THE PROGRAM (I have a bad memory)
}