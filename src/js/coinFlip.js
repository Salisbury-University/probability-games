const AUDIO_ROLL = new Audio("../sounds/dice_roll.mp3");
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");
const Graphics = PIXI.Graphics;
const Sprite = PIXI.Sprite;
const possibleWeights = [9 / 10, 3 / 4, 3 / 5];

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

class CoinGame {
	#numberFlips = 0;
	#totals;
	#window;
	#app;
	#coin;
	#probabliity;

	constructor() {
		this.#window = new WindowInfo();
		this.#app = new App(this.#window, "app");
		this.#app.getApp().loader.baseUrl = "../images/";
		this.#app.getApp().loader
			.add("side0", "coinHead.png")
			.add("side1", "coinTail.png");
		this.#app.getApp().loader.load();

		this.#coin = new Sprite(this.#app.getApp().loader.resources["side1"].texture);
		this.#coin.x = (this.#window.getWindowWidth() / 2) - 65;
		this.#app.getApp().stage.addChild(this.#coin);
		this.#app.appendApp();
		this.#reset();
	}
	#reset() {
		this.#totals = new Array(2).fill(0);
		this.#numberFlips = 0;
		this.#isWeighted();
	}
	#isWeighted() {
		let isWeighted = Math.random() < 0.5;
		if (isWeighted) {
			let weight = possibleWeights[Math.floor(Math.random() * 3)];
			this.#probabliity = new Array(2).fill(1 - weight);
			this.#probabliity[Math.floor(Math.random() * 2)] = weight;
		}
		else {
			this.#probabliity = new Array(2).fill(1 / 2);
		}
	}
	#playAudio(audioName) {/*
        audioName.pause();
        audioName.currentTime = 0;
        audioName.play();*/
	}
	#updateTable() {
		document.getElementById("head").innerHTML = this.#totals[0];
		document.getElementById("tail").innerHTML = this.#totals[1];
	}
	#flipCoin() {
		this.#numberFlips++;
		let randomNum = Math.random();
		if (randomNum <= this.#probabliity[0]) {//heads
			return 0;
		}
		else {//tails
			return 1;
		}
	}
	#multi() {
		let numberFlips = document.getElementById("numberFlips").value - 1;
		for (let i = 0; i < numberFlips; i++) {
			this.#totals[this.#flipCoin()]++;
		}
	}
	flip(check) {
		document.getElementById("card0").classList.remove("bg-success");
		document.getElementById("card1").classList.remove("bg-success");

		document.getElementById("singleFlip").disabled = true;
		document.getElementById("multiFlip").disabled = true;
		this.#playAudio(AUDIO_ROLL);
		let ticks = 0;

		let flipValue = 0;
		this.#app.getApp().ticker.add(() => {
			if (ticks % 5 == 0 && ticks < 50) {
				flipValue = flipValue === 0 ? 1 : 0;
				this.#coin.texture = this.#app.getApp().loader.resources[`side${flipValue}`].texture;
			}
			else if (ticks == 50) {
				flipValue = this.#flipCoin();
				this.#coin.texture = this.#app.getApp().loader.resources[`side${flipValue}`].texture;
				this.#totals[flipValue]++;
				if (check == 1) {
					this.#multi();
				}
				else {
					document.getElementById(`card${flipValue}`).classList.add("bg-success");
				}
				this.#updateTable();
				document.getElementById("singleFlip").disabled = false;
				document.getElementById("multiFlip").disabled = false;
				ticks++;
			}
			ticks++;
		});
	}
}

const game = new CoinGame();

function flip(check) {
	game.flip(check);
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