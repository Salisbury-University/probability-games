const baseTotal = 27;
var currTotal = 27;
var turn = 0;
var scoreboard = [0,0];

document.getElementById("overalScore").innerHTML = currTotal;
document.getElementById("player0").innerHTML = scoreboard[0];
document.getElementById("player1").innerHTML = scoreboard[1];


function roll(){

    //get random number between 1-6
    let rollValue = Math.floor(Math.random() * 6) + 1;
    let player;

    document.getElementById("dice").src = "../images/dice" + rollValue + ".png";

    if(turn){
        player = 1;
        turn = false;
    }
    else{
        player = 0;
        turn = true;
    }
    
    scoreboard[player] = scoreboard[player] + calculateScore(rollValue);
    document.getElementById("player" + player).innerHTML = scoreboard[player];

    checkScore();
    
}

function calculateScore(rollValue){
    let points = currTotal % rollValue;
    currTotal = currTotal - points;
    document.getElementById("overalScore").innerHTML = currTotal;
    return points;
}

function checkScore(){
    if(currTotal == 0){
        document.getElementById("rollButton").hidden = true;
        if(scoreboard[0] > scoreboard[1]){
            document.getElementById("overalScore").innerHTML = "Player 1 Wins!";
        }
        else{
            document.getElementById("overalScore").innerHTML = "Player 2 Wins!";
        }
        document.getElementById("resetButton").hidden = false;
    }
}

function reset(){
    currTotal = baseTotal;
    scoreboard[0] = 0;
    scoreboard[1] = 0;
    document.getElementById("resetButton").hidden = true;
    document.getElementById("rollButton").hidden = false;
    document.getElementById("overalScore").innerHTML = currTotal;
    document.getElementById("player0").innerHTML = scoreboard[0];
    document.getElementById("player1").innerHTML = scoreboard[1];
}