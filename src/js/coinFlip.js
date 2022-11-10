		// Function to flip coin
		function flipCoin() {
			
			let randomNumber = Math.random();
			let weighted = Math.floor(Math.random() * 2) + 1;

			// coin is heads
			if (randomNumber < .5) {
				document.querySelector("h1").innerHTML = "You got HEADS!";
				document.getElementById("coin").setAttribute("src", "../images/coinHead.png");
			} 
			// coin is tails
			else {
				document.querySelector("h1").innerHTML = "You got TAILS!";
				document.getElementById("coin").setAttribute("src", "../images/coinTail.png");
			}
		}

		var isWeighted = 0;

		// Function to flip coin multiple times
		function flipCoinMultiple() {
			// reset answer
			document.querySelector("h2").innerHTML = "";

			// determines if coin is weighted or not
			isWeighted = Math.floor(Math.random() * 2) + 1;

			// gets amount of flips from user
			let qty = document.getElementById("quantity").value;

			// if coin is weighted
			if (isWeighted == 1) {
				// counters for both sides
				let headCount = 0;
				let tailCount = 0;

				// determines amount of weight for the heavier side 
				// (anywhere from 70-30 to 57-43, with the higher number being the heavier side)
				let min = 57;
				let max = 71;
				let difference = max - min;
				let weightHeavierSide = Math.floor(Math.random() * difference) + min;

				// determines if tails or heads is the heavier side (1 for heads and 2 for tails)
				let heavierSide = Math.floor(Math.random() * 2) + 1;
								
      			if(heavierSide == 1) {
					for (let i = 0; i < qty; i++) {
       					let num = Math.floor(Math.random() * 100) + 1;
					
						// if weighted coin is heads
        				if (num <= weightHeavierSide) {
          					headCount += 1;
        				} 
						// if weighted coin is tails
						else {
          					tailCount += 1;
        				}
      				}
      				document.getElementById("headTotal").innerHTML = headCount;
					document.getElementById("tailTotal").innerHTML = tailCount;
				}

				else {
					for (let i = 0; i < qty; i++) {
       					let num = Math.floor(Math.random() * 100) + 1;
					
						// if weighted coin is tails
        				if (num <= weightHeavierSide) {
          					tailCount += 1;
        				} 
						// if weighted coin is heads
						else {
          					headCount += 1;
        				}
      				}
      				document.getElementById("headTotal").innerHTML = headCount;
					document.getElementById("tailTotal").innerHTML = tailCount;
				}
			} 

			// if coin is not weighted
			else {
				let headCount = 0;
				let tailCount = 0;

      			for (let i = 0; i < qty; i++) {
       				let num = Math.floor(Math.random() * 100) + 1;
					
					// if regular coin is heads
        			if (num <= 50) {
          				headCount += 1;
        			} 
					// if regular coin is tails
					else {
          				tailCount += 1;
        			}
      			}
      			document.getElementById("headTotal").innerHTML = headCount;
				document.getElementById("tailTotal").innerHTML = tailCount;
			}
		}

		function ifWeighted() {
			if(isWeighted == 1)
				document.querySelector("h2").innerHTML = "You are Correct!";
			else
				document.querySelector("h2").innerHTML = "You are Incorrect";
		}

		function ifNotWeighted() {
			if(isWeighted == 1)
				document.querySelector("h2").innerHTML = "You are Incorrect";
			else
				document.querySelector("h2").innerHTML = "You are Correct!";
		}