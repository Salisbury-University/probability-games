const AUDIO_ROLL = new Audio("../sounds/dice_roll.mp3");
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");
const Graphics = PIXI.Graphics;
const Sprite = PIXI.Sprite;

class WindowInfo {
    #windowWidth;
    #windowHeight;
    constructor() {
        this.#windowWidth = document.querySelector('.container').getBoundingClientRect().width;
        this.#windowHeight = window.innerHeight;
    }
    getWindowWidth() {
        return this.#windowWidth;
    }
    getWindowHeight() {
        return this.#windowHeight;
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
            height: windowInfo.getWindowHeight() * .2
        });
    }
    appendApp() {
        document.getElementById(this.#appName).appendChild(this.#app.view);
    }
    getApp() {
        return this.#app;
    }
}

class DiceGame {
    #faceTotals;
    #app;
    #dice;
    #window;
    #probabilities;
    #weighted;
    #numberRolls = 0;

    constructor() {
        this.#window = new WindowInfo();
        this.#app = new App(this.#window, "app");
        this.#app.getApp().loader.baseUrl = "../images/";
        this.#app.getApp().loader
            .add("dice0", "dice0.png")
            .add("dice1", "dice1.png")
            .add("dice2", "dice2.png")
            .add("dice3", "dice3.png")
            .add("dice4", "dice4.png")
            .add("dice5", "dice5.png")
            .add("dice6", "dice6.png");
        this.#app.getApp().loader.load();


        this.#dice = new Sprite(this.#app.getApp().loader.resources["dice0"].texture);
        this.#dice.x = (this.#window.getWindowWidth() / 2) - 65;
        this.#app.getApp().stage.addChild(this.#dice);
        this.#app.appendApp();

        this.#faceTotals = new Array(6).fill(0);
        this.#isWeighted();
    }
    roll(check) {
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`card${i}`).classList.remove("bg-success");
        }
        document.getElementById("singleRoll").disabled = true;
        document.getElementById("multiRoll").disabled = true;
        this.#playAudio(AUDIO_ROLL);
        let ticks = 0;
        // Roll the dice using the probabilities
        let rollValue = 0;

        this.#app.getApp().ticker.add(() => {
            //rolling swap images
            if (ticks % 5 == 0 && ticks < 50) {
                rollValue = Math.floor(Math.random() * 6) + 1;
                this.#dice.texture = this.#app.getApp().loader.resources[`dice${rollValue}`].texture;
            }
            //done rolling
            else if (ticks == 50) {
                rollValue = this.#rollDice();
                this.#dice.texture = this.#app.getApp().loader.resources[`dice${rollValue}`].texture;
                this.#faceTotals[rollValue - 1]++
                    ;
                if (check == 1) {
                    this.#multi();
                }
                else {
                    document.getElementById(`card${rollValue}`).classList.add("bg-success");
                }
                this.#updateTable();
                document.getElementById("singleRoll").disabled = false;
                document.getElementById("multiRoll").disabled = false;
                ticks++;
                if (this.#numberRolls >= 10) {
                    document.getElementById("guessSection").hidden = false;
                }
            }
            ticks++;
        });

    }
    guess(check) {
        if (this.#weighted == check) {
            this.#playAudio(AUDIO_CORRECT);
            if (this.#weighted) {

            }
        }
        else {
            this.#playAudio(AUDIO_WRONG);

        }
    }
    #rollDice() {
        this.#numberRolls++;
        // Generate a random number between 0 and 1
        let randomNum = Math.random();

        // Initialize a cumulative probability variable
        let cumProb = 0;

        // Loop through the probabilities and determine which face of the dice was rolled
        for (let i = 0; i < this.#probabilities.length; i++) {
            cumProb += this.#probabilities[i];
            if (randomNum < cumProb) {
                return i + 1; // Return the face value (1 to 6)
            }
        }
    }
    #multi() {
        let numberRolls = document.getElementById("numberRolls").value - 1;
        let rollValue;
        for (let i = 0; i < numberRolls; i++) {
            rollValue = this.#rollDice();
            this.#faceTotals[rollValue - 1]++;
        }
    }
    #updateTable() {
        for (let i = 0; i < 6; i++) {
            document.getElementById(`face${i + 1}`).innerHTML = this.#faceTotals[i];
        }
    }
    #playAudio(audioName) {/*
        audioName.pause();
        audioName.currentTime = 0;
        audioName.play();*/
    }
    #isWeighted() {
        // Randomly choose whether the dice is weighted or not
        let isWeighted = Math.random() < 0.5;

        if (isWeighted) {
            // Randomly choose the index of the weighted face
            let weightedIndex = Math.floor(Math.random() * 6);

            // Set the probabilities to favor the weighted face
            this.#probabilities = new Array(6).fill(2 / 15);
            this.#probabilities[weightedIndex] = 1 / 3;
            this.#weighted = true;
        } else {
            this.#weighted = false;
            // If the dice is not weighted, return equal probabilities for all faces
            this.#probabilities = new Array(6).fill(1 / 6);
        }
    }
}

const game = new DiceGame();

function roll(check) {
    game.roll(check);
}
function guess(check) {
    game.guess(check);
}

// Get the welcome scene and the full page elements
const welcomeScene = document.querySelector('.welcome-scene');
const tutorial = document.querySelector('.tutorial');
//const fullPage = document.querySelector('.container text-center');

// Get the close button from the welcome scene
const closeButton = document.querySelector('#close-welcome');
const openTutorial = document.querySelector('#openTutorial');
const closeTutorial = document.querySelector('#closeTutorial');

// When the close button is clicked, hide the welcome scene and show the full page
closeButton.addEventListener('click', function () {
    welcomeScene.style.display = 'none';
    //fullPage.style.display = 'block';
});
openTutorial.addEventListener('click', function () {
    tutorial.style.display = 'flex';
    //fullPage.style.display = 'block';
});
closeTutorial.addEventListener('click', function () {
    welcomeScene.style.display = 'none';
    //fullPage.style.display = 'block';
});