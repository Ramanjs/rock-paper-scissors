let computerChoiceDiv = document.querySelector('#computer-choice');
let playerChoiceDiv = document.querySelector('#player-choice');
let computerScoreDiv = document.querySelector('#computer-score');
let playerScoreDiv = document.querySelector('#player-score');
let buttons = Array.from(document.querySelectorAll('.btn'));


buttons.forEach(button => button.addEventListener('click', setPlayerSelection));

function setPlayerSelection(e) {
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
    if (result == 'win') {
        let playerScore = parseInt(playerScoreDiv.innerText);
        playerScore += 1;
        playerScoreDiv.innerText = playerScore;
    } else if (result == 'loss') {
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
    return icon;
}

function playRound(playerSelection) {
    let computerSelection = getComputerSelection();

    result = getResult(playerSelection, computerSelection);
    updateChoice(playerChoiceDiv, playerSelection);
    updateChoice(computerChoiceDiv, computerSelection);
    updateScoreboard(result);
}
