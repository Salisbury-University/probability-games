// variables for sound effect audio
const AUDIO_FLIP = new Audio("../sounds/coin_flip.mp3");
AUDIO_FLIP.playbackRate=2.5;
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");

// hide weight guessing buttons
document.getElementById("guess1").hidden = true;
document.getElementById("guess2").hidden = true;
document.getElementById("guess3").hidden = true;

// determines if coin will be weighted or not
var isWeighted = Math.floor(Math.random() * 2) + 1;

// counters for both sides
var headCount = 0;
var tailCount = 0;

// determines amount of weight for the heavier side 
// (anywhere from 70-30 to 57-43, with the higher number being the heavier side)
var min = 57;
var max = 71;
var difference = max - min;
var weightHeavierSide = Math.floor(Math.random() * difference) + min;

// determines if tails or heads is the heavier side (1 for heads and 2 for tails)
var heavierSide = Math.floor(Math.random() * 2) + 1;

// determine which button contains the correct weight when guessing it
var correctWeightButn = Math.floor(Math.random() * 3) + 1;

// Function to flip coin
function flipCoin() {
	// plays rolling dice audio
	AUDIO_FLIP.play();

	// makes weighted and not weighted buttons reappear
	document.getElementById("weighted").hidden = false;
	document.getElementById("notWeighted").hidden = false;

	// hide weight guessing buttons
	document.getElementById("guess1").hidden = true;
	document.getElementById("guess2").hidden = true;
	document.getElementById("guess3").hidden = true;	

	// reset weight display
	document.getElementById("weightAmount").innerHTML = "";

	// reset guessing weight message 
	document.getElementById("guessWeight").innerHTML = "";

	// reset counts display
	document.getElementById("headTotal").innerHTML = 0;
	document.getElementById("tailTotal").innerHTML = 0;

	// coin is weighted
	if(isWeighted == 1) {
		// heavier side is heads
		if(heavierSide == 1) {
			let num = Math.floor(Math.random() * 100) + 1;
			
			// if weighted coin is heads
			if (num <= weightHeavierSide) {
				document.querySelector("h1").innerHTML = "You got Heads!";
				document.getElementById("coin").setAttribute("src", "../images/coinHead.png");
				headCount += 1;
			} 
			// if weighted coin is tails
			else {
				document.querySelector("h1").innerHTML = "You got Tails!";
				document.getElementById("coin").setAttribute("src", "../images/coinTail.png");
				tailCount += 1;
			}
			
			document.getElementById("headTotal").innerHTML = headCount;
			document.getElementById("tailTotal").innerHTML = tailCount;
		}

		// heavier side is tails
		else {
			let num = Math.floor(Math.random() * 100) + 1;
			// weighted coin is tails
			if (num <= weightHeavierSide) {
				document.querySelector("h1").innerHTML = "You got Tails!";
				document.getElementById("coin").setAttribute("src", "../images/coinTail.png");
				tailCount += 1;
			} 
			// weighted coin is heads
			else {
				document.querySelector("h1").innerHTML = "You got Heads!";
				document.getElementById("coin").setAttribute("src", "../images/coinHead.png");
				headCount += 1;
			}
			document.getElementById("headTotal").innerHTML = headCount;
			document.getElementById("tailTotal").innerHTML = tailCount;
		}
	}

	// coin is not weighted
	else {
		let num = Math.floor(Math.random() * 100) + 1;
			
		// if regular coin is heads
		if (num <= 50) {
			document.querySelector("h1").innerHTML = "You got Heads!";
			document.getElementById("coin").setAttribute("src", "../images/coinHead.png");
			headCount += 1;
		} 
		// if regular coin is tails
		else {
			document.querySelector("h1").innerHTML = "You got Tails!";
			document.getElementById("coin").setAttribute("src", "../images/coinTail.png");
			tailCount += 1;
		}
		document.getElementById("headTotal").innerHTML = headCount;
		document.getElementById("tailTotal").innerHTML = tailCount;
	}
}

// Function to flip coin multiple times
function flipCoinMultiple() {
	// plays rolling dice audio
	AUDIO_FLIP.play();

	// makes weighted and not weighted buttons reappear
	document.getElementById("weighted").hidden = false;
	document.getElementById("notWeighted").hidden = false;

	// hide weight guessing buttons
	document.getElementById("guess1").hidden = true;
	document.getElementById("guess2").hidden = true;
	document.getElementById("guess3").hidden = true;

	// reset weight display
	document.getElementById("weightAmount").innerHTML = "";

	// reset guessing weight message 
	document.getElementById("guessWeight").innerHTML = "";

	// reset counts display
	document.getElementById("headTotal").innerHTML = 0;
	document.getElementById("tailTotal").innerHTML = 0;

	// gets amount of flips from user
	let qty = document.getElementById("quantity").value;

	// for displaying amount of times each side was landed on for each individual set of flips
	let headAmount = 0;
	let tailAmount = 0;

	// if coin is weighted
	if (isWeighted == 1) {								
		if(heavierSide == 1) {
			for (let i = 0; i < qty; i++) {
				let num = Math.floor(Math.random() * 100) + 1;
			
				// if weighted coin is heads
				if (num <= weightHeavierSide) {
					headCount += 1;
					headAmount += 1;
				}
				// if weighted coin is tails
				else {
					tailCount += 1;
					tailAmount += 1;
				}
			}
			document.getElementById("headTotal").innerHTML = headCount;
			document.getElementById("tailTotal").innerHTML = tailCount;
			document.querySelector("h1").innerHTML = "You got Heads " + headAmount + " times, and got Tails " + tailAmount + " times";
		}

		else {
			for (let i = 0; i < qty; i++) {
				let num = Math.floor(Math.random() * 100) + 1;
			
				// if weighted coin is tails
				if (num <= weightHeavierSide) {
					tailCount += 1;
					tailAmount += 1;
				} 
				// if weighted coin is heads
				else {
					headCount += 1;
					headAmount += 1;
				}
			}
			document.getElementById("headTotal").innerHTML = headCount;
			document.getElementById("tailTotal").innerHTML = tailCount;
			document.querySelector("h1").innerHTML = "You got Heads " + headAmount + " times, and got Tails " + tailAmount + " times";
		}
	} 

	// if coin is not weighted
	else {
		for (let i = 0; i < qty; i++) {
			let num = Math.floor(Math.random() * 100) + 1;
			
			// if regular coin is heads
			if (num <= 50) {
				headCount += 1;
				headAmount += 1;
			} 
			// if regular coin is tails
			else {
				tailCount += 1;
				tailAmount += 1;
			}
		}
		document.getElementById("headTotal").innerHTML = headCount;
		document.getElementById("tailTotal").innerHTML = tailCount;
		document.querySelector("h1").innerHTML = "You got Heads " + headAmount + " times, and got Tails " + tailAmount + " times";
	}
}

function weightedGuess() {
	// hides weighted and not weighted button when user makes guess
	document.getElementById("weighted").hidden = true;
	document.getElementById("notWeighted").hidden = true;

	if(isWeighted == 1) {
		// plays correct guess audio
		AUDIO_CORRECT.play();

		// make flipping coins unclickable until user gueses weight
		document.getElementById("flipCoin").disabled = true; 
		document.getElementById("flipCoinMultiple").disabled = true; 

		// message displays at top of screen
		document.querySelector("h1").innerHTML = "Your guess was correct, the coin was weighted";

		// guess weight message displays
		document.getElementById("guessWeight").innerHTML = "Guess the weight of the coin";

		// add weights to guessing weight buttons (correct button is button one)
		if(correctWeightButn == 1)
		{
			if(heavierSide == 1)
				document.getElementById("guess1").innerHTML = weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
			else
				document.getElementById("guess1").innerHTML = (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%"; 

			document.getElementById("guess2").innerHTML = "30%/70%";
			document.getElementById("guess3").innerHTML = "65%/35%";
		}

		// add weights to guessing weight buttons (correct button is button two)
		else if(correctWeightButn == 2)
		{
			if(heavierSide == 1)
				document.getElementById("guess2").innerHTML = weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
			else
				document.getElementById("guess2").innerHTML = (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%"; 

			document.getElementById("guess1").innerHTML = "30%/70%";
			document.getElementById("guess3").innerHTML = "65%/35%";
		}

		// add weights to guessing weight buttons (correct button is button three)
		else
		{
			if(heavierSide == 1)
				document.getElementById("guess3").innerHTML = weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
			else
				document.getElementById("guess3").innerHTML = (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%"; 

			document.getElementById("guess1").innerHTML = "30%/70%";
			document.getElementById("guess2").innerHTML = "65%/35%";
		}

		// reveal guessing weight buttons
		document.getElementById("guess1").hidden = false;
		document.getElementById("guess2").hidden = false;
		document.getElementById("guess3").hidden = false;	
	}
	else {
		// plays wrong guess audio
		AUDIO_WRONG.play();

		document.querySelector("h1").innerHTML = "Your guess was incorrect, the coin was not weighted";
		document.getElementById("weightAmount").innerHTML = "Weight: 50%/50%";

		// reset weight
		isWeighted = Math.floor(Math.random() * 2) + 1;
		weightHeavierSide = Math.floor(Math.random() * difference) + min;
		heavierSide = Math.floor(Math.random() * 2) + 1;
	}
	
	// reset counts
	headCount = 0;
	tailCount = 0;
}

function notWeightedGuess() {
	// hides weighted and not weighted button when user makes guess
	document.getElementById("weighted").hidden = true;
	document.getElementById("notWeighted").hidden = true;

	if(isWeighted == 1) {
		// plays wrong guess audio
		AUDIO_WRONG.play();

		// make flipping coins unclickable until user gueses weight
		document.getElementById("flipCoin").disabled = true; 
		document.getElementById("flipCoinMultiple").disabled = true; 

		// message displays at top of screen
		document.querySelector("h1").innerHTML = "Your guess was incorrect, the coin was weighted";

		// guess weight message displays
		document.getElementById("guessWeight").innerHTML = "Guess the weight of the coin";

		// add weights to guessing weight buttons (correct button is button one)
		if(correctWeightButn == 1)
		{
			if(heavierSide == 1)
				document.getElementById("guess1").innerHTML = weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
			else
				document.getElementById("guess1").innerHTML = (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%"; 

			document.getElementById("guess2").innerHTML = "30%/70%";
			document.getElementById("guess3").innerHTML = "65%/35%";
		}

		// add weights to guessing weight buttons (correct button is button two)
		else if(correctWeightButn == 2)
		{
			if(heavierSide == 1)
				document.getElementById("guess2").innerHTML = weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
			else
				document.getElementById("guess2").innerHTML = (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%"; 

			document.getElementById("guess1").innerHTML = "30%/70%";
			document.getElementById("guess3").innerHTML = "65%/35%";
		}

		// add weights to guessing weight buttons (correct button is button three)
		else
		{
			if(heavierSide == 1)
				document.getElementById("guess3").innerHTML = weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
			else
				document.getElementById("guess3").innerHTML = (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%"; 

			document.getElementById("guess1").innerHTML = "30%/70%";
			document.getElementById("guess2").innerHTML = "65%/35%";
		}

		// reveal guessing weight buttons
		document.getElementById("guess1").hidden = false;
		document.getElementById("guess2").hidden = false;
		document.getElementById("guess3").hidden = false;	
	}
	else {
		// plays correct guess audio
		AUDIO_CORRECT.play();

		document.querySelector("h1").innerHTML = "Your guess was correct, the coin was not weighted";
		document.getElementById("weightAmount").innerHTML = "Weight: 50%/50%";

		// reset weight
		isWeighted = Math.floor(Math.random() * 2) + 1;
		weightHeavierSide = Math.floor(Math.random() * difference) + min;
		heavierSide = Math.floor(Math.random() * 2) + 1;
	}
	
	// resetting counts
	headCount = 0;
	tailCount = 0;
}

function weightGuessOne() {
	if(correctWeightButn == 1)
	{
		if(heavierSide == 1)
			document.querySelector("h1").innerHTML = "You guessed the weight correctly, it was " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
		else
			document.querySelector("h1").innerHTML = "You guessed the weight correctly, it was "  + (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%";
	}
	else
	{
		if(heavierSide == 1)
			document.querySelector("h1").innerHTML = "You guessed the weight incorrectly, it was " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
		else
			document.querySelector("h1").innerHTML = "You guessed the weight incorrectly, it was "  + (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%";
	}

	// reset which button will contain correct weight
	correctWeightButn = Math.floor(Math.random() * 3) + 1;

	// reset weight
	isWeighted = Math.floor(Math.random() * 2) + 1;
	weightHeavierSide = Math.floor(Math.random() * difference) + min;
	heavierSide = Math.floor(Math.random() * 2) + 1;

	// hide weight guessing buttons
	document.getElementById("guess1").hidden = true;
	document.getElementById("guess2").hidden = true;
	document.getElementById("guess3").hidden = true;

	// make flipping buttons clickable again
	document.getElementById("flipCoin").disabled = false; 
	document.getElementById("flipCoinMultiple").disabled = false;

	// reset guessing weight message
	document.getElementById("guessWeight").innerHTML = "";
}

function weightGuessTwo() {
	if(correctWeightButn == 2)
	{
		if(heavierSide == 1)
			document.querySelector("h1").innerHTML = "You guessed the weight correctly, it was " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
		else
			document.querySelector("h1").innerHTML = "You guessed the weight correctly, it was "  + (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%";
	}
	else
	{
		if(heavierSide == 1)
			document.querySelector("h1").innerHTML = "You guessed the weight incorrectly, it was " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
		else
			document.querySelector("h1").innerHTML = "You guessed the weight incorrectly, it was "  + (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%";
	}

	// reset which button will contain correct weight
	correctWeightButn = Math.floor(Math.random() * 3) + 1;

	// reset weight
	isWeighted = Math.floor(Math.random() * 2) + 1;
	weightHeavierSide = Math.floor(Math.random() * difference) + min;
	heavierSide = Math.floor(Math.random() * 2) + 1;

	// hide weight guessing buttons
	document.getElementById("guess1").hidden = true;
	document.getElementById("guess2").hidden = true;
	document.getElementById("guess3").hidden = true;

	// make flipping buttons clickable again
	document.getElementById("flipCoin").disabled = false; 
	document.getElementById("flipCoinMultiple").disabled = false;

	// reset guessing weight message
	document.getElementById("guessWeight").innerHTML = "";
}

function weightGuessThree() {
	if(correctWeightButn == 3)
	{
		if(heavierSide == 1)
			document.querySelector("h1").innerHTML = "You guessed the weight correctly, it was " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
		else
			document.querySelector("h1").innerHTML = "You guessed the weight correctly, it was "  + (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%";
	}
	else
	{
		if(heavierSide == 1)
			document.querySelector("h1").innerHTML = "You guessed the weight incorrectly, it was " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
		else
			document.querySelector("h1").innerHTML = "You guessed the weight incorrectly, it was "  + (100 - weightHeavierSide) + "%/" + weightHeavierSide + "%";
	}

	// reset which button will contain correct weight
	correctWeightButn = Math.floor(Math.random() * 3) + 1;

	// reset weight
	isWeighted = Math.floor(Math.random() * 2) + 1;
	weightHeavierSide = Math.floor(Math.random() * difference) + min;
	heavierSide = Math.floor(Math.random() * 2) + 1;

	// hide weight guessing buttons
	document.getElementById("guess1").hidden = true;
	document.getElementById("guess2").hidden = true;
	document.getElementById("guess3").hidden = true;

	// make flipping buttons clickable again
	document.getElementById("flipCoin").disabled = false; 
	document.getElementById("flipCoinMultiple").disabled = false;

	// reset guessing weight message
	document.getElementById("guessWeight").innerHTML = "";
}



// Get the modal
var modal = document.getElementById("helpModal");
// Get the button that opens the modal
var btn = document.getElementById("helpButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}