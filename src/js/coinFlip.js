const AUDIO_FLIP = new Audio("../sounds/coin_flip.mp3");
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
		this.#buttons();
	}
	#reset() {
		this.#totals = new Array(2).fill(0);
		this.#numberFlips = 0;
		this.#isWeighted();
	}
	#buttons() {
		let singleFlipButton = document.getElementById('singleFlip');
		let multiFlipButton = document.getElementById('multiFlip');
		let weightedButton = document.getElementById('weighted');
		let notWeightedButton = document.getElementById('notWeighted');
		let weightSelectButton = document.getElementById('weightSelectButton');
		let numberFlipsInput = document.getElementById("numberFlips");

		singleFlipButton.addEventListener('click', () => {
			this.#flip(0);
		});
		multiFlipButton.addEventListener('click', () => {
			this.#flip(1);
		});
		weightedButton.addEventListener('click', () => {
			this.#guess(0);
		});
		notWeightedButton.addEventListener('click', () => {
			this.#guess(1);
		});
		weightSelectButton.addEventListener('click', () => {
			this.#guessWeight();
		});
		numberFlipsInput.addEventListener('keypress', function (event) {
			let charCode = event.which ? event.which : event.keyCode;
			if (charCode < 48 || charCode > 57) {
				event.preventDefault();
			}
		});
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
	#flip(check) {
		document.getElementById("card0").classList.remove("bg-success");
		document.getElementById("card1").classList.remove("bg-success");

		document.getElementById("singleFlip").disabled = true;
		document.getElementById("multiFlip").disabled = true;
		this.#playAudio(AUDIO_FLIP);
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
				if (this.#numberFlips >= 10) {
					document.getElementById("prompt").innerHTML = "Is the Coin Weighted?";
					document.getElementById("guessButtons").hidden = false;
				}
			}
			ticks++;
		});
	}
	#guess(check) {
		if (check == 0 && this.#probabliity[0] != .5) {//weighted
			this.#playAudio(AUDIO_CORRECT);
			document.getElementById("prompt").innerHTML = "Correct the coin is weighted.";
			document.getElementById("guessButtons").hidden = true;
			document.getElementById("guessWeight").hidden = false;
		}
		else if (check == 1 && this.#probabliity[0] == .5) {
			this.#playAudio(AUDIO_CORRECT);
			document.getElementById("prompt").innerHTML = "Correct the coin is not weighted.";
			document.getElementById("guessButtons").hidden = true;
			this.#reset();
		}
		else {
			this.#playAudio(AUDIO_WRONG);
			document.getElementById("prompt").innerHTML = "Try Again";
		}
	}
	#guessWeight() {
		let guess = document.getElementById("weightSelect").value;
		if (isNaN(guess)) {
			this.#playAudio(AUDIO_WRONG);
			document.getElementById("prompt").innerHTML = "Please select an option from the dropdown.";
		}
		else if (guess == this.#probabliity[0]) {
			this.#playAudio(AUDIO_CORRECT);
			document.getElementById("prompt").innerHTML = "Correct the weight is " + (this.#probabliity[0] * 100) + "% Heads and " + (this.#probabliity[1] * 100) + "% Tails";
			document.getElementById("guessWeight").hidden = true;
			this.#reset();
		}
		else {
			this.#playAudio(AUDIO_WRONG);
			document.getElementById("prompt").innerHTML = "Please select an option from the dropdown.";
		}

	}
}

const game = new CoinGame();/*
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
});*/