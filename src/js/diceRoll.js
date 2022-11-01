		// Function to roll dice
		function rollDice() {

			// determines number on dice
			let randomNumber = Math.floor(Math.random() * 6) + 1;

			// dice is one
			if (randomNumber == 1) {
				document.querySelector("h1").innerHTML = "You rolled a One!";
				document.getElementById("dice").setAttribute("src", "images/dice1.png");
			} 
			// dice is two
			else if (randomNumber == 2) {
				document.querySelector("h1").innerHTML = "You rolled a Two!";
				document.getElementById("dice").setAttribute("src", "images/dice2.png");
			}
             // dice is three
			else if (randomNumber == 3) {
				document.querySelector("h1").innerHTML = "You rolled a Three!";
				document.getElementById("dice").setAttribute("src", "images/dice3.png");
			}
            // dice is four
			else if (randomNumber == 4) {
				document.querySelector("h1").innerHTML = "You rolled a Four!";
				document.getElementById("dice").setAttribute("src", "images/dice4.png");
			}
            // dice is five
			else if (randomNumber == 5) {
				document.querySelector("h1").innerHTML = "You rolled a Five!";
				document.getElementById("dice").setAttribute("src", "images/dice5.png");
			}
            // dice is six
			else if (randomNumber == 6) {
				document.querySelector("h1").innerHTML = "You rolled a Six!";
				document.getElementById("dice").setAttribute("src", "images/dice6.png");
			}
		}

		// Function to roll dice multiple times
		function rollDiceMultiple() {

			// determines if dice is weighted or not
			let isWeighted = Math.floor(Math.random() * 2) + 1;
			
			let button = document.getElementById("roll");
			let qty = document.getElementById("quantity").value;

			// if dice is weighted
			if (isWeighted == 1) {
				// counters for all sides
				let oneCount = 0;
				let twoCount = 0;
                let threeCount = 0;
                let fourCount = 0;
                let fiveCount = 0;
                let sixCount = 0;

				// determines amount of weight for the heavier side 
				// (anywhere from 70-30 to 60-40, with the higher number being the heavier side)
				let min = 60;
				let max = 71;
				let difference = max - min;
				let weightHeavierSide = Math.floor(Math.random() * difference) + min;

				// determines amount of weight for rest of sides
				let restOfWeight = 100 - weightHeavierSide;
				let weightOfLighterSides = restOfWeight / 6;

				// determines which side of dice is the heavier side
				let heavierSide = Math.floor(Math.random() * 6) + 1;

				// heavier side is one
      			if(heavierSide == 1) {

					for (let i = 0; i < qty; i++) {
						let num = Math.floor(Math.random() * 6) + 1;
					
						// if weighted dice is one
						if (num == 1) {
							oneCount += 1;
						} 
						// if weighted dice is two
						else if (num == 2) {
							twoCount += 1;
						} 
						// if weighted dice is three
						else if (num == 3) {
							threeCount += 1;
						} 
						// if weighted dice is four
						else if (num == 4) {
							fourCount += 1;
						} 
						// if weighted dice is five
						else if (num == 5) {
							fiveCount += 1;
						} 
						// if weighted dice is six
						else if (num == 6) {
							sixCount += 1;
						}
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

					for (let i = 0; i < qty; i++) {
						let num = Math.floor(Math.random() * 6) + 1;

						// if weighted dice is one
						if (num == 1) {
							oneCount += 1;
						} 
						// if weighted dice is two
						else if (num == 2) {
						twoCount += 1;
						} 
						// if weighted dice is three
						else if (num == 3) {
							threeCount += 1;
						} 
						// if weighted dice is four
						else if (num == 4) {
							fourCount += 1;
						} 
						// if weighted dice is five
						else if (num == 5) {
							fiveCount += 1;
						} 
						// if weighted dice is six
						else if (num == 6) {
							sixCount += 1;
						}
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

					for (let i = 0; i < qty; i++) {
						let num = Math.floor(Math.random() * 6) + 1;
					
						// if weighted dice is one
						if (num == 1) {
							oneCount += 1;
						} 
						// if weighted dice is two
						else if (num == 2) {
							twoCount += 1;
						} 
						// if weighted dice is three
						else if (num == 3) {
							threeCount += 1;
						} 
						// if weighted dice is four
						else if (num == 4) {
							fourCount += 1;
						} 
						// if weighted dice is five
						else if (num == 5) {
							fiveCount += 1;
						} 
						// if weighted dice is six
						else if (num == 6) {
							sixCount += 1;
						}
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

					for (let i = 0; i < qty; i++) {
						let num = Math.floor(Math.random() * 6) + 1;
					
						// if weighted dice is one
						if (num == 1) {
							oneCount += 1;
						} 
						// if weighted dice is two
						else if (num == 2) {
							twoCount += 1;
						} 
						// if weighted dice is three
						else if (num == 3) {
							threeCount += 1;
						} 
						// if weighted dice is four
						else if (num == 4) {
							fourCount += 1;
						} 
						// if weighted dice is five
						else if (num == 5) {
							fiveCount += 1;
						} 
						// if weighted dice is six
						else if (num == 6) {
							sixCount += 1;
						}
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

					for (let i = 0; i < qty; i++) {
						let num = Math.floor(Math.random() * 6) + 1;
					
						// if weighted dice is one
						if (num == 1) {
							oneCount += 1;
						} 
						// if weighted dice is two
						else if (num == 2) {
							twoCount += 1;
						} 
						// if weighted dice is three
						else if (num == 3) {
							threeCount += 1;
						} 
						// if weighted dice is four
						else if (num == 4) {
							fourCount += 1;
						} 
						// if weighted dice is five
						else if (num == 5) {
							fiveCount += 1;
						} 
						// if weighted dice is six
						else if (num == 6) {
						  	sixCount += 1;
						}
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

					for (let i = 0; i < qty; i++) {
       					let num = Math.floor(Math.random() * 6) + 1;
					
						// if weighted dice is one
						if (num == 1) {
          					oneCount += 1;
        				} 
						// if weighted dice is two
        				else if (num == 2) {
          					twoCount += 1;
        				} 
                    	// if weighted dice is three
        				else if (num == 3) {
          					threeCount += 1;
        				} 
                    	// if weighted dice is four
        				else if (num == 4) {
          					fourCount += 1;
        				} 
                    	// if weighted dice is five
        				else if (num == 5) {
          					fiveCount += 1;
        				} 
                    	// if weighted dice is six
        				else if (num == 6) {
          					sixCount += 1;
        				}
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
				let oneCount = 0;
				let twoCount = 0;
                let threeCount = 0;
                let fourCount = 0;
                let fiveCount = 0;
                let sixCount = 0;

      			for (let i = 0; i < qty; i++) {
                    let num = Math.floor(Math.random() * 6) + 1;
					
					// if nonweighted dice is one
        			if (num == 1) {
          				oneCount += 1;
        			} 
					// if nonweighted dice is two
        			else if (num == 2) {
          				twoCount += 1;
        			} 
                    // if nonweighted dice is three
        			else if (num == 3) {
          				threeCount += 1;
        			} 
                    // if nonweighted dice is four
        			else if (num == 4) {
          				fourCount += 1;
        			} 
                    // if nonweighted dice is five
        			else if (num == 5) {
          				fiveCount += 1;
        			} 
                    // if nonweighted dice is six
        			else if (num == 6) {
          				sixCount += 1;
        			}
      			}
      			document.getElementById("oneTotal").innerHTML = oneCount;
				document.getElementById("twoTotal").innerHTML = twoCount;
                document.getElementById("threeTotal").innerHTML = threeCount;
				document.getElementById("fourTotal").innerHTML = fourCount;
                document.getElementById("fiveTotal").innerHTML = fiveCount;
				document.getElementById("sixTotal").innerHTML = sixCount;
			}
		}