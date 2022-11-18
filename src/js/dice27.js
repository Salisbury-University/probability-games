const baseTotal = 27;
const windowWidth = document.body.clientWidth;
const windowHeight = window.innerHeight;
const Graphics = PIXI.Graphics;
const Sprite = PIXI.Sprite;

var currTotal = 27;
var turn = true;
var rolls = [];
var scoreboard = [0, 0];
var coins = [];
var coinStack = new Array(13);

let app = new PIXI.Application({
    backgroundAlpha: 0,
    width: windowWidth,
    height: windowHeight * .15
});

// Stack class
class Stack {

    // Array is used to implement stack
    constructor() {
        this.items = [];
    }

    // Functions to be implemented
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length == 0;
    }
    contains(val) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] == val) {
                return true;
            }
        }
        return false;
    }
    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++) {
            str += this.items[i] + " ";
        }
        return str;
    }
}




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

    document.getElementById("dice").src = "../images/dice" + rollValue + ".png";

    //determine whos turn it is and prep for next roll
    if (turn) {
        player = 1;
        turn = false;
    }
    else {
        player = 0;
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
    document.getElementById("overalScore").innerHTML = currTotal;
    for(i = currTotal; i < baseTotal; i++){
        app.stage.removeChild(coins[i]);
    }
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
    
        const chipWidth = 30;
        const chipHeight = 20;
    
        coins[i] = new Graphics();
        coins[i].beginFill("0xFFD700");              // ellipse color
        coins[i].lineStyle(1, "0x000000", 1);    // ellipse border
        coins[i].drawEllipse(0, 0, chipWidth, chipHeight);    // position + size of the ellipse (topleft x, topleft y, height, width)
        coins[i].x = dist;
        coins[i].y = 75;
        coins[i].interactive = true;
        coins[i].buttonMode = true;
        coins[i].endFill();                      // draws the ellipse
    
        app.stage.addChild(coins[i]);               // stage the ellipse
        dist = dist + 70;
    }
    document.getElementById("createGame").hidden = true;
    document.getElementById("rollButton").hidden = false;
    document.getElementById("dice").hidden = false;
}