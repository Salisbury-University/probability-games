const baseTotal = 27;
var currTotal = 27;
var turn = true;
var rolls = [];
var scoreboard = [0,0];

document.getElementById("overalScore").innerHTML = currTotal;
document.getElementById("player0").innerHTML = scoreboard[0];
document.getElementById("player1").innerHTML = scoreboard[1];
//set array to size
for(let i = 0; i <= baseTotal; i++){
    rolls[i] = 0;
}


function roll(){
    //get random number between 1-6
    let rollValue = Math.floor(Math.random() * 6) + 1;
    let player;

    document.getElementById("dice").src = "../images/dice" + rollValue + ".png";

    //determine whos turn it is and prep for next roll
    if(turn){
        player = 1;
        turn = false;
    }
    else{
        player = 0;
        turn = true;
    }

    rolls[0]++;
    rolls[currTotal]++;
    
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

        for(let i = 0; i <= baseTotal; i++){
            document.getElementById("roll" + i).innerHTML = rolls[i];
        }
        document.getElementById("results").hidden = false;
        
    }
}

function reset(){
    currTotal = baseTotal;
    scoreboard[0] = 0;
    scoreboard[1] = 0;
    turn = true;
    document.getElementById("resetButton").hidden = true;
    document.getElementById("rollButton").hidden = false;
    document.getElementById("overalScore").innerHTML = currTotal;
    document.getElementById("player0").innerHTML = scoreboard[0];
    document.getElementById("player1").innerHTML = scoreboard[1];
    document.getElementById("results").hidden = true;
}


