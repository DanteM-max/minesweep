console.log("Script started");
let boardDiv = document.querySelector("#board");
let matrix = [];
let rowArr = [];
let bombCount = 10;
for (let row = 0; row < 10; row++) {
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
        square.style.height = "160px";
        square.style.width = "160px";
        square.style.display = "inline-block";
        boardDiv.appendChild(square);
        if (bombCount > 0 && (Math.random() >= (0.9))) {
            rowArr.push("x");
            bombCount--;
        } else {
            rowArr.push("o");
        }
        square.innerText = rowArr[col];
    }
    matrix.push(rowArr);
    rowArr = [];
    boardDiv.appendChild(document.createElement("br"));
}