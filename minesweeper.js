document.addEventListener('DOMContentLoaded', startGame)

var boardSize = 0;
var difficulty = 0;

// Define your `board` object here!
var board = {
    cells: []
};

function startGame() {
    // Don't remove this function call: it makes the game work!
    boardSize = prompt("Board Size from 2-6")
    difficulty = prompt("Difficulty 1-Most Difficult, 9-Easiest")

    boardGen(boardSize, difficulty);

    for (let i = 0; i < board.cells.length; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    }

    document.addEventListener('click', checkForWin)
    document.addEventListener('contextmenu', checkForWin)
    document.addEventListener('auxclick', resetGame)
    lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

    var remaining = 0

    for (let i = 0; i < board.cells.length; i++) {
        if (board.cells[i].isMine) {
            if (!board.cells[i].isMarked)
                return;

        } else if (board.cells[i].hidden)
            return;
    }
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    lib.displayMessage('You win!')
}

function boardGen(size, difficulty) {
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            board.cells.push({
                row: r,
                col: c,
                isMine: (Math.random() >= (difficulty * 0.1)),
                hidden: true
            })
        }
    }
}

function resetGame() {
    document.getElementsByClassName("board")[0].innerHTML = "";
    board = {
        cells: []
    };
    startGame();
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col)
    var amount = 0;

    for (let i = 0; i < surrounding.length; i++) {
        if (surrounding[i].isMine == true) {
            amount++;
        }
    }
    return amount;
}