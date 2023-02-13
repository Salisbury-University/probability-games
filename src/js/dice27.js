const baseTotal = 27;
const PLAYER_1 = 0;
const PLAYER_2 = 1;
const AUDIO_ROLL = new Audio("../sounds/dice_roll.mp3");
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");
const windowWidth = document.body.clientWidth;
const windowHeight = window.innerHeight;
const Graphics = PIXI.Graphics;
const Sprite = PIXI.Sprite;

var currTotal = 27;
var newTotal = 27;
var rolls = [];
var rollValue = 1;
var playerTurn = 0;
var scoreboard = [0, 0];
var coins = [];
var lines = [];
var dice;
var clickedCount;

let app = new PIXI.Application({
    backgroundAlpha: 0,
    width: windowWidth,
    height: windowHeight * .15
});

let diceApp = new PIXI.Application({
    backgroundAlpha: 0,
    width: windowWidth,
    height: windowHeight * .15
});

diceApp.loader.baseUrl = "../images/";

diceApp.loader
  .add("dice0", "dice0.png")
  .add("dice1", "dice1.png")
  .add("dice2", "dice2.png")
  .add("dice3", "dice3.png")
  .add("dice4", "dice4.png")
  .add("dice5", "dice5.png")
  .add("dice6", "dice6.png");

diceApp.loader.load();

document.getElementById("overalScore").innerHTML = currTotal;
document.getElementById("player0").innerHTML = scoreboard[0];
document.getElementById("player1").innerHTML = scoreboard[1];


//set array to size
for (let i = 0; i <= baseTotal; i++) {
    rolls[i] = 0;
}

function roll() {
    //roll audio
    document.getElementById("rollButton").hidden = true;
    playAudio(AUDIO_ROLL);

    let ticks = 0;
    diceApp.ticker.add(() => {
        //rolling swap images
        if(ticks % 5 == 0 && ticks < 50){
            rollValue = Math.floor(Math.random() * 6) + 1;

            dice.texture = diceApp.loader.resources[`dice${rollValue}`].texture;
        }
        //done rolling
        else if(ticks == 50){         
            document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1)+ " Answer";
            document.getElementById("questionCard").hidden = false;
            document.getElementById("rollNumber").textContent = rollValue;
            document.getElementById("pilesQuestion").hidden = false;
            //document.getElementById("pilesInput").focus();
            ticks++;
        }

        ticks++;
    });
    rolls[0]++;
    rolls[currTotal]++;
}

function checkScore() {
    if (currTotal == 0) {
        document.getElementById("app").removeChild(app.view);
        document.getElementById("diceApp").removeChild(diceApp.view);
        document.getElementById("rollButton").hidden = true;
        document.getElementById("mainPrompt").hidden = true;
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
    playerTurn = 0;
    document.getElementById("resetButton").hidden = true;
    document.getElementById("rollButton").hidden = false;
    document.getElementById("overalScore").innerHTML = currTotal;
    document.getElementById("player0").innerHTML = scoreboard[0];
    document.getElementById("player1").innerHTML = scoreboard[1];
    document.getElementById("results").hidden = true;
    document.getElementById("mainPrompt").hidden = false;
    createGame();
}

function createGame(){
    document.getElementById("mainPrompt").textContent = "Player 1 Roll";
    
    document.getElementById("app").appendChild(app.view);
    document.getElementById("diceApp").appendChild(diceApp.view);
    
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
        coins[i].on("pointerdown", () => mark(coins[j]))
                /*.on("pointerdown", () => removeCoin(j))*/
                .on("pointerover", () => hover(coins[j]))
                .on("pointerout", () => hoverOut(coins[j]));
        coins[i].endFill();                 // draws the ellipse
    
        app.stage.addChild(coins[i]);               // stage the ellipse
        dist = dist + 70;
    }

    //create dice
    dice = new Sprite.from(diceApp.loader.resources["dice0"].texture);
    dice.x = windowWidth * .3;

    diceApp.stage.addChild(dice);

    document.getElementById("createGame").hidden = true;
    document.getElementById("rollButton").hidden = false;
}

function hover(object) {
    object.alpha = .5;
}
  
function hoverOut(object) {
    object.alpha = 1;
}

/*numberPilesCheck(answer)
    This fucntion is used to check if the students answer
    for the number of piles question prompt is correct
    
    if: answer is equal to numberPiles 
        correct message pops up 
        displays the next questions
    else: 
        wrong message pops up try again

    dont let the user go on until correct
  */
function numberPilesCheck(){
    
    //let userInput = document.getElementById("pilesInput").value;
    if(userInput == Math.floor(currTotal / rollValue)){
        playAudio(AUDIO_CORRECT);
        document.getElementById("pilesQuestion").hidden = true;
        document.getElementById("reminaderQuestion").hidden = false;
        addLines();
        document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1)+ " Answer";
        //document.getElementById("pilesInput").value = "";
        //document.getElementById("remainderInput").focus();
    }
    else{
        playAudio(AUDIO_WRONG);
        document.getElementById("mainPrompt").textContent = "Wrong try again";
    }
}

/*remaindercheck(answer)
    This function is used to check if the students answer
    for the remainder of chips questions is correct

    if:answer is equal to remainder
        correct message pops up
        display roll button again and have next player roll
    else:
        wrong message pops up try again
    don't let the user go on until correct
  */
function remainderCheck(){
    let userInput = document.getElementById("remainderInput").value;
    let remainder = currTotal % rollValue;
    if(userInput == remainder){
        playAudio(AUDIO_CORRECT);

        //make coins clickable if remainder is there
        if(remainder > 0){
            makeClickable(remainder);
        }
        //else just change players
        else{
            document.getElementById("reminaderQuestion").hidden = true;
            document.getElementById("remainderInput").value = "";
            document.getElementById("questionCard").hidden = true;        
            swapPlayer();
        }
    }
    else{
        playAudio(AUDIO_WRONG);
        document.getElementById("remainderInput").click();
        document.getElementById("mainPrompt").textContent = "Wrong try again";
    }
}

  //add lines to the game window
function addLines(){   
    for(let i = rollValue - 1; i < currTotal; i = i + rollValue){
        app.stage.addChild(lines[i]);
    }
}

function removeLines(){
    for(let i = rollValue - 1; i < currTotal; i = i + rollValue){
        app.stage.removeChild(lines[i]);
    }
}

function playAudio(audioName){
    /*audioName.pause();
    audioName.currentTime = 0;
    audioName.play();*/
}

function makeClickable(remainder){
    newTotal = currTotal - remainder;
    for(let i = currTotal - 1; i >= newTotal; i--){
        coins[i].interactive = true;
    }
    document.getElementById("reminaderQuestion").hidden = true;
    document.getElementById("remainderInput").value = "";
    document.getElementById("questionCard").hidden = true;
    document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1)+ " Remove you Chips";
}

function swapPlayer(){
    if(playerTurn == PLAYER_1){
        playerTurn = PLAYER_2;
    }
    else{
        playerTurn = PLAYER_1;
    }
    dice.texture = diceApp.loader.resources[`dice0`].texture;
    document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1)+ " Roll";
    document.getElementById("rollButton").hidden = false;
    removeLines();
    checkScore();
}

function removeCoin(coinNumber){
    app.stage.removeChild(coins[coinNumber]);
    currTotal--;
    scoreboard[playerTurn]++;
    document.getElementById("overalScore").innerHTML = currTotal;
    document.getElementById("player" + playerTurn).innerHTML = scoreboard[playerTurn];
    if(currTotal == newTotal){
        swapPlayer(); 
    }
}

function mark(coin){
    coin.tint = 0x788cf0;
}

function pileSubmit(){

}