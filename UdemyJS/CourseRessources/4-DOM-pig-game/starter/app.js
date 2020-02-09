/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScores, activePlayer;

Initialyze();


document.querySelector(".btn-roll").addEventListener("click", function(){
    // Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    
    // Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // Update round score if rolleed number is not 1.
    if(dice !== 1){
        roundScores += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScores;
    } else {
        roundScores = 0;
        document.querySelector("#current-" + activePlayer).textContent = roundScores;
        swapPlayer();
    }
});

document.querySelector(".btn-hold").addEventListener("click", event => {
    scores[activePlayer] += roundScores;

    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    document.querySelector("#current-" + activePlayer).textContent = "0";

    if(scores[activePlayer] >= 100) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!!!";
    } else {
        swapPlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", event => {
    Initialyze();
});


function Initialyze(){
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".dice").style.display = "none";
}

function swapPlayer(){
    roundScores = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}








//Writing to DOM
//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//Reading from DOM
let x = document.querySelector("#score-" + activePlayer).textContent;

//Changing CSS
//document.querySelector(".dice").style.display = "none";

/******************************
 * Events
 */

/*function roll_dice() {
    console.log("Hej");
}

document.querySelector(".btn-roll").addEventListener("click", roll_dice)*/