document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const nameContainer = document.getElementById('nameContainer');
    const playerNameInput = document.getElementById('playerName');
    const submitNameButton = document.getElementById('submitName');
    const choiceContainer = document.getElementById('choiceContainer');
    const chooseX = document.getElementById('chooseX');
    const chooseO = document.getElementById('chooseO');
    const scoreContainer = document.getElementById('scoreContainer');
    const playerLabel = document.getElementById('playerLabel');
    const playerScoreElem = document.getElementById('playerScore');
    const computerScoreElem = document.getElementById('computerScore');
    const drawsElem = document.getElementById('draws');
    const resultContainer = document.getElementById('resultContainer');
    const resultMessage = document.getElementById('resultMessage');
    const playAgainButton = document.getElementById('playAgainButton');

    let playerName = '';
    let currentPlayer = 'X';
    let playerMarker = 'X';
    let computerMarker = 'O';
    let boardState = Array(9).fill(null);
    let gameActive = false;
    let playerScore = 0;
    let computerScore = 0;
    let draws = 0;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function startGame() {
        gameActive = true;
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        resultContainer.style.display = 'none';
    }

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (boardState[cellIndex] || !gameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            endGame(false);
        } else if (boardState.every(cell => cell)) {
            endGame(true);
        } else {
            switchPlayer();
            if (currentPlayer === computerMarker) {
                computerMove();
            }
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === playerMarker ? computerMarker : playerMarker;
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function endGame(draw) {
        gameActive = false;
        if (draw) {
            resultMessage.textContent = "It's a draw!";
            draws++;
            drawsElem.textContent = draws;
        } else {
            resultMessage.textContent = `${currentPlayer === playerMarker ? playerName : 'Computer'} wins!`;
            if (currentPlayer === playerMarker) {
                playerScore++;
                playerScoreElem.textContent = playerScore;
            } else {
                computerScore++;
                computerScoreElem.textContent = computerScore;
            }
        }
        resultContainer.style.display = 'block';
    }

    function computerMove() {
        let emptyCells = [];
        boardState.forEach((cell, index) => {
            if (!cell) {
                emptyCells.push(index);
            }
        });

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        boardState[randomIndex] = computerMarker;
        cells[randomIndex].textContent = computerMarker;

        if (checkWin()) {
            endGame(false);
        } else if (boardState.every(cell => cell)) {
            endGame(true);
        } else {
            switchPlayer();
        }
    }

    function handlePlayAgain() {
        startGame();
    }

    function handleSubmitName() {
        playerName = playerNameInput.value;
        if (playerName) {
            playerLabel.textContent = playerName;
            nameContainer.style.display = 'none';
            choiceContainer.style.display = 'block';
        }
    }

    function handleChooseMarker(event) {
        playerMarker = event.target.id === 'chooseX' ? 'X' : 'O';
        computerMarker = playerMarker === 'X' ? 'O' : 'X';
        choiceContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        gameBoard.style.display = 'grid';
        startGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    submitNameButton.addEventListener('click', handleSubmitName);
    chooseX.addEventListener('click', handleChooseMarker);
    chooseO.addEventListener('click', handleChooseMarker);
    playAgainButton.addEventListener('click', handlePlayAgain);
});
function createBubbles() {
    const colors = ['blue', 'rose', 'purple'];
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble', colors[Math.floor(Math.random() * colors.length)]);
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.width = `${Math.random() * 50 + 20}px`;
        bubble.style.height = bubble.style.width;
        document.body.appendChild(bubble);
    }
}

createBubbles();
