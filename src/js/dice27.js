const baseTotal = 27;
const windowWidth = document.body.clientWidth;
const windowHeight = window.innerHeight;
const Graphics = PIXI.Graphics;
const Sprite = PIXI.Sprite;

var numberCoins;
var currTotal = 27;
var turn = true;
var rolls = [];
var scoreboard = [0, 0];
var coins = [];
var lines = [];

let app = new PIXI.Application({
    backgroundAlpha: 0,
    width: windowWidth,
    height: windowHeight * .15
});

document.getElementById("overalScore").innerHTML = currTotal;
document.getElementById("player0").innerHTML = scoreboard[0];
document.getElementById("player1").innerHTML = scoreboard[1];


//set array to size
for (let i = 0; i <= baseTotal; i++) {
    rolls[i] = 0;
}



function roll() {
    //get random number between 1-6
    let rollValue = Math.floor(Math.random() * 6) + 1;
    let player;

    for(let i = 0; i < baseTotal; i++){
        app.stage.removeChild(lines[i]);
    }

    document.getElementById("dice").src = "../images/dice" + rollValue + ".png";

    //determine whos turn it is and prep for next roll
    if(turn){
        player = 0;
        turn = false;
    }
    else{
        player = 1;
        turn = true;
    }

    rolls[0]++;
    rolls[currTotal]++;

    scoreboard[player] = scoreboard[player] + calculateScore(rollValue);
    document.getElementById("player" + player).innerHTML = scoreboard[player];

    checkScore();
}

function calculateScore(rollValue) {
    let points = currTotal % rollValue;
    currTotal = currTotal - points;
    numberCoins = points;

    document.getElementById("overalScore").innerHTML = currTotal;

    for(let i = rollValue - 1; i < currTotal; i = i + rollValue){
        app.stage.addChild(lines[i]);
    }

    for(let i = currTotal; i < baseTotal; i++){
        app.stage.removeChild(coins[i]);
    }

    /*
    if(points != 0){
        document.getElementById("rollButton").hidden = true;
        for(let i = currTotal; i < currTotal + points; i++){
            coins[i].interactive = true;
        }
    }*/
    return points;
}

function checkScore() {
    if (currTotal == 0) {
        document.getElementById("app").removeChild(app.view);
        document.getElementById("rollButton").hidden = true;
        if (scoreboard[0] > scoreboard[1]) {
            document.getElementById("overalScore").innerHTML = "Player 1 Wins!";
        }
        else {
            document.getElementById("overalScore").innerHTML = "Player 2 Wins!";
        }
        document.getElementById("resetButton").hidden = false;

        for (let i = 0; i <= baseTotal; i++) {
            document.getElementById("roll" + i).innerHTML = rolls[i];
        }
        document.getElementById("results").hidden = false;

    }
}

function reset() {
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
    createGame();
}

function createGame(){
    
    document.getElementById("app").appendChild(app.view);
    
    //place the chips on the board
    for (i = 0, dist = 40; i < baseTotal; i++) {
        let j = i;
    
        const chipWidth = 30;
        const chipHeight = 30;

        lines[i] = new Graphics;
        lines[i].beginFill("0x000000");
        lines[i].drawRect(dist + 33, 0, 5, 5000);
        lines[i].endFill();
    
        coins[i] = new Graphics();
        coins[i].beginFill("0xFFD700");              // ellipse color
        coins[i].lineStyle(1, "0x000000", 1);    // ellipse border
        coins[i].drawEllipse(dist, 75, chipWidth, chipHeight);    // position + size of the ellipse (topleft x, topleft y, height, width)
        coins[i].interactive = false;
        coins[i].buttonMode = true;
        coins[i].on('poniterdown', (event) => removeChip(j));
        coins[i].endFill();                 // draws the ellipse
    
        app.stage.addChild(coins[i]);               // stage the ellipse
        dist = dist + 70;
    }


    document.getElementById("createGame").hidden = true;
    document.getElementById("rollButton").hidden = false;
    document.getElementById("dice").hidden = false;
}

function removeChip(chipNumber){
    //app.stage.removeChild(coins[chipNumber]);
    console.log("Hello");
}

function hover(object, alphaVal) {
    object.alpha = alphaVal;
  }
  
  function hoverOut(object) {
    object.alpha = 1;
  }