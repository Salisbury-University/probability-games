const baseTotal = 27;
const AUDIO_ROLL = new Audio("../sounds/dice_roll.mp3");
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");
const Graphics = PIXI.Graphics;
const Sprite = PIXI.Sprite;
const delay = 10000;

var check = 0;

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
    /*resize(dist, chipSize) {
        this.#line.destroy();
        this.#line = new Graphics;
        this.#line.beginFill("0x000000");
        this.#line.drawRect(dist + chipSize, 0, 5, 5000);
        this.#line.endFill();
    }*/
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
    /*resize(dist, yAxis, chipSize, app) {
        this.#coin.destroy();
        this.#coin = new Graphics;
        this.#createCoin(dist, yAxis, chipSize);
        console.log("new coin");
    }*/
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
    /*resizeWindow() {
        this.#windowWidth = window.innerHeight * .98;
        this.#windowHeight = window.innerHeight;
    }*/
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
    /*resize(windowInfo) {
        document.getElementById(this.#appName).removeChild(this.#app.view);
        this.#app.destroy();
        this.#app = this.#createApp(windowInfo);
        this.appendApp();
    }*/
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
        this.#stats = new Array(baseTotal).fill(0);
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
    checkPile() {
        if (this.#currTotal < this.#rollValue) {
            document.getElementById("pilesMake").hidden = true;
            document.getElementById("pilesQuestion").hidden = false;
            document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Answer";
            document.getElementById("pilesInput").focus();
        }
        else if (this.#numberClicked == this.#rollValue) {
            this.#playAudio(AUDIO_CORRECT);
            this.#createPile();
        }
        else {
            this.#playAudio(AUDIO_WRONG);
            document.getElementById("mainPrompt").textContent = "Wrong try again";
        }
    }
    checkPileAnswer() {
        let userInput = document.getElementById("pilesInput").value;
        if (userInput == this.#numberPiles) {
            this.#playAudio(AUDIO_CORRECT);
            document.getElementById("pilesQuestion").hidden = true;
            document.getElementById("remainderQuestion").hidden = false;
            document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Answer";
            document.getElementById("remainderInput").focus();
            document.getElementById("pilesInput").value = "";
        }
        else {
            this.#playAudio(AUDIO_WRONG);
            document.getElementById("pilesInput").click();
            document.getElementById("mainPrompt").textContent = "Wrong try again";
        }
    }
    checkRemainderAnswer() {
        let userInput = document.getElementById("remainderInput").value;
        let remainder = this.#currTotal % this.#rollValue;
        if (userInput == remainder) {
            this.#playAudio(AUDIO_CORRECT);
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
            this.#stats[this.#currTotal]++;
        }
        else {
            this.#playAudio(AUDIO_WRONG);
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
            document.getElementById("graph").hidden = false;
            this.#createGraph();
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
        this.#dice.texture = this.#diceApp.getApp().loader.resources['dice0'].texture;
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
        else {
            document.getElementById("mainPrompt").textContent = "Good Job! Create Another Pile";
        }
    }
    auto() {
        if (this.#currTotal < this.#rollValue) {
            document.getElementById("pilesMake").hidden = true;
            document.getElementById("pilesQuestion").hidden = false;
            document.getElementById("mainPrompt").textContent = "Player " + (this.#turn + 1) + " Answer";
            document.getElementById("pilesInput").focus();
        }
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
    resetGame() {
        this.#currTotal = baseTotal;
        this.#scoreboard[0] = 0;
        this.#scoreboard[1] = 0;
        this.#turn = 0;
        document.getElementById("resetButton").hidden = true;
        document.getElementById("rollButton").hidden = false;
        document.getElementById("overalScore").innerHTML = this.#currTotal;
        document.getElementById("player0").innerHTML = this.#scoreboard[0];
        document.getElementById("player1").innerHTML = this.#scoreboard[1];
        document.getElementById("graph").hidden = true;
        document.getElementById("mainPrompt").textContent = "Player 1 Roll";
        document.getElementById("mainPrompt").hidden = false;
        this.#app.appendApp();
        this.#diceApp.appendApp();
        for (let i = 0; i < this.#currTotal; i++) {
            this.#app.getApp().stage.addChild(this.#coins[i].getCoin());
            this.#stats[i] = 0;
        }
        this.#dice.texture = this.#diceApp.getApp().loader.resources['dice0'].texture;
    }
    #createGraph() {
        document.getElementById("graph").hidden = false;
        document.getElementById("numberRolls").innerHTML = this.#numberRolls;
        // set the dimensions of the chart
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // select the SVG element
        const svg = d3.select("svg");

        // remove any existing chart elements
        svg.selectAll("*").remove();

        // create the chart container
        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // create the X and Y scales
        const x = d3.scaleBand()
            .domain(this.#stats.map((d, i) => i))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(this.#stats)])
            .range([height, 0]);

        // create the X and Y axes
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        // add the X and Y axes to the chart
        chart.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        chart.append("g")
            .call(yAxis);

        // create the bars
        chart.selectAll(".bar")
            .data(this.#stats)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d));
    }
    #playAudio(audioName) {/*
        audioName.pause();
        audioName.currentTime = 0;
        audioName.play();*/
    }
    /*resize() {
        this.#window.resizeWindow();
        let dist = this.#window.getWindowWidth() * .025;
        let add = this.#window.getWindowWidth() * .036;
        let chipSize = this.#window.getWindowWidth() * .016;
        let yAxis = this.#window.getWindowHeight() * .07;

        
        this.#app.resize(this.#window);
        this.#diceApp.resize(this.#window);

        for (let i = 0; i < baseTotal; i++) {
            this.#coins[i].resize(dist, yAxis, chipSize, this.#app);
            this.#lines[i].resize(dist, chipSize);
            dist = dist + add;
            this.#app.getApp().stage.addChild(this.#coins[i].getCoin());

        }

        this.#dice.destroy();
        this.#dice = new Sprite.from(this.#diceApp.getApp().loader.resources["dice0"].texture);
        this.#dice.x = (this.#window.getWindowWidth() / 2) - (this.#dice.width / 2);
        this.#diceApp.getApp().stage.addChild(this.#dice);
    }*/
}
var game = new Dice27();

function roll() {
    game.roll();
}

function reset() {
    game.resetGame();
}

function createGame() {
    game.createGame();
}

function pileCountCheck() {
    game.checkPileAnswer();
}

function createPile() {
    game.checkPile();
}

function autoComplete() {
    game.auto();
}

function remainderCheck() {
    game.checkRemainderAnswer();
}
/*
function resize() {
    if (check >= (Date.now() - delay))
        return;
    check = Date.now();
    console.log("resize");
    game.resize();
}*/