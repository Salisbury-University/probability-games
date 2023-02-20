// determines if dice will be weighted or not
var isWeighted = Math.floor(Math.random() * 2) + 1;

// counters for all sides
var oneCount = 0;
var twoCount = 0;
var threeCount = 0;
var fourCount = 0;
var fiveCount = 0;
var sixCount = 0;

// determines amount of weight for the heavier side 
var min = 25;
var max = 36;
var difference = max - min;
var weightHeavierSide = Math.floor(Math.random() * difference) + min;

// determines amount of weight for rest of sides
var restOfWeight = 100 - weightHeavierSide;
var weightLighterSides = restOfWeight / 5.0;

// determines which side of dice is the heavier side
var heavierSide = Math.floor(Math.random() * 6) + 1;

// Function to roll dice
function rollDice() {
	// reset weight display
	document.getElementById("weightAmount").innerHTML = "Weight: ";

	// reset counts display
	document.getElementById("oneTotal").innerHTML = 0;
	document.getElementById("twoTotal").innerHTML = 0;
	document.getElementById("threeTotal").innerHTML = 0;
	document.getElementById("fourTotal").innerHTML = 0;
	document.getElementById("fiveTotal").innerHTML = 0;
	document.getElementById("sixTotal").innerHTML = 0;

	// if dice is weighted
	if (isWeighted == 1) {

		// heavier side is one
		if(heavierSide == 1) {

			let num = Math.floor(Math.random() * 100) + 1;
		
			// if weighted dice lands on one
			if (num <= weightHeavierSide) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "../images/dice1.png");
				oneCount += 1;
			} 
			// if weighted dice lands on two
			else if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "../images/dice2.png");
				twoCount += 1;
			} 
			// if weighted dice lands on three
			else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "../images/dice3.png");
				threeCount += 1;
			} 
			// if weighted dice lands on four
			else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "../images/dice4.png");
				fourCount += 1;
			} 
			// if weighted dice lands on five
			else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "../images/dice5.png");
				fiveCount += 1;
			} 
			// if weighted dice lands on six
			else {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "../images/dice6.png");
				sixCount += 1;
			}
			
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
		}

		// heavier side is two
		if(heavierSide == 2) {

			let num = Math.floor(Math.random() * 100) + 1;

			// if weighted dice lands on one
			if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "../images/dice1.png");
				oneCount += 1;
			} 
			// if weighted dice lands on two
			else if (num <= weightHeavierSide) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "../images/dice2.png");
				twoCount += 1;
			} 
			// if weighted dice lands on three
			else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "../images/dice3.png");
				threeCount += 1;
			} 
			// if weighted dice lands on four
			else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "../images/dice4.png");
				fourCount += 1;
			} 
			// if weighted dice lands on five
			else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "../images/dice5.png");
				fiveCount += 1;
			} 
			// if weighted dice lands on six
			else {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "../images/dice6.png");
				sixCount += 1;
			}
			
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
		}

		// heavier side is three
		else if(heavierSide == 3) {

			let num = Math.floor(Math.random() * 100) + 1;
		
			// if weighted dice lands on one
			if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "../images/dice1.png");
				oneCount += 1;
			} 
			// if weighted dice lands on two
			else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "../images/dice2.png");
				twoCount += 1;
			} 
			// if weighted dice lands on three
			else if (num <= weightHeavierSide) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "../images/dice3.png");
				threeCount += 1;
			} 
			// if weighted dice lands on four
			else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "../images/dice4.png");
				fourCount += 1;
			} 
			// if weighted dice lands on five
			else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "../images/dice5.png");
				fiveCount += 1;
			} 
			// if weighted dice lands on six
			else {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "../images/dice6.png");
				sixCount += 1;
			}
			
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
		}

		// heavier side is four
		else if(heavierSide == 4) {

			let num = Math.floor(Math.random() * 100) + 1;
		
			// if weighted dice lands on one
			if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "../images/dice1.png");
				oneCount += 1;
			} 
			// if weighted dice lands on two
			else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "../images/dice2.png");
				twoCount += 1;
			} 
			// if weighted dice lands on three
			else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "../images/dice3.png");
				threeCount += 1;
			} 
			// if weighted dice lands on four
			else if (num <= weightHeavierSide) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "../images/dice4.png");
				fourCount += 1;
			} 
			// if weighted dice lands on five
			else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "../images/dice5.png");
				fiveCount += 1;
			} 
			// if weighted dice lands on six
			else {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "../images/dice6.png");
				sixCount += 1;
			}
			
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
		}

		// heavier side is five
		else if(heavierSide == 5) {

			let num = Math.floor(Math.random() * 100) + 1;
		
			// if weighted dice lands on one
			if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "../images/dice1.png");
				oneCount += 1;
			} 
			// if weighted dice lands on two
			else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "../images/dice2.png");
				twoCount += 1;
			} 
			// if weighted dice lands on three
			else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "../images/dice3.png");
				threeCount += 1;
			} 
			// if weighted dice lands on four
			else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "../images/dice4.png");
				fourCount += 1;
			} 
			// if weighted dice lands on five
			else if (num <= weightHeavierSide) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "../images/dice5.png");
				fiveCount += 1;
			} 
			// if weighted dice lands on six
			else {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "../images/dice6.png");
				sixCount += 1;
			}
			
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
		}

		// heavier side is six
		else if(heavierSide == 6) {

			let num = Math.floor(Math.random() * 100) + 1;
		
			// if weighted dice lands on one
			if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "../images/dice1.png");
				oneCount += 1;
			} 
			// if weighted dice lands on two
			else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "../images/dice2.png");
				twoCount += 1;
			} 
			// if weighted dice lands on three
			else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "../images/dice3.png");
				threeCount += 1;
			} 
			// if weighted dice lands on four
			else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "../images/dice4.png");
				fourCount += 1;
			} 
			// if weighted dice lands on five
			else if ((num > (weightHeavierSide + (weightLighterSides * 4))) && (num <= (weightHeavierSide + (weightLighterSides * 5)))) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "../images/dice5.png");
				fiveCount += 1;
			} 
			// if weighted dice lands on six
			else {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "../images/dice6.png");
				sixCount += 1;
			}
			
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
		}
	}

	// if dice is not weighted
	else {

			let num = Math.floor(Math.random() * 6) + 1;
			
			// if nonweighted dice is one
			if (num == 1) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "../images/dice1.png");
				oneCount += 1;
			} 
			// if nonweighted dice is two
			else if (num == 2) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "../images/dice2.png");
				twoCount += 1;
			} 
			// if nonweighted dice is three
			else if (num == 3) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "../images/dice3.png");
				threeCount += 1;
			} 
			// if nonweighted dice is four
			else if (num == 4) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "../images/dice4.png");
				fourCount += 1;
			} 
			// if nonweighted dice is five
			else if (num == 5) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "../images/dice5.png");
				fiveCount += 1;
			} 
			// if nonweighted dice is six
			else if (num == 6) {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "../images/dice6.png");
				sixCount += 1;
			}
		
		document.getElementById("oneTotal").innerHTML = oneCount;
		document.getElementById("twoTotal").innerHTML = twoCount;
		document.getElementById("threeTotal").innerHTML = threeCount;
		document.getElementById("fourTotal").innerHTML = fourCount;
		document.getElementById("fiveTotal").innerHTML = fiveCount;
		document.getElementById("sixTotal").innerHTML = sixCount;
	}
}

// Function to roll dice multiple times
function rollDiceMultiple() {
	// reset weight display
	document.getElementById("weightAmount").innerHTML = "Weight: ";

	// reset counts display
	document.getElementById("oneTotal").innerHTML = 0;
	document.getElementById("twoTotal").innerHTML = 0;
	document.getElementById("threeTotal").innerHTML = 0;
	document.getElementById("fourTotal").innerHTML = 0;
	document.getElementById("fiveTotal").innerHTML = 0;
	document.getElementById("sixTotal").innerHTML = 0;

	// amount of rolls user specifies
	let qty = document.getElementById("quantity").value;

	// for displaying amount of times each side was landed on for each individual set of rolls
	let oneAmount = 0;
	let twoAmount = 0;
	let threeAmount = 0;
	let fourAmount = 0;
	let fiveAmount = 0;
	let sixAmount = 0;

	// if dice is weighted
	if (isWeighted == 1) {
		// heavier side is one
		if(heavierSide == 1) {

			for (let i = 0; i < qty; i++) {

				let num = Math.floor(Math.random() * 100) + 1;
			
				// if weighted dice lands on one
				if (num <= weightHeavierSide) {
					oneCount += 1;
					oneAmount += 1;
				} 
				// if weighted dice lands on two
				else if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
					twoCount += 1;
				    twoAmount += 1;
				} 
				// if weighted dice lands on three
				else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
					threeCount += 1;
					threeAmount += 1;
				} 
				// if weighted dice lands on four
				else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
					fourCount += 1;
					fourAmount += 1;
				} 
				// if weighted dice lands on five
				else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
					fiveCount += 1;
					fiveAmount += 1;
				} 
				// if weighted dice lands on six
				else {
					sixCount += 1;
					sixAmount += 1;
				}
			}
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
			document.querySelector("h1").innerHTML = "One: " + oneAmount + ", Two: " + twoAmount + ", Three: " + threeAmount + ", Four: " + fourAmount + ", Five: " + fiveAmount + ", Six: " + sixAmount;
		}

		// heavier side is two
		if(heavierSide == 2) {

			for (let i = 0; i < qty; i++) {

				let num = Math.floor(Math.random() * 100) + 1;

				// if weighted dice lands on one
				if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
					oneCount += 1;
					oneAmount += 1;
				} 
				// if weighted dice lands on two
				else if (num <= weightHeavierSide) {
					twoCount += 1;
					twoAmount += 1;
				} 
				// if weighted dice lands on three
				else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
					threeCount += 1;
					threeAmount += 1;
				} 
				// if weighted dice lands on four
				else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
					fourCount += 1;
					fourAmount += 1;
				} 
				// if weighted dice lands on five
				else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
					fiveCount += 1;
					fiveAmount += 1;
				} 
				// if weighted dice lands on six
				else {
					sixCount += 1;
					sixAmount += 1;
				}
			}
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
			document.querySelector("h1").innerHTML = "One: " + oneAmount + ", Two: " + twoAmount + ", Three: " + threeAmount + ", Four: " + fourAmount + ", Five: " + fiveAmount + ", Six: " + sixAmount;
		}

		// heavier side is three
		else if(heavierSide == 3) {

			for (let i = 0; i < qty; i++) {

				let num = Math.floor(Math.random() * 100) + 1;
			
				// if weighted dice lands on one
				if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
					oneCount += 1;
					oneAmount += 1;
				} 
				// if weighted dice lands on two
				else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
					twoCount += 1;
					twoAmount += 1;
				} 
				// if weighted dice lands on three
				else if (num <= weightHeavierSide) {
					threeCount += 1;
					threeAmount += 1;
				} 
				// if weighted dice lands on four
				else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
					fourCount += 1;
					fourAmount += 1;
				} 
				// if weighted dice lands on five
				else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
					fiveCount += 1;
					fiveAmount += 1;
				} 
				// if weighted dice lands on six
				else {
					sixCount += 1;
					sixAmount += 1;
				}
			}
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
			document.querySelector("h1").innerHTML = "One: " + oneAmount + ", Two: " + twoAmount + ", Three: " + threeAmount + ", Four: " + fourAmount + ", Five: " + fiveAmount + ", Six: " + sixAmount;
		}

		// heavier side is four
		else if(heavierSide == 4) {

			for (let i = 0; i < qty; i++) {

				let num = Math.floor(Math.random() * 100) + 1;
			
				// if weighted dice lands on one
				if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
					oneCount += 1;
					oneAmount += 1;
				} 
				// if weighted dice lands on two
				else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
					twoCount += 1;
					twoAmount += 1;
				} 
				// if weighted dice lands on three
				else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
					threeCount += 1;
					threeAmount += 1;
				} 
				// if weighted dice lands on four
				else if (num <= weightHeavierSide) {
					fourCount += 1;
					fourAmount += 1;
				} 
				// if weighted dice lands on five
				else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
					fiveCount += 1;
					fiveAmount += 1;
				} 
				// if weighted dice lands on six
				else {
					sixCount += 1;
					sixAmount += 1;
				}
			}
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
			document.querySelector("h1").innerHTML = "One: " + oneAmount + ", Two: " + twoAmount + ", Three: " + threeAmount + ", Four: " + fourAmount + ", Five: " + fiveAmount + ", Six: " + sixAmount;
		}

		// heavier side is five
		else if(heavierSide == 5) {

			for (let i = 0; i < qty; i++) {

				let num = Math.floor(Math.random() * 100) + 1;
			
				// if weighted dice lands on one
				if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
					oneCount += 1;
					oneAmount += 1;
				} 
				// if weighted dice lands on two
				else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
					twoCount += 1;
					twoAmount += 1;
				} 
				// if weighted dice lands on three
				else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
					threeCount += 1;
					threeAmount += 1;
				} 
				// if weighted dice lands on four
				else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
					fourCount += 1;
					fourAmount += 1;
				} 
				// if weighted dice lands on five
				else if (num <= weightHeavierSide) {
					fiveCount += 1;
					fiveAmount += 1;
				} 
				// if weighted dice lands on six
				else {
					sixCount += 1;
					sixAmount += 1;
				}
			}
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
			document.querySelector("h1").innerHTML = "One: " + oneAmount + ", Two: " + twoAmount + ", Three: " + threeAmount + ", Four: " + fourAmount + ", Five: " + fiveAmount + ", Six: " + sixAmount;
		}

		// heavier side is six
		else if(heavierSide == 6) {

			for (let i = 0; i < qty; i++) {

				let num = Math.floor(Math.random() * 100) + 1;
			
				// if weighted dice lands on one
				if ((num > weightHeavierSide) && (num <= (weightHeavierSide + weightLighterSides))) {
					oneCount += 1;
					oneAmount += 1;
				} 
				// if weighted dice lands on two
				else if ((num > (weightHeavierSide + weightLighterSides)) && (num <= (weightHeavierSide + (weightLighterSides * 2)))) {
					twoCount += 1;
					twoAmount += 1;
				} 
				// if weighted dice lands on three
				else if ((num > (weightHeavierSide + (weightLighterSides * 2))) && (num <= (weightHeavierSide + (weightLighterSides * 3)))) {
					threeCount += 1;
					threeAmount += 1;
				} 
				// if weighted dice lands on four
				else if ((num > (weightHeavierSide + (weightLighterSides * 3))) && (num <= (weightHeavierSide + (weightLighterSides * 4)))) {
					fourCount += 1;
					fourAmount += 1;
				} 
				// if weighted dice lands on five
				else if ((num > (weightHeavierSide + (weightLighterSides * 4))) && (num <= (weightHeavierSide + (weightLighterSides * 5)))) {
					fiveCount += 1;
					fiveAmount += 1;
				} 
				// if weighted dice lands on six
				else {
					sixCount += 1;
					sixAmount += 1;
				}
			}
			document.getElementById("oneTotal").innerHTML = oneCount;
			document.getElementById("twoTotal").innerHTML = twoCount;
			document.getElementById("threeTotal").innerHTML = threeCount;
			document.getElementById("fourTotal").innerHTML = fourCount;
			document.getElementById("fiveTotal").innerHTML = fiveCount;
			document.getElementById("sixTotal").innerHTML = sixCount;
			document.querySelector("h1").innerHTML = "One: " + oneAmount + ", Two: " + twoAmount + ", Three: " + threeAmount + ", Four: " + fourAmount + ", Five: " + fiveAmount + ", Six: " + sixAmount;
		}
	}

	// if dice is not weighted
	else {

		for (let i = 0; i < qty; i++) {

			let num = Math.floor(Math.random() * 6) + 1;
			
			// if nonweighted dice is one
			if (num == 1) {
				oneCount += 1;
				oneAmount += 1;
			} 
			// if nonweighted dice is two
			else if (num == 2) {
				twoCount += 1;
				twoAmount += 1;
			} 
			// if nonweighted dice is three
			else if (num == 3) {
				threeCount += 1;
				threeAmount += 1;
			} 
			// if nonweighted dice is four
			else if (num == 4) {
				fourCount += 1;
				fourAmount += 1;
			} 
			// if nonweighted dice is five
			else if (num == 5) {
				fiveCount += 1;
				fiveAmount += 1;
			} 
			// if nonweighted dice is six
			else if (num == 6) {
				sixCount += 1;
				sixAmount += 1;
			}
		}
		document.getElementById("oneTotal").innerHTML = oneCount;
		document.getElementById("twoTotal").innerHTML = twoCount;
		document.getElementById("threeTotal").innerHTML = threeCount;
		document.getElementById("fourTotal").innerHTML = fourCount;
		document.getElementById("fiveTotal").innerHTML = fiveCount;
		document.getElementById("sixTotal").innerHTML = sixCount;
		document.querySelector("h1").innerHTML = "One: " + oneAmount + ", Two: " + twoAmount + ", Three: " + threeAmount + ", Four: " + fourAmount + ", Five: " + fiveAmount + ", Six: " + sixAmount;
	}
}

function weightedGuess() {
	if(isWeighted == 1) {
		document.querySelector("h1").innerHTML = "Your guess was correct, the dice was weighted";

		if(heavierSide == 1)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 2)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 3)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 4)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 5)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%";
		else
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%";
	}
	else {
		document.querySelector("h1").innerHTML = "Your guess was incorrect, the dice was not weighted";
		document.getElementById("weightAmount").innerHTML = "Weight: 16.66/16.66/16.66/16.66/16.66/16.66";
	}
	

	// resetting global variables
	oneCount = 0;
	twoCount = 0;
	threeCount = 0;
	fourCount = 0;
	fiveCount = 0;
	sixCount = 0;
	isWeighted = Math.floor(Math.random() * 2) + 1;
	weightHeavierSide = Math.floor(Math.random() * difference) + min;
	restOfWeight = 100 - weightHeavierSide;
	weightLighterSides = restOfWeight / 5.0;
	heavierSide = Math.floor(Math.random() * 6) + 1;
}

function notWeightedGuess() {
	if(isWeighted == 1) {
		document.querySelector("h1").innerHTML = "Your guess was incorrect, the dice was weighted";

		if(heavierSide == 1)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 2)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 3)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 4)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%";
		else if(heavierSide == 5)
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%/" + (weightLighterSides) + "%";
		else
			document.getElementById("weightAmount").innerHTML = "Weight: " + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightLighterSides) + "%/" + (weightHeavierSide) + "%";
	}
	else {
		document.querySelector("h1").innerHTML = "Your guess was correct, the dice was not weighted";
		document.getElementById("weightAmount").innerHTML = "Weight: 16.66/16.66/16.66/16.66/16.66/16.66";
	}

	// resetting global variables
	oneCount = 0;
	twoCount = 0;
	threeCount = 0;
	fourCount = 0;
	fiveCount = 0;
	sixCount = 0;
	isWeighted = Math.floor(Math.random() * 2) + 1;
	weightHeavierSide = Math.floor(Math.random() * difference) + min;
	restOfWeight = 100 - weightHeavierSide;
	weightLighterSides = restOfWeight / 5.0;
	heavierSide = Math.floor(Math.random() * 6) + 1;
}