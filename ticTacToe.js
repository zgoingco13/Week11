const X_CLASS = 'x' //constant variables so no need to duplicate a bunch of times//
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
] //winning combination of 3 in a row where 3 vertical, horizontal, and diagnol is a winner//
const cellElements = document.querySelectorAll('[ttt-cell]') //selects all the 9 cells of board//
const board = document.getElementById('board') //calling id element//
const winningMessageElement = document.getElementById('winningMessage') //calling winning message text element //
const restartButton = document.getElementById('restartButton') //calling restart button//
const winningMessageTextElement = document.querySelector('[ttt-winning-message-text')
let oTurn

startGame(); //calls function to start game//

restartButton.addEventListener('click', startGame);
//calls start game function when restart button is clicked//

function startGame() {
    oTurn = false //x starts game//
    cellElements.forEach(cell => { //loops through each cell//
        cell.classList.remove(X_CLASS); //has an empty board whenever start game function is called//
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick) //when game is restarted, removes any click actions//
        cell.addEventListener('click', handleClick, { once: true }) //only fires the clicked action once per cell//
    }) //allows to start game with hovered x//
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) { //e = element//
    const cell = e.target //whatever cell clicked//
    const currentClass = oTurn ?  O_CLASS : X_CLASS //return=?, : = else//
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false) //whether or not it is a draw//
    } else if(isDraw()) {
        endGame(true) //end game if there is a draw//
    } else {
        swapTurns() //calls function to swap turns if no winner//
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!' //if it's a draw, tells it's a draw//
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
    } //if it's o's turn, tells o wins ad x's turn, vice versa//
    winningMessageElement.classList.add('show') //shows the winning element//
}

function isDraw() {
    return [...cellElements].every(cell => { //... destructs or unpacks the cell class so that it has an every element//
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    }) //makes sure every cell has an x or o to define a draw//
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass) //adds the x's and o's//
}

function swapTurns() {
    oTurn = !oTurn //switches turn between x's and o's after every placement//
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS)
        if (oTurn) {
            board.classList.add(O_CLASS);
        } else (
            board.classList.add(X_CLASS)
        )
} //when hovering will show who's turn it is//
    
//checks all winning combination if current combination or indices matches any of the winning combos listed above//
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => { //if the current class matches of the winning combos, it's a winner//
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
