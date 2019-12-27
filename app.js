/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var mainScores, activeScore, activePlayer, gameISGOINGON, inputGameLimit;
newGame();


document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gameISGOINGON) {
        //Give a random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //Display the result on the page
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //Update the score if the number was not 1.
        if (dice > 1) {
            //Add score
            activeScore = activeScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = activeScore;
        } else {
            nextplayer();
        }
    }


});

//MAKING THE HOLD BUTTON WORK

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameISGOINGON) {
        //Add ACTIVE score to MAIN score
        mainScores[activePlayer] = mainScores[activePlayer] + activeScore

        //Update the UI 
        document.getElementById('score-' + activePlayer).textContent = mainScores[activePlayer]

        //Check if the player has won the game

        if (mainScores[activePlayer] >= inputGameLimit) {
            //Change player name to VICTORY :D 
            document.querySelector('#name-' + activePlayer).textContent = 'VICTORY!! :D';
            //Remove dice icon
            document.querySelector('.dice').style.display = 'none';
            //Make the winner look better with CSS 
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameISGOINGON = false;
        } else {
            //Active player = Next player
            nextplayer();
        }
    }
})

/***<----         ALL THE BACKGROUND STUFF YOU DONT NEED TO CARE ABOUT (jk u do)  ---->****/

function nextplayer() {
    //Switch over to next player
    if (activePlayer === 0) {
        activePlayer = 1
    } else {
        activePlayer = 0;
    }
    activeScore = 0;

    //Reset the score to 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    //Make the other player ACTIVE
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function newGame() {
    mainScores = [0, 0];
    activeScore = 0;
    activePlayer = 0;
    inputGameLimit = prompt("Enter the winning score");
    gameISGOINGON = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //Change the name back from WINNER to Player 1 and 2 
    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';
    //Remove winner and active CSS from the classes.
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

};

document.querySelector('.btn-new').addEventListener('click', newGame);
