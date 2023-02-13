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

// Function to flip coin
function flipCoin() {
	// reset weight display
	document.getElementById("weightAmount").innerHTML = "Weight: ";

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
	// reset weight display
	document.getElementById("weightAmount").innerHTML = "Weight: ";

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
	if(isWeighted == 1) {
		document.querySelector("h1").innerHTML = "Your guess was correct, the coin was weighted";

		if(heavierSide == 1)
			document.getElementById("weightAmount").innerHTML = "Weight: " + weightHeavierSide + "/" + (100 - weightHeavierSide);
		else
			document.getElementById("weightAmount").innerHTML = "Weight: " + (100 - weightHeavierSide) + "/" + weightHeavierSide;
	}
	else {
		document.querySelector("h1").innerHTML = "Your guess was incorrect, the coin was not weighted";
		document.getElementById("weightAmount").innerHTML = "Weight: 50/50";
	}
	
	// resetting global variables
	headCount = 0;
	tailCount = 0;
	isWeighted = Math.floor(Math.random() * 2) + 1;
	weightHeavierSide = Math.floor(Math.random() * difference) + min;
	heavierSide = Math.floor(Math.random() * 2) + 1;
}

function notWeightedGuess() {
	if(isWeighted == 1) {
		document.querySelector("h1").innerHTML = "Your guess was incorrect, the coin was weighted";

		if(heavierSide == 1)
			document.getElementById("weightAmount").innerHTML = "Weight: " + weightHeavierSide + "/" + (100 - weightHeavierSide);
		else
			document.getElementById("weightAmount").innerHTML = "Weight: " + (100 - weightHeavierSide) + "/" + weightHeavierSide;
	}
	else {
		document.querySelector("h1").innerHTML = "Your guess was correct, the coin was not weighted";
		document.getElementById("weightAmount").innerHTML = "Weight: 50/50";
	}
	
	// resetting global variables
	headCount = 0;
	tailCount = 0;
	isWeighted = Math.floor(Math.random() * 2) + 1;
	weightHeavierSide = Math.floor(Math.random() * difference) + min;
	heavierSide = Math.floor(Math.random() * 2) + 1;
}