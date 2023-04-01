const AUDIO_ROLL = new Audio("../sounds/dice_roll.mp3");
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");

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
    getApp() {
        return this.#app;
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
    /*resizeWindow() {
        this.#windowWidth = window.innerWidth * .98;
        this.#windowHeight = window.innerHeight;
    }*/
}

class DiceGame {
    #totalRolls = 0;
    #faceTotals;
    #app;

    constructor() {
        this.#faceTotals = new Array(6).fill(0);
        this.#app = new App();
    }

    #updateTable() {

    }
    roll() {
        //hide roll button and play the audio
        this.#playAudio(AUDIO_ROLL);
        let ticks = 0;
        this.#app.getApp().ticker.add(() => {
            //rolling swap images
            if (ticks % 5 == 0 && ticks < 50) {
                this.#rollValue = ((Math.floor(Math.random() * 600) + 1) % 6) + 1;
                this.#dice.texture = this.#app.getApp().loader.resources[`dice${this.#rollValue}`].texture;
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
    guess() {
        if (this.#total)
    }
    #setWeight() {

    }
    #playAudio(audioName) {
        audioName.pause();
        audioName.currentTime = 0;
        audioName.play();
    }
}