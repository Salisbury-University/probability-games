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
	#weightedSide = 0;
	#clickable = false;

	constructor() {
		this.#window = new WindowInfo();
		this.#app = new App(this.#window, "app");
		this.#app.getApp().loader.baseUrl = "../images/";
		this.#app.getApp().loader
			.add("dice1", "dice1.png")
			.add("dice2", "dice2.png")
			.add("dice3", "dice3.png")
			.add("dice4", "dice4.png")
			.add("dice5", "dice5.png")
			.add("dice6", "dice6.png");
		this.#app.getApp().loader.load();


		this.#dice = new Sprite(this.#app.getApp().loader.resources["dice1"].texture);
		this.#dice.x = (this.#window.getWindowWidth() / 2) - 65;
		this.#app.getApp().stage.addChild(this.#dice);
		this.#app.appendApp();
		this.#reset();
		this.#setupButtons();
	}
	#setupButtons() {
		let singleRoll = document.getElementById("singleRoll");
		let multiRoll = document.getElementById("multiRoll");
		let cards = document.querySelectorAll(".diceCard");
		let weightedButton = document.getElementById("weightedButton");
		let notWeightedButton = document.getElementById("notWeightedButton");

		singleRoll.addEventListener('click', () => {
			this.#roll(0);
		});
		multiRoll.addEventListener('click', () => {
			this.#roll(1);
		});
		cards.forEach((card) => {
			card.addEventListener('click', () => {
				this.#cardSelect(card.getAttribute("data-value"));
			})
		});
		weightedButton.addEventListener('click', () => {
			this.#guess(true);
		});
		notWeightedButton.addEventListener('click', () => {
			this.#guess(false);
		});
	}

	#roll(check) {
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
				if (this.#numberRolls >= 10) {
					document.getElementById("prompt").innerHTML = "Is the Dice Weighted?";
					document.getElementById("guessButtons").hidden = false;
				}
			}
			ticks++;
		});

	}
	#guess(check) {
		if (this.#weighted == check) {
			this.#playAudio(AUDIO_CORRECT);
			document.getElementById("guessButtons").hidden = true;
			if (this.#weighted) {
				document.getElementById("prompt").innerHTML = "Which side is weighted? Click the side you think it is.";
				this.#clickable = true
				this.#changeCursor();
			} else {
				document.getElementById("prompt").innerHTML = "Correct, the Dice isn't Weighted! Lets play again";
				this.#reset();
			}
		}
		else {
			this.#playAudio(AUDIO_WRONG);
			document.getElementById("prompt").innerHTML = "Try Again";
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
	#changeCursor() {
		if (this.#clickable) {
			for (let i = 1; i <= 6; i++) {
				document.getElementById(`card${i}`).style.cursor = "pointer";
			}
		}
		else {
			for (let i = 1; i <= 6; i++) {
				document.getElementById(`card${i}`).style.cursor = "default";
			}
		}
	}
	#cardSelect(side) {
		console.log(side);
		if (this.#clickable) {
			if (side == this.#weightedSide) {
				this.#playAudio(AUDIO_CORRECT);
				document.getElementById("prompt").innerHTML = "Correct the " + side + " side is the weighted.";
				this.#reset();
			}
			else {
				this.#playAudio(AUDIO_WRONG);
				document.getElementById("prompt").innerHTML = "Try Again";
			}
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
			this.#weightedSide = weightedIndex + 1;
			this.#weighted = true;
		} else {
			this.#weighted = false;
			// If the dice is not weighted, return equal probabilities for all faces
			this.#probabilities = new Array(6).fill(1 / 6);
		}
	}
	#reset() {
		this.#faceTotals = new Array(6).fill(0);
		this.#clickable = false;
		this.#changeCursor();
		this.#isWeighted();
	}
}

const game = new DiceGame();