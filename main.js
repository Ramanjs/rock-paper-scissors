function computerPlay() {
    return Math.floor(Math.random()*3);
}

function playRound(playerSelection, computerSelection) {
    if (computerSelection != playerSelection){
        if (computerSelection === 0) {
            if (playerSelection === 1) {
                return 1;
            }
            return 0;
        }
        else if (computerSelection === 1) {
            if (playerSelection === 2) {
                return 1;
            }
            return 0;
        }
        else {
            if (playerSelection === 0) {
                return 1;
            }
            return 0;
        }
    }
    else
        return 2;
}

function playerPlay(message) {
    input = window.prompt(message + 'Rock, paper or scissors?');
    input = input.toLowerCase();
    if (input == 'rock'){
        return 0;
    }else if (input == 'paper') {
        return 1;
    }
    else
        return 2;
}

function playGame() {
    words = ['rock', 'paper', 'scissors']
    let playerScore = 0;
    let computerScore = 0;
    message = '';
    for(let i = 0; i<5; i++){
        playerSelection = playerPlay(message);
        computerSelection = computerPlay();

        result = playRound(playerSelection, computerSelection);
    
        if(result == 1) {
            message = 'You won this round. ' + 
                        words[playerSelection] + ' beats ' + words[computerSelection] + '\n';

            playerScore++;
        }else if(result == 0){
            message = 'You lost this round. ' + 
                        words[computerSelection] + ' beats ' + words[playerSelection] + '\n';
            
            computerScore++;
        }
        else {
            message = 'Its a draw' + '\n';
        }
    }

    if (playerScore > computerScore) {
        window.prompt('Game over. Congrats you won');
    }
    else if (playerScore < computerScore) {
        window.prompt('Game over. You lose')
    }
    else {
        window.prompt('Game over. Its a draw')
    }
}

// playGame();