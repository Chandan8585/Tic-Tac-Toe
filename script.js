const playerOne = 'x';
const playerTwo = 'circle';
const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restart');
const winningMessageTextElement = document.getElementById('winningMessageText');
let isPlayerTwoTurn = false;

startGame();
restartButton.addEventListener("click", startGame)
   function startGame(){
    isPlayerTwoTurn = false;
 cellElements.forEach(cell => {
    cell.classList.remove(playerOne);
    cell.classList.remove(playerTwo);
    cell.removeEventListener('click', handleCellClick)
    cell.addEventListener('click', handleCellClick , {once: true})
 });
 setBoardHoverClass()
 winningMessageElement.classList.remove('show')
}



function handleCellClick(e){
    const cell = e.target
    const currentClass = isPlayerTwoTurn ? playerOne : playerTwo
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }

}


function endGame(draw){
    if(draw){
        winningMessageTextElement.innerHTML = "it is a Draw";
    }
    else{
        winningMessageTextElement.innerHTML = `Player with ${isPlayerTwoTurn ? "X's" : "O's"}  wins!`
    }
    winningMessageElement.classList.add('show')
}


function isDraw(){
    return[...cellElements].every(cell =>{
        return cell.classList.contains(playerOne) || cell.classList.contains(playerTwo)
    })
} 

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    isPlayerTwoTurn = !isPlayerTwoTurn
}

function setBoardHoverClass(){
    boardElement.classList.remove(playerOne);
    boardElement.classList.remove(playerTwo);
    if(isPlayerTwoTurn){
        boardElement.classList.add(playerOne);
    }
    else{
        boardElement.classList.add(playerTwo);
    }
}


function checkWin(currentClass){
      return winningCombination.some(e =>{
        return e.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
      })
}