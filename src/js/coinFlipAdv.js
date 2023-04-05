// variables for sound effect audio
const AUDIO_FLIP = new Audio("../sounds/coin_flip.mp3");
AUDIO_FLIP.playbackRate = 2.5;
const AUDIO_WRONG = new Audio("../sounds/wrong.mp3");
const AUDIO_CORRECT = new Audio("../sounds/point_2.mp3");

// hide weight guessing options and submit button
document.getElementById("weightOptions").hidden = true;
document.getElementById("submitButton").hidden = true;

// make weighted and not weighted buttons unclickable until one flip is made
document.getElementById("weighted").disabled = true;
document.getElementById("notWeighted").disabled = true;

// determines if coin will be weighted or not
var isWeighted = Math.floor(Math.random() * 2) + 1;

// counters for both sides
var headCount = 0;
var tailCount = 0;

// determines amount of weight for the heavier side 
const weights = [90, 75, 60];
var x = Math.floor(Math.random() * 3);
var weightHeavierSide = weights[x];

// determines if tails or heads is the heavier side (1 for heads and 2 for tails)
var heavierSide = Math.floor(Math.random() * 2) + 1;

// Function to flip coin
function flipCoin() {
    // plays rolling dice audio
    AUDIO_FLIP.play();

    // makes weighted and not weighted buttons reappear
    document.getElementById("weighted").hidden = false;
    document.getElementById("notWeighted").hidden = false;

    // hide weight guessing options and submit button
    document.getElementById("weightOptions").hidden = true;
    document.getElementById("submitButton").hidden = true;

    // make weighted and not weighted buttons clickable again
    document.getElementById("weighted").disabled = false;
    document.getElementById("notWeighted").disabled = false;

    // reset weight display
    document.getElementById("weightAmount").innerHTML = "";

    // reset guessing weight message 
    document.getElementById("guessWeight").innerHTML = "";

    // reset counts display
    document.getElementById("headTotal").innerHTML = 0;
    document.getElementById("tailTotal").innerHTML = 0;

    // coin is weighted
    if (isWeighted == 1) {
        // heavier side is heads
        if (heavierSide == 1) {
            let num = Math.floor(Math.random() * 100) + 1;

            // if weighted coin is heads
            if (num <= weightHeavierSide) {
                document.getElementById("head").innerHTML = "You got Heads!";
                document.getElementById("coin").setAttribute("src", "../images/coinHead.png");
                headCount += 1;
            }
            // if weighted coin is tails
            else {
                document.getElementById("head").innerHTML = "You got Tails!";
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
                document.getElementById("head").innerHTML = "You got Tails!";
                document.getElementById("coin").setAttribute("src", "../images/coinTail.png");
                tailCount += 1;
            }
            // weighted coin is heads
            else {
                document.getElementById("head").innerHTML = "You got Heads!";
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
            document.getElementById("head").innerHTML = "You got Heads!";
            document.getElementById("coin").setAttribute("src", "../images/coinHead.png");
            headCount += 1;
        }
        // if regular coin is tails
        else {
            document.getElementById("head").innerHTML = "You got Tails!";
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

    // hide weight guessing options and submit button
    document.getElementById("weightOptions").hidden = true;
    document.getElementById("submitButton").hidden = true;

    // make weighted and not weighted buttons clickable again
    document.getElementById("weighted").disabled = false;
    document.getElementById("notWeighted").disabled = false;

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
        if (heavierSide == 1) {
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
            document.getElementById("head").innerHTML = "You got Heads " + headAmount + " times, and got Tails " + tailAmount + " times";
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
            document.getElementById("head").innerHTML = "You got Heads " + headAmount + " times, and got Tails " + tailAmount + " times";
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
        document.getElementById("head").innerHTML = "You got Heads " + headAmount + " times, and got Tails " + tailAmount + " times";
    }
}

function weightedGuess() {
    // hides weighted and not weighted button when user makes guess
    document.getElementById("weighted").hidden = true;
    document.getElementById("notWeighted").hidden = true;

    if (isWeighted == 1) {
        // plays correct guess audio
        AUDIO_CORRECT.play();

        // make flipping coin buttons unclickable until user guesses weight
        document.getElementById("flipCoin").disabled = true;
        document.getElementById("flipCoinMultiple").disabled = true;

        // message displays at top of screen
        document.getElementById("head").innerHTML = "The coin is in fact weighted";

        // guess weight message displays
        document.getElementById("guessWeight").innerHTML = "Guess the weight of the coin";

        // reveal guessing weight options and submit button
        document.getElementById("weightOptions").hidden = false;
        document.getElementById("submitButton").hidden = false;
    }
    else {
        // plays wrong guess audio
        AUDIO_WRONG.play();

        document.querySelector("head").innerHTML = "In this case the coin is actually not weighted";
        document.getElementById("weightAmount").innerHTML = "Weight: 50%/50%";

        // reset weight
        isWeighted = Math.floor(Math.random() * 2) + 1;
        x = Math.floor(Math.random() * 3);
        weightHeavierSide = weights[x];
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

    if (isWeighted == 1) {
        // plays wrong guess audio
        AUDIO_WRONG.play();

        // make flipping coin buttons unclickable until user guesses weight
        document.getElementById("flipCoin").disabled = true;
        document.getElementById("flipCoinMultiple").disabled = true;

        // message displays at top of screen
        document.getElementById("head").innerHTML = "In this case the coin is actually weighted";

        // guess weight message displays
        document.getElementById("guessWeight").innerHTML = "Guess the weight of the coin";

        // reveal guessing weight options and submit button
        document.getElementById("weightOptions").hidden = false;
        document.getElementById("submitButton").hidden = false;
    }
    else {
        // plays correct guess audio
        AUDIO_CORRECT.play();

        document.getElementById("head").innerHTML = "The coin is in fact not weighted";
        document.getElementById("weightAmount").innerHTML = "Weight: 50%/50%";

        // reset weight
        isWeighted = Math.floor(Math.random() * 2) + 1;
        x = Math.floor(Math.random() * 3);
        weightHeavierSide = weights[x];
        heavierSide = Math.floor(Math.random() * 2) + 1;
    }

    // resetting counts
    headCount = 0;
    tailCount = 0;
}

function submitWeight() {
    // hide weight guessing options and submit button and remove guess weight message
    document.getElementById("weightOptions").hidden = true;
    document.getElementById("submitButton").hidden = true;
    document.getElementById("guessWeight").innerHTML = "";

    let selectElement = document.querySelector('#weightOptions');
    let output = selectElement.options[selectElement.selectedIndex].value;

    // if heavier side is heads
    if (heavierSide == 1) {
        if (output == (weightHeavierSide + "/" + (100 - weightHeavierSide)))
            document.getElementById("weightAmount").innerHTML = "The weight is in fact " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
        else
            document.getElementById("weightAmount").innerHTML = "In this case the weight is actually " + weightHeavierSide + "%/" + (100 - weightHeavierSide) + "%";
    }
    // if heavier side is tails
    else {
        if (output == ((100 - weightHeavierSide) + "/" + weightHeavierSide))
            document.getElementById("weightAmount").innerHTML = "The weight is in fact " + ((100 - weightHeavierSide) + "%/" + weightHeavierSide + "%");
        else
            document.getElementById("weightAmount").innerHTML = "In this case the weight is actually " + ((100 - weightHeavierSide) + "%/" + weightHeavierSide + "%");
    }

    // make flipping coin buttons clickable again
    document.getElementById("flipCoin").disabled = false;
    document.getElementById("flipCoinMultiple").disabled = false;

    // reset weight
    isWeighted = Math.floor(Math.random() * 2) + 1;
    x = Math.floor(Math.random() * 3);
    weightHeavierSide = weights[x];
    heavierSide = Math.floor(Math.random() * 2) + 1;
}

// Get the modal
var modal = document.getElementById("helpModal");
// Get the button that opens the modal
var btn = document.getElementById("helpButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}