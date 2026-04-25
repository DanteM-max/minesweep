console.log("Script started");
let boardDiv = document.querySelector("#board");
let matrix = [];
let rowArr = [];
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
        square.addEventListener('click',placeBombs);
        square.dataset.row = row;
        square.dataset.col = col;
        rowArr.push("undecided");
        boardDiv.appendChild(square);
    }
    matrix.push(rowArr);
    rowArr = [];
    boardDiv.appendChild(document.createElement("br"));
    console.log(matrix);
}

function placeBombs(event) {
    matrix[event.target.dataset.row][event.target.dataset.col] = "no bomb";
    console.log(matrix[event.target.dataset.row][event.target.dataset.col]);
    for (let i= 0; i < 10; i++) {
        let rowForPos = random(0,7), colForPos = random(0,9);
        let position = matrix[rowForPos][colForPos];
        console.log(position);
        if (position == "undecided") {
            position = "bomb";
            matrix[rowForPos][colForPos] = "bomb";
        }
        console.log("(" + (rowForPos+0) + "," + (colForPos+0) + "): " + position);
    }
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            if (matrix[r][c] == "undecided") {
                matrix[r][c] = "no bomb";
            }
            console.log(r+ ", " + c + " matrix value at the position is " + matrix[r][c]);
            let bombCount = 0;
            rowLoop: for (let rowForBombCount = r-1; rowForBombCount <= r+1; rowForBombCount++) {
                colLoop: for (let colForBombCount = c-1; colForBombCount <= c+1; colForBombCount++) {
                    
                    if (rowForBombCount < 0 || rowForBombCount > 7 || colForBombCount < 0 || colForBombCount > 9) {
                        continue;
                    }
                    if (matrix[rowForBombCount][colForBombCount] == "bomb") {
                        console.log(bombCount + " THERE'S A BOMB");
                        bombCount++;
                        console.log(bombCount);
                    }
                    
                    console.log(r+ ", " + c + " matrix value at the position is " + matrix[r][c]);
                }

            }

            if (bombCount != 0) {
                matrix[r][c] = bombCount;
                console.log(matrix);
            }
        }
    }

    
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // USE OF AI IN THE PROGRAM (I have a bad memory)
}

function revealSquare(r,c) { // Ai *inspired*, but code might appear AI-generated
    //keep in bounds
    if (r < 0 || r > 7 || c < 0 || c < 9) {
        return;
    }

    //get the target
    let squares = document.querySelectorAll(".square");
    let targetSquare = squares[(r*10) + c];

    //makes sure the target square hasn't been clicked or 'clicked'
    if (targetSquare.classList.contains("clicked")) {
        return;
    }

    //'click' the square
    targetSquare.classList.add("clicked");
    let value = matrix[r][c];
    if (value === "no bomb") {
        targetSquare.innerText
    }
}