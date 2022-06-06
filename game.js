let scorePlayer = 0;
let scoreComputer = 0;

let i = 0;


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (scorePlayer < 5 && scoreComputer < 5) {
            i++;            
            let playerSelection = button.textContent;
            console.log(playerSelection);

            let computerSelection = computerPlay();
            let res = playRound(playerSelection, computerSelection);
            console.log(res);

            let winner = res[2];
            console.log(winner);
            scorePlayer += res[0];
            scoreComputer += res[1];

            showRoundResult(i, playerSelection, computerSelection, winner);

            document.getElementById("playerRunningScore").textContent = scorePlayer;
            document.getElementById("computerRunningScore").textContent = scoreComputer;

        } else {
            let winner = "";
            if (scorePlayer == 5) {winner = "Player"}
            else{winner = "Computer"}
            let end = document.createElement("h2");
            console.log("winner " + winner)
            end.textContent = "End of the game: " + winner + " wins!";
            document.getElementById("results").appendChild(end);
            let restart = document.createElement("button");
            restart.type = "button";
            restart.textContent = "Restart game";
            restart.id = "restart";
            restart.addEventListener('click', () => {
                location.reload()
            })
            document.getElementById("results").appendChild(restart);
        }
    });
    

});

function computerPlay() {
    let random = Math.floor(Math.random()*3)
    let play = "Scissors"
    if (random == 0) {
        play = "Rock"
    } else if (random == 1) {
        play = "Paper"
    }
    return play
}

function playRound(playerSelection, computerSelection) {
    let scoPlayer = 0;
    let scoComputer = 0;
    let winner = "";
    if (playerSelection.toLowerCase() == 'rock') {
        const expr = computerSelection;
        switch (expr) {
            case 'Rock':
                console.log("It's a tie!");
                break;
            case 'Paper':
                scoComputer += 1
                winner = "Player";
                console.log('You lose! Paper beats Rock');
                break;
            case 'Scissors':
                scoPlayer += 1;
                winner = "Computer";
                console.log('You win! Rock beats Scissors');
                break;
            default:
            console.log(`Sorry, there is something wrong.`);
        }
    } else if (playerSelection.toLowerCase() == 'paper') {
        const expr = computerSelection;
        switch (expr) {
            case 'Rock':
                scoPlayer += 1;
                winner = "Player";
                console.log('You win! Paper beats Rock');
                break;
            case 'Paper':
                console.log("It's a tie!");
                break;
            case 'Scissors':
                scoComputer += 1
                winner = "Computer";
                console.log('You lose! Scissors beats Paper');
                break;
            default:
            console.log(`Sorry, there is something wrong.`);
        }
    } else if (playerSelection.toLowerCase() == 'scissors') {
        const expr = computerSelection;
        switch (expr) {
            case 'Rock':
                scoComputer += 1
                winner = "Computer";
                console.log('You lose! Rock beats Scissors');
                break;
            case 'Paper':
                console.log('You win! Scissors beats Paper');
                break;
            case 'Scissors':
                scoPlayer += 1;
                winner = "Player";
                console.log("It's a tie!");
                break;
            default:
                console.log(`Sorry, there is something wrong.`);
        }
    }
    return [scoPlayer, scoComputer, winner]
}

function showRoundResult(i, playerSelection, computerSelection, winner) {
    let divRound = document.createElement("div");
    divRound.className = "round";
    divRound.id = "round" + i;

    let divRoundNb = document.createElement("div");
    divRoundNb.className = "roundNb";
    divRoundNb.textContent = "Round n°" + i;
    divRound.appendChild(divRoundNb);

    let divPlayerChoice = document.createElement("div");
    divPlayerChoice.textContent = playerSelection;
    divRound.appendChild(divPlayerChoice);

    let versus = document.createElement("div");
    versus.textContent = "v.";
    divRound.appendChild(versus);

    let divComputerChoice = document.createElement("div");
    divComputerChoice.textContent = computerSelection;
    divRound.appendChild(divComputerChoice);

    let divRoundResult = document.createElement("div");
    if (winner == "") {
        divRoundResult.textContent = "It's a tie!";
    } else {
        divRoundResult.textContent = winner + " wins!";
    }
    divRound.appendChild(divRoundResult);

    document.getElementById("results").appendChild(divRound);
}