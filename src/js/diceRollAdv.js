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
    }
    roll(check) {
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`card${i}`).classList.remove("bg-success");
        }

        document.getElementById("singleRoll").disabled = true;
        document.getElementById("multiRoll").disabled = true;
        this.#playAudio(AUDIO_ROLL);
        let ticks = 0;
        let rollValue = 0;
        this.#app.getApp().ticker.add(() => {
            //rolling swap images
            if (ticks % 5 == 0 && ticks < 50) {
                rollValue = ((Math.floor(Math.random() * 600) + 1) % 6) + 1;
                this.#dice.texture = this.#app.getApp().loader.resources[`dice${rollValue}`].texture;
            }
            //done rolling
            else if (ticks == 50) {
                this.#faceTotals[rollValue - 1]++;
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
            }
            ticks++;
        });

    }
    #multi() {
        let numberRolls = document.getElementById("numberRolls").value - 1;
        let rollValue;
        for (let i = 0; i < numberRolls; i++) {
            rollValue = ((Math.floor(Math.random() * 600) + 1) % 6) + 1;
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
}

const game = new DiceGame();

function roll(check) {
    game.roll(check);
}

// Get the welcome scene and the full page elements
const welcomeScene = document.querySelector('.welcome-scene');
const fullPage = document.querySelector('.container text-center');

// Get the close button from the welcome scene
const closeButton = document.querySelector('#close-welcome');

// When the close button is clicked, hide the welcome scene and show the full page
closeButton.addEventListener('click', function () {
    welcomeScene.style.display = 'none';
    fullPage.style.display = 'block';
});