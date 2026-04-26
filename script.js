console.log("Script started");
let boardDiv = document.querySelector("#board");
let matrix = [];
let rowArr = [];
let bombInput = document.getElementById("bombs");
bombInput.addEventListener('input', function() {
    if (this.value === "") {
        return;
    }
    if (parseInt(this.value) > 25) {
        this.value = 25;
    }
    if (parseInt(this.value) < 0) {
        this.value = 0;
    }
})
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
        square.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            flag(event);
        })
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
let gameState = "not started";

function placeBombs(event) {
    if (gameState === "started") {
        let clickedRow = parseInt(event.target.dataset.row);
        let clickedCol = parseInt(event.target.dataset.col);

        revealSquare(clickedRow, clickedCol);
        return;
    }

    gameState = "started";
    let staRt = parseInt(event.target.dataset.row);
    let staCt = parseInt(event.target.dataset.col);
    let amount = bombInput.value;
    if (amount == 0) {
        alert("Sorry, gotta put something in the box. Usually there's 10 bombs.");
        location.reload();
        return;
}
    matrix[event.target.dataset.row][event.target.dataset.col] = "no bomb";
    console.log(matrix[event.target.dataset.row][event.target.dataset.col]);
    for (let i= 0; i < amount; i++) {
        let rowForPos = random(0,7), colForPos = random(0,9);
        let isNearFirstClick = Math.abs(rowForPos - staRt) <= 1 && Math.abs(colForPos-staCt) <= 1;
        if (matrix[rowForPos][colForPos] == "undecided" && !isNearFirstClick) {
            matrix[rowForPos][colForPos] = "bomb";
        } else {
            i--;
        }
        console.log("(" + (rowForPos+0) + "," + (colForPos+0) + "): " + matrix[rowForPos][colForPos]);
    }
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            if (matrix[r][c] == "undecided") {
                matrix[r][c] = "no bomb";
            }
            console.log(r+ ", " + c + " matrix value at the position is " + matrix[r][c]);
            let bombCount = 0;
            if (matrix[r][c] !== "bomb") {
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
            }

            if (bombCount != 0) {
                matrix[r][c] = bombCount;
                console.log(matrix);
            }
        }
    }
    let clickedRow = parseInt(event.target.dataset.row);
    let clickedCol = parseInt(event.target.dataset.col);

    revealSquare(clickedRow, clickedCol);
    checkWin();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // USE OF AI IN THE PROGRAM (I have a bad memory)
}

function revealSquare(r,c) { // Ai *inspired*, but code might appear AI-generated
    //keep in bounds
    if (r < 0 || r > 7 || c < 0 || c > 9) {
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
        targetSquare.innerText = "";
    } else if (value !== "bomb") {
        targetSquare.innerText = value;
        targetSquare.classList.add("number" + value);
    } else {
        gameState = "lost";
        
        
        targetSquare.classList.add("bomb");
        targetSquare.classList.remove("clicked");
        targetSquare.innerText = "💣";
        
        setTimeout(function() {
            targetSquare.innerText = '';
            setTimeout(function() {
                alert("Sorry, you blew up. Please restart to try again.");
            
                location.reload(true);  
            },50);
            
        },250);
    }

    if (value === "no bomb") {
        for (let rowOff = -1; rowOff <= 1; rowOff++) {
            for (let colOff = -1; colOff<=1; colOff++) {
                revealSquare(r + rowOff, c + colOff); //recursion taught by Gemini
            }
        }
    }
    checkWin();
}
let bombCounter = document.getElementById("amount");
function flag(event) { 
    event.target.classList.toggle("flagged");
    let bombs = document.querySelectorAll(".flagged").length;
    let amount = bombInput.value;
    bombCounter.innerText = (amount - bombs);
    checkWin();
}

function checkWin() {
    if (gameState !== "started") {
        return;
    }
    let squares = document.querySelectorAll('.square');
    let safeCount = 0; 
    let flaggedCount = 0; 
    let mineCount = 0; 
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains("clicked")) {
            safeCount++;
        }
        if (squares[i].classList.contains("flagged") && matrix[Math.floor(i/10)][i%10] !== "bomb") {
            flaggedCount++;
        }
        if (squares[i].classList.contains("flagged") && matrix[Math.floor(i/10)][i%10] === "bomb") {
            mineCount++;
        }
    }
    let amount = bombInput.value;
    if (safeCount == 80-amount) {
        gameState = "won";
        alert("Yay! You won!");
        squares.forEach((square,i) => {
            setTimeout(function() {
                squares[i].innerText = '';
                squares[i].className = '';
                squares[i].classList.add("square");
                squares[i].classList.add("win" + (random(0,3)));
            },i*25)
        })
    }
}