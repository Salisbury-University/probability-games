const baseTotal = 3;
const AUDIO_ROLL = new Audio("../sounds/dice_roll.mp3");
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");
const windowWidth = window.innerWidth * .98;
const windowHeight = window.innerHeight;
const Graphics = PIXI.Graphics;
const Sprite = PIXI.Sprite;

class Line {
    #line;
    constructor(dist, chipSize) {
        this.#line = new Graphics;
        this.#line.beginFill("0x000000");
        this.#line.drawRect(dist + chipSize, 0, 5, 5000);
        this.#line.endFill();
    }
    getLine() {
        return this.#line;
    }
}

class Coin {
    #state;
    #coin;
    constructor(dist, yAxis, chipSize) {
        this.#state = 0;
        this.#coin = new Graphics;
        this.#createCoin(dist, yAxis, chipSize);

    }
    getState() {
        return this.#state;
    }
    getCoin() {
        return this.#coin;
    }
    setState(newState) {
        if ((newState == 0) || (newState == 1)) {
            this.#state = newState;
        }
    }
    setInteractive(state) {
        if (state == 1) {
            this.#coin.interactive = true;
        }
        else if (state == 0) {
            this.#coin.interactive = false;
        }
    }
    #createCoin(dist, yAxis, chipSize) {
        this.#coin.beginFill("0xFFD700");
        this.#coin.lineStyle(1, "0x000000", 1);
        this.#coin.drawCircle(dist, yAxis, chipSize);
        this.#coin.interactive = false;
        this.#coin.buttonMode = true;
        this.#coin.on("pointerdown", () => this.#select())
            .on("pointerdown", () => this.#removeCoin())
            .on("pointerover", () => this.#hover())
            .on("pointerout", () => this.#hoverOut());
        this.#coin.endFill();
    }
    #select() {
        if (game.getGameState() == 0) {
            if (this.#state == 0) {
                this.mark();
                game.setNumberClicked(1);
            }
            else {
                this.unmark();
                game.setNumberClicked(-1);
            }
        }
    }
    mark() {
        this.#coin.tint = 0x788cf0;
        this.#state = 1;
    }
    unmark() {
        this.#coin.tint = 0xFFFFFF;
        this.#state = 0;
    }
    #removeCoin() {
        if (game.getGameState() == 1) {
            game.getApp().stage.removeChild(this.#coin);
            game.updateScore();
        }
    }

    #hover() {
        this.#coin.alpha = .5;
    }
    #hoverOut() {
        this.#coin.alpha = 1;
    }
}

class WindowInfo {
    #windowWidth;
    #windowHeight;
    constructor() {
        this.#windowWidth = window.innerWidth * .98;
        this.#windowHeight = window.innerHeight;
    }
    getWindowWidth() {
        return this.#windowWidth;
    }
    getWindowHeight() {
        return this.#windowHeight;
    }
    resizeWindow() {
        this.#windowWidth = window.innerHeight * .98;
        this.#windowHeight = window.innerHeight;
    }
}

class App {
    #app;
    #appName;
    constructor(windowInfo, appName) {
        this.#app = this.#createApp(windowInfo);
        this.#appName = appName;
    }
    #createApp(windowInfo) {
        return new PIXI.Application({
            backgroundAlpha: 0,
            width: windowInfo.getWindowWidth(),
            height: windowInfo.getWindowHeight() * .15
        });
    }
    appendApp() {
        document.getElementById(this.#appName).appendChild(this.#app.view);
    }
    getAppName() {
        return this.#appName;
    }
    getApp() {
        return this.#app;
    }
    resize(windowInfo) {
        this.#app.destroy();
        this.#app = this.createApp(windowInfo);
        this.appendApp();
    }
}

class Dice27 {
    #window;
    #app;
    #diceApp;
    #rollValue;
    #gameState;
    #dice;
    #stats = [];
    #lines = [];
    #coins = [];
    #scoreboard = [0, 0];
    #numberRolls = 0;
    #numberPiles = 0;
    #numberClicked = 0;
    #currTotal = baseTotal;
    #turn;
    constructor() {
        this.#window = new WindowInfo();
        this.#app = new App(this.#window, "app");
        this.#diceApp = new App(this.#window, "diceApp");
        this.#turn = 0;

        this.#diceApp.getApp().loader.baseUrl = "../images/";
        this.#diceApp.getApp().loader
            .add("dice0", "dice0.png")
            .add("dice1", "dice1.png")
            .add("dice2", "dice2.png")
            .add("dice3", "dice3.png")
            .add("dice4", "dice4.png")
            .add("dice5", "dice5.png")
            .add("dice6", "dice6.png");
        this.#diceApp.getApp().loader.load();

        document.getElementById("overalScore").innerHTML = this.#currTotal;
        document.getElementById("player0").innerHTML = this.#scoreboard[0];
        document.getElementById("player1").innerHTML = this.#scoreboard[1];
        //set array to size
        for (let i = 0; i <= baseTotal; i++) {
            this.#stats[i] = 0;
        }
    }
    getApp() {
        return this.#app.getApp();
    }
    getGameState() {
        return this.#gameState;
    }
    setNumberClicked(num) {
        this.#numberClicked = this.#numberClicked + num;
    }
    createGame() {
        let dist = this.#window.getWindowWidth() * .025;
        let add = this.#window.getWindowWidth() * .036;
        let chipSize = this.#window.getWindowWidth() * .016;
        let yAxis = this.#window.getWindowHeight() * .07;

        //update the html elements of the the page
        document.getElementById("mainPrompt").textContent = "Player 1 Roll";
        document.getElementById("mainPrompt").style = "color:red;";
        this.#app.appendApp();
        this.#diceApp.appendApp();

        //create the coins and lines for the game
        for (let i = 0; i < this.#currTotal; i++) {
            this.#coins[i] = new Coin(dist, yAxis, chipSize);
            this.#lines[i] = new Line(dist, chipSize);
            this.#app.getApp().stage.addChild(this.#coins[i].getCoin());
            dist = dist + add;
        }

        //create and append the die
        this.#dice = new Sprite.from(this.#diceApp.getApp().loader.resources["dice0"].texture);
        this.#dice.x = (this.#window.getWindowWidth() / 2) - (this.#dice.width / 2);
        this.#diceApp.getApp().stage.addChild(this.#dice);

        //hide the create game button and show the 
        document.getElementById("createGame").hidden = true;
        document.getElementById("rollButton").hidden = false;
    }
    roll() {
        //hide roll button and play the audio
        document.getElementById("rollButton").hidden = true;
        this.#playAudio(AUDIO_ROLL);

        let ticks = 0;
        this.#diceApp.getApp().ticker.add(() => {
            //rolling swap images
            if (ticks % 5 == 0 && ticks < 50) {
                this.#rollValue = ((Math.floor(Math.random() * 600) + 1) % 6) + 1;
                this.#dice.texture = this.#diceApp.getApp().loader.resources[`dice${this.#rollValue}`].texture;
            }
            //done rolling
            else if (ticks == 50) {
                document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Answer";
                document.getElementById("questionCard").hidden = false;
                document.getElementById("rollNumber1").textContent = this.#rollValue;
                document.getElementById("rollNumber2").textContent = this.#rollValue;
                document.getElementById("pilesMake").hidden = false;

                //set the gamestate to pile creation state and make coins interactive
                this.#gameState = 0;
                for (let i = 0; i < this.#currTotal; i++) {
                    this.#coins[i].setInteractive(1);
                }
                ticks++;
            }
            ticks++;
        });
        this.#numberRolls++;
    }
    #playAudio(audioName) {
        /*
        audioName.pause();
        audioName.currentTime = 0;
        audioName.play();
        */
    }
    checkPile() {
        if (this.#currTotal < this.#rollValue) {
            document.getElementById("pilesMake").hidden = true;
            document.getElementById("pilesQuestion").hidden = false;
            document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Answer";
            document.getElementById("pilesInput").focus();
        }
        else if (this.#numberClicked == this.#rollValue) {
            playAudio(AUDIO_CORRECT);
            this.#createPile();
        }
        else {
            playAudio(AUDIO_WRONG);
            document.getElementById("mainPrompt").textContent = "Wrong try again";
        }
    }
    checkPileAnswer() {
        let userInput = document.getElementById("pilesInput").value;
        if (userInput == this.#numberPiles) {
            playAudio(AUDIO_CORRECT);
            document.getElementById("pilesQuestion").hidden = true;
            document.getElementById("remainderQuestion").hidden = false;
            document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Answer";
            document.getElementById("remainderInput").focus();
            document.getElementById("pilesInput").value = "";
        }
        else {
            playAudio(AUDIO_WRONG);
            document.getElementById("pilesInput").click();
            document.getElementById("mainPrompt").textContent = "Wrong try again";
        }
    }
    checkRemainderAnswer() {
        let userInput = document.getElementById("remainderInput").value;
        let remainder = this.#currTotal % this.#rollValue;
        if (userInput == remainder) {
            playAudio(AUDIO_CORRECT);
            if (remainder > 0) {
                this.#gameState = 1;
                for (let i = 0; i < remainder; i++) {
                    this.#coins[(this.#currTotal - i) - 1].setInteractive(1);
                    document.getElementById("remainderQuestion").hidden = true;
                    document.getElementById("remainderInput").value = "";
                    document.getElementById("questionCard").hidden = true;
                    document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Remove you Chips";
                }
            }
            else {
                this.#swapPlayer();

            }
        }
        else {
            playAudio(AUDIO_WRONG);
            document.getElementById("remainderInput").click();
            document.getElementById("mainPrompt").textContent = "Wrong try again";
        }
    }
    updateScore() {
        this.#currTotal--;
        this.#scoreboard[this.#turn]++;
        document.getElementById("overalScore").innerHTML = this.#currTotal;
        document.getElementById("player" + this.#turn).innerHTML = this.#scoreboard[this.#turn];
        if (this.#currTotal == 0) {
            document.getElementById("app").removeChild(this.#app.getApp().view);
            document.getElementById("diceApp").removeChild(this.#diceApp.getApp().view);
            document.getElementById("rollButton").hidden = true;
            document.getElementById("mainPrompt").hidden = true;
            if (this.#scoreboard[0] > this.#scoreboard[1]) {
                document.getElementById("overalScore").innerHTML = "Player 1 Wins!";
            }
            else {
                document.getElementById("overalScore").innerHTML = "Player 2 Wins!";
            }
            document.getElementById("resetButton").hidden = false;
            document.getElementById("results").hidden = false;
        }
        else if (this.#currTotal == (this.#numberPiles * this.#rollValue)) {
            this.#swapPlayer();
        }
    }
    #swapPlayer() {
        this.#turn == 0 ? this.#turn = 1 : this.#turn = 0;
        if (this.#turn == 0) {
            document.getElementById("mainPrompt").style = "color:red;";
        }
        else {
            document.getElementById("mainPrompt").style = "color:blue;";
        }
        this.#numberPiles = 0;
        this.#resetTint();
        this.#removeLines();
        document.getElementById("remainderQuestion").hidden = true;
        document.getElementById("remainderInput").value = "";
        document.getElementById("questionCard").hidden = true;
        document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Roll";
        document.getElementById("rollButton").hidden = false;

    }
    #createPile() {
        this.#resetTint();
        let temp = this.#numberPiles * this.#rollValue;
        for (let i = temp; i < temp + this.#rollValue; i++) {
            this.#coins[i].mark();
            this.#coins[i].setInteractive(0);
        }
        this.#app.getApp().stage.addChild(this.#lines[(temp + this.#rollValue) - 1].getLine())
        this.#numberPiles++;
        this.#numberClicked = 0;
        if (this.#numberPiles == Math.floor(this.#currTotal / this.#rollValue)) {
            for (let i = temp; i < this.#currTotal; i++) {
                this.#coins[i].setInteractive(0);
            }
            document.getElementById("pilesQuestion").hidden = false;
            document.getElementById("pilesMake").hidden = true;
            document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Answer";
            document.getElementById("pilesInput").focus();
        }
        document.getElementById("mainPrompt").textContent = "Good Job! Create Another Pile";
    }
    auto() {
        let totalPiles = Math.floor(this.#currTotal / this.#rollValue);
        while (this.#numberPiles != totalPiles) {
            this.#createPile();
        }

    }
    #resetTint() {
        for (let i = this.#numberPiles * this.#rollValue; i < this.#currTotal; i++) {
            this.#coins[i].unmark();
        }
    }
    #removeLines() {
        for (let i = 0; i < baseTotal; i++) {
            this.#app.getApp().stage.removeChild(this.#lines[i].getLine());
        }
    }
    resize() {
        window.resizeWindow();
        for (let i = 0; i < baseTotal; i++) {
            coins[i].resizeCoin(this.window);
        }
    }
}

var game = new Dice27();

var chipSize = windowWidth * .016;
var currTotal = 27;
var newTotal = 27;
var rolls = [];
var rollValue = 1;
var playerTurn = 0;
var scoreboard = [0, 0];
var coins = [];
var lines = [];
var dice;
var coinState = [];
var numberClicked = 0;
var currentPiles = 0;
var numberPiles;
/*
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
*/
function roll() {
    /*
    //roll audio
    document.getElementById("rollButton").hidden = true;
    playAudio(AUDIO_ROLL);

    let ticks = 0;
    diceApp.ticker.add(() => {
        //rolling swap images
        if (ticks % 5 == 0 && ticks < 50) {
            rollValue = Math.floor(Math.random() * 6) + 1;

            dice.texture = diceApp.loader.resources[`dice${rollValue}`].texture;
        }
        //done rolling
        else if (ticks == 50) {
            document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1) + " Answer";
            document.getElementById("questionCard").hidden = false;
            document.getElementById("rollNumber1").textContent = rollValue;
            document.getElementById("rollNumber2").textContent = rollValue;
            document.getElementById("pilesMake").hidden = false;
            numberPiles = Math.floor(currTotal / rollValue);
            coinState[27] = 0;
            for (let i = 0; i < currTotal; i++) {
                coins[i].interactive = true;
            }
            ticks++;
        }

        ticks++;
    });
    rolls[0]++;
    rolls[currTotal]++;
    */
    game.roll();
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

function createGame() {
    /*
    document.getElementById("mainPrompt").textContent = "Player 1 Roll";
    document.getElementById("mainPrompt").style = "color:red;";

    document.getElementById("app").appendChild(app.view);
    document.getElementById("diceApp").appendChild(diceApp.view);
    let dist = windowWidth * .025;
    let add = windowWidth * .036;
    //place the chips and lines on the board
    for (i = 0; i < baseTotal; i++) {
        let j = i;

        lines[i] = new Graphics;
        lines[i].beginFill("0x000000");
        lines[i].drawRect(dist + chipSize, 0, 5, 5000);
        lines[i].endFill();

        coins[i] = new Graphics();
        coins[i].beginFill("0xFFD700");              // ellipse color
        coins[i].lineStyle(1, "0x000000", 1);    // ellipse border
        coins[i].drawCircle(dist, windowHeight * .07, chipSize);    // position + size of the ellipse (topleft x, topleft y, height, width)
        coins[i].interactive = false;
        coins[i].buttonMode = true;
        coins[i].on("pointerdown", () => mark(j))
            .on("pointerdown", () => removeCoin(j))
            .on("pointerover", () => hover(coins[j]))
            .on("pointerout", () => hoverOut(coins[j]));
        coins[i].endFill();                 // draws the ellipse

        app.stage.addChild(coins[i]);               // stage the ellipse
        dist = dist + add;
        coinState[i] = 0;
    }


    //create dice
    dice = new Sprite.from(diceApp.loader.resources["dice0"].texture);
    dice.x = (windowWidth / 2) - (dice.width / 2);

    diceApp.stage.addChild(dice);

    document.getElementById("createGame").hidden = true;
    document.getElementById("rollButton").hidden = false;*/
    game.createGame();
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
function numberPilesCheck() {
    if (currTotal < rollValue) {

    }
    else if (numberClicked == rollValue) {
        playAudio(AUDIO_CORRECT);
        createPile();
    }
    else {
        playAudio(AUDIO_WRONG);
        document.getElementById("mainPrompt").textContent = "Wrong try again";
    }
}

function pileCountCheck() {/*
    let userInput = document.getElementById("pilesInput").value;
    if (userInput == currentPiles) {
        currentPiles = 0;
        playAudio(AUDIO_CORRECT);
        document.getElementById("pilesQuestion").hidden = true;
        document.getElementById("remainderQuestion").hidden = false;
        document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1) + " Answer";
        document.getElementById("remainderInput").focus();
        document.getElementById("pilesInput").value = "";


    }
    else {
        playAudio(AUDIO_WRONG);

    }*/
    game.checkPileAnswer();
}

function createPile() {/*
    let temp = currentPiles * rollValue;
    resetTint();
    let pileEnd = (temp) + rollValue;
    for (let i = temp; i < pileEnd; i++) {
        coins[i].tint = 0x788cf0;
        coinState[i] = 1;
    }
    disableChip();
    app.stage.addChild(lines[pileEnd - 1]);
    numberClicked = 0;
    currentPiles++;
    if (currentPiles == numberPiles) {
        for (let i = temp; i < currTotal; i++) {
            coins[i].interactive = false;
        }
        document.getElementById("pilesQuestion").hidden = false;
        document.getElementById("pilesMake").hidden = true;
        document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1) + " Answer";
        document.getElementById("pilesInput").focus();
    }*/
    game.checkPile();
}

function autoComplete() {/*
    if (rollValue > currTotal) {
        document.getElementById("pilesMake").hidden = true;
        document.getElementById("pilesQuestion").hidden = false;
        document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1) + " Answer";
        document.getElementById("pilesInput").focus();

    }
    while (currentPiles != numberPiles) {
        createPile();
    }*/
    game.auto();
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
function remainderCheck() {/*
    let userInput = document.getElementById("remainderInput").value;
    let remainder = currTotal % rollValue;
    if (userInput == remainder) {
        playAudio(AUDIO_CORRECT);
        coinState[27] = 1;
        //make coins clickable if remainder is there
        if (remainder > 0) {
            makeClickable(remainder);
        }
        //else just change players
        else {
            document.getElementById("remainderQuestion").hidden = true;
            document.getElementById("remainderInput").value = "";
            document.getElementById("questionCard").hidden = true;
            swapPlayer();
        }
    }
    else {
        playAudio(AUDIO_WRONG);
        document.getElementById("remainderInput").click();
        document.getElementById("mainPrompt").textContent = "Wrong try again";
    }*/
    game.checkRemainderAnswer();
}

function resetTint() {
    for (let i = currentPiles * rollValue; i < currTotal; i++) {
        coins[i].tint = 0xFFFFFF;
        coinState[i] = 0;
    }
}

function disableChip() {
    for (let i = currentPiles * rollValue; i < 27; i++) {
        if (coinState[i] == 1) {
            coins[i].interactive = false;
        }
    }
}

function removeLines() {
    for (let i = rollValue - 1; i < currTotal; i = i + rollValue) {
        app.stage.removeChild(lines[i]);
    }
}

function playAudio(audioName) {
    /*
    audioName.pause();
    audioName.currentTime = 0;
    audioName.play();
    */
}

function makeClickable(remainder) {
    newTotal = currTotal - remainder;
    for (let i = currTotal - 1; i >= newTotal; i--) {
        coins[i].interactive = true;
    }
    document.getElementById("remainderQuestion").hidden = true;
    document.getElementById("remainderInput").value = "";
    document.getElementById("questionCard").hidden = true;
    document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1) + " Remove you Chips";
}

function swapPlayer() {
    if (playerTurn == PLAYER_1) {
        playerTurn = PLAYER_2;
        document.getElementById("mainPrompt").style = "color:blue;";
    }
    else {
        playerTurn = PLAYER_1;
        document.getElementById("mainPrompt").style = "color:red;";
    }
    resetTint();
    dice.texture = diceApp.loader.resources[`dice0`].texture;
    document.getElementById("mainPrompt").textContent = "Player " + (playerTurn + 1) + " Roll";
    document.getElementById("rollButton").hidden = false;
    removeLines();
    checkScore();
}

function removeCoin(coinNumber) {
    if (coinState[27] == 1) {
        app.stage.removeChild(coins[coinNumber]);
        currTotal--;
        scoreboard[playerTurn]++;
        document.getElementById("overalScore").innerHTML = currTotal;
        document.getElementById("player" + playerTurn).innerHTML = scoreboard[playerTurn];
        if (currTotal == newTotal) {
            swapPlayer();
        }
    }
}

function mark(coinNumber) {
    if (coinState[27] == 0) {
        if (coinState[coinNumber] == 0) {
            coins[coinNumber].tint = 0x788cf0;
            coinState[coinNumber] = 1;
            numberClicked++;
        }
        else {
            coins[coinNumber].tint = 0xFFFFFF;
            coinState[coinNumber] = 0;
            numberClicked--;
        }
    }
}