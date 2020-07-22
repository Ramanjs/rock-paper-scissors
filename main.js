const computerChoiceDiv = document.querySelector('#computer-choice');
const playerChoiceDiv = document.querySelector('#player-choice');
const computerScoreDiv = document.querySelector('#computer-score');
const playerScoreDiv = document.querySelector('#player-score');
const messageBox = document.querySelector('#message-box');
const newGameButton = document.querySelector('#new-game');
const buttons = Array.from(document.querySelectorAll('.btn'));


buttons.forEach(button => button.addEventListener('click', setPlayerSelection));

function setPlayerSelection() {
    let playerSelection = this.id;
    playRound(playerSelection);
}

function getComputerSelection() {
	let rps = ['rock', 'paper', 'scissors'];
    return rps[getRandomNumberInRange(0, 2)];
}

function getRandomNumberInRange(a, b) {
	return Math.floor(Math.random() * (b - a + 1));
}

function getResult(playerSelection, computerSelection) {
    let result = '';
    if (computerSelection !== playerSelection){
        if (computerSelection === 'rock') {
            if (playerSelection === 'scissors') {
                result = 'loss';
            } else {
                result = 'win';
            }
        }
        else if (computerSelection === 'paper') {
            if (playerSelection === 'rock') {
                result = 'loss';
            } else {
                result = 'win';
            }
        }
        else if (computerSelection === 'scissors') {
            if (playerSelection === 'paper') {
                result = 'loss';
            } else {
                result = 'win';
            }
        }
    } else {
        result = 'draw';
    }
    return result;
}

function updateChoice(choiceDiv, selection) {
    if (choiceDiv.firstChild) {
        choiceDiv.removeChild(choiceDiv.firstChild);
    }

    let icon = getIconElement(selection);
    choiceDiv.appendChild(icon);
}

function updateScoreboard(result) {
    if (result === 'win') {
        let playerScore = parseInt(playerScoreDiv.innerText);
        playerScore += 1;
        playerScoreDiv.innerText = playerScore;
    } else if (result === 'loss') {
        let computerScore = parseInt(computerScoreDiv.innerText);
        computerScore += 1;
        computerScoreDiv.innerText = computerScore;
    }
}

function getIconElement(selection) {
    let icon = document.createElement('i');
    let className = `fa-hand-${selection}-o`;
    icon.classList.add('fa');
    icon.classList.add(className);
    icon.classList.add('fa-2x');
    return icon;
}

function playRound(playerSelection) {
    let computerSelection = getComputerSelection();

    result = getResult(playerSelection, computerSelection);
    updateChoice(playerChoiceDiv, playerSelection);
    updateChoice(computerChoiceDiv, computerSelection);
    updateScoreboard(result);

    if (checkForGameOver()) {
        let winner = getWinner();
        displayMessage(winner);
        deactivateButtons();
        activateNewGameButton();
    }
}

function checkForGameOver() {
	let isGameOver = false;

	let playerScore = parseInt(playerScoreDiv.innerText);
	let computerScore = parseInt(computerScoreDiv.innerText);

	if (playerScore === 5 || computerScore === 5) {
		isGameOver = true;
	}
	return isGameOver;
}

function getWinner() {
	let playerScore = parseInt(playerScoreDiv.innerText);
	let computerScore = parseInt(computerScoreDiv.innerText);
    let winner = 'computer';
    if (playerScore > computerScore) {
        winner = 'player';
    }
    return winner;
}

function displayMessage(winner) {
    if (winner === 'player') {
        messageBox.innerText = 'Congrats! You won the game.';
    } else {
        messageBox.innerText = 'You lost! Better luck next time.';
    }
}

function deactivateButtons() {
    buttons.forEach(button => button.removeEventListener('click', setPlayerSelection));
}

function activateNewGameButton() {
    newGameButton.style.visibility = 'visible';

    newGameButton.addEventListener('click', resetGame);
}

function resetGame() {
    resetScoreboard();
    activateButtons();
    deactivateNewGameButton();
    resetFightArea();
    resetMessage();
}

function resetScoreboard() {
    playerScoreDiv.innerText = '0';
    computerScoreDiv.innerText = '0';
}

function activateButtons() {
    buttons.forEach(button => button.addEventListener('click', setPlayerSelection));
}

function resetMessage() {
    messageBox.innerText = 'First to reach 5 points wins!';
}

function deactivateNewGameButton() {
    newGameButton.style.visibility = 'hidden';
    newGameButton.removeEventListener('click', resetGame);
}

function resetFightArea() {
    updateChoice(playerChoiceDiv, '');
    updateChoice(computerChoiceDiv, '');
}