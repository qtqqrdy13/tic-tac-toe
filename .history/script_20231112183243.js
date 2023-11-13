let currentPlayer = 'X';
let gameBoard = ['','','','','','','','',''];
let playerXName = 'player X';
let playerOName = 'player O';
let playerXScore = 0;
let playerOScore = 0;
let botEnabled = false;
let botDifficulty = 'easy';

const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');
const botCheckBox = document.getElementById('botCheckBox');
const difficultySelect = document.getElementById('difficultySelect');

difficultySelect.addEventListener('change',() => {
    botDifficulty = difficultySelect.value;
});

function startGame(){
    playerXName = playerXInput.value || 'player X';
    playerOName = playerOInput.value || 'player O';
    playerXInput.disabled = true;
    playerOInput.disabled = true;
    botEnabled = botCheckBox.checked;
    botCheckBox.disabled = true;
    difficultySelect.disabled = true;
    document.querySelector('.player-input button').disabled = true; 
    if(botEnabled && currentPlayer === 'O'){
        makeBotMove();
    }
}

function makeMove(cell){
    const cellIndex = Array.from( cell.parentNode.children).indexOf(cell);
    if(gameBoard[cellIndex] === '' && !checkWinner()){
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer, 'clicked');
        currentPlayer = currentPlayer === 'X' ? 'O': 'X';
        if(botEnabled && currentPlayer === 'O'){
            setTimeout(makeBotMove, 500)
        }
    }
checkWinner()
}

function makeBotMove(){
    if(botDifficulty === 'easy'){
        makeRandomBotMove()
    }
    else if(botDifficulty === 'medium'){
        makeRandomBotMove()
    }
    else if(botDifficulty === 'hard'){
        makeRandomBotMove()
    }
}

function makeRandomBotMove(){
    const availableMoves = gameBoard.reduce((moves, cell , index)=>{
        if(cell === ''){
            moves.push(index)
        }
        return moves 
    }, []);
const  randomIndex = Math.floor(Math.random() * availableMoves.length);
makeMove(document.querySelectorAll('.cell')[availableMoves[randomIndex]]);
}

function makeSmartBotMove(){
    ////
    ////
    makeRandomBotMove()
}
function makeHardBotMove(){
    ////
    ////
    makeRandomBotMove()
}

function checkWinner(){
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for( const combination of winningCombinations ){
        const[a,b,c] = combination
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] & gameBoard[a] === gameBoard[c]){
            alert(`Player ${gameBoard[a]} win!`);
            updateScore(gameBoard[a]);
            resetGame();
            return true;
        }
    }
    if(!gameBoard.includes('')){
        alert('Draw')
        resetGame();
        return true;
    }
    return false;
}


function updateScore(winner){
    if(winner === 'X'){
        playerXScore ++ ;
    }
    else{
        playerOScore ++;
    }
    playerXScoreDisplay.textContent = playerXScore;
    playerOScoreDisplay.textContent = playerOScore;
}

function resetGame(){
    gameBoard = ['','','','','','','','',''];
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell =>{
        cell.textContent = '';
        cell.classList.remove('X','O','clicked');
    })
    playerXInput.value = '';
    playerOInput.value = '';
    playerXInput.disabled = false;
    playerOInput.disabled = false;
    botCheckBox.disabled = false;
    difficultySelect.disabled = false;
    document.querySelector('.player-input button').disabled = false;
    playerXInput.placeholder = 'Player X';
    playerOInput.placeholder = 'Player O';
    if(botEnabled && currentPlayer === 'O'){
makeBotMove();
    }
}


