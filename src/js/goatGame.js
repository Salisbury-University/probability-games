const carImg = "../images/car.png";
const goatImg = "../images/goat.png";
const doorImg = "../images/ClosedDoor.png";


var Doors = [0, 0, 0];
var carLocation = Math.floor(Math.random() * 3);
Doors[carLocation] = 1;
var gamesPlayed = 0;
var gamesWon = 0;
var gamesLost = 0;
var keptDoor = false;
var keptDoorWon = 0;
var switchDoors = 0;
var switchDoorGames = 0;
var keptDoorsGames = 0;
var keptDoorLost = 0;
var switchDoorLost = 0;
var isKept = false;
var choiceMade = 0;
var globalDoorChose = 0;
var revealGoat = 0;

function testModal() {
    $('#infoModal').modal('show');
}

function playAgain() {
    Doors[0] = 0;
    Doors[1] = 0;
    Doors[2] = 0;

    carLocation = Math.floor(Math.random() * 3);
    Doors[carLocation] = 1;

    document.getElementById("door0").src = doorImg;
    document.getElementById("door1").src = doorImg;
    document.getElementById("door2").src = doorImg;

    document.getElementById("door0").style.boxShadow = "none";
    document.getElementById("door1").style.boxShadow = "none";
    document.getElementById("door2").style.boxShadow = "none";

    document.getElementById("titleSentence").innerHTML = "Welcome to Monty Hall's Problem!"
    document.getElementById("firstSentenceID").innerHTML = "There are <b>three</b> doors in front of you. There are <b>two</b> goats, and <b>one</b> car";
    document.getElementById("continueButton").setAttribute("hidden", "hidden");
    document.getElementById("switchDoorsButton").setAttribute("hidden", "hidden");
    document.getElementById("keepDoorsButton").setAttribute("hidden", "hidden");

    document.getElementById("amountTimesToSwitch").setAttribute("hidden", "hidden");
    document.getElementById("continueSimulation").setAttribute("hidden", "hidden");
    //reveal new input and continue
    document.getElementById("simulateRunButton").removeAttribute("hidden");
    document.getElementById("amountTimesToRun").removeAttribute("hidden");

    document.getElementById("door0").setAttribute("onclick", "stepOne(0)");
    document.getElementById("door1").setAttribute("onclick", "stepOne(1)");
    document.getElementById("door2").setAttribute("onclick", "stepOne(2)");



} //end of play again

function stepOne(doorChose) {
    revealGoat = doorChose;
    globalDoorChose = doorChose;
    //displays the other goat location
    while (revealGoat == doorChose || revealGoat == carLocation) {
        revealGoat = Math.floor(Math.random() * 3);
    }


    let remainderDoor = 5;
    remainderDoor = remainderDoor - (doorChose + 1);
    remainderDoor = remainderDoor - (revealGoat + 1);
    doorChoice = remainderDoor;

    //remove ability to choose doors from imgs
    var goatDoor = "door" + revealGoat;
    var switchDoorLoc = "door" + doorChoice;
    document.getElementById(goatDoor).removeAttribute("onclick");
    document.getElementById(switchDoorLoc).removeAttribute("onclick");

    document.getElementById("door" + doorChose).style.boxShadow = "0 0 100px greenyellow";
    setTimeout(afterStepOne, 400, revealGoat);
}

function afterStepOne(revealGoat) {
    var go = "door" + revealGoat;
    document.getElementById(go).src = goatImg;
    document.getElementById("titleSentence").innerHTML = "Here is a goat!"
    document.getElementById("firstSentenceID").innerHTML = "This Goat is Located at Door " + (revealGoat + 1);
    document.getElementById("continueButton").removeAttribute("hidden");
}

function intermediateStep() {
    document.getElementById("continueButton").setAttribute("hidden", "hidden");
    document.getElementById("titleSentence").innerHTML = "What to do next!"
    document.getElementById("firstSentenceID").innerHTML = "You choose <b>Door " + (globalDoorChose + 1) +
        "</b><br> There is a Goat located at <b>Door " + (revealGoat + 1) + "</b><br> Would you like to switch to <b>Door " + (doorChoice + 1) + "</b>";
    document.getElementById("switchDoorsButton").removeAttribute("hidden");
    document.getElementById("keepDoorsButton").removeAttribute("hidden");

}

function secondIntermediate() {
    document.getElementById("titleSentence").innerHTML = "Results!"
    setTimeout(finalFunction, 800);
}

function midStepTwo(imgType, userDoorChoice) {
    if (imgType == 1) {
        document.getElementById(userDoorChoice).src = carImg;
    } else {
        document.getElementById(userDoorChoice).src = goatImg;
    }
}

function stepTwo(keptDoor) {
    var doorChoice = globalDoorChose;
    if (keptDoor) {
        var remainderDoor = 5;
        remainderDoor = remainderDoor - (globalDoorChose + 1);
        remainderDoor = remainderDoor - (revealGoat + 1);
        doorChoice = remainderDoor;
    }

    var userDoorChoice = "door" + doorChoice;
    if (doorChoice == carLocation) {
        setTimeout(midStepTwo, 400, 1, userDoorChoice);

    } else {
        setTimeout(midStepTwo, 400, 2, userDoorChoice);

    }

    document.getElementById("door0").style.boxShadow = "none";
    document.getElementById("door1").style.boxShadow = "none";
    document.getElementById("door2").style.boxShadow = "none";
    document.getElementById(userDoorChoice).style.boxShadow = "0 0 100px greenyellow";

    updateStats(doorChoice, keptDoor);
    printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoorWon, keptDoorLost);

    if (doorChoice == carLocation) {
        document.getElementById("firstSentenceID").innerHTML = "You Win!";
    } else {
        document.getElementById("firstSentenceID").innerHTML = "You Lose!";
    }

    //remove IMG clickness
    document.getElementById("door0").removeAttribute("onclick");
    document.getElementById("door1").removeAttribute("onclick");
    document.getElementById("door2").removeAttribute("onclick");

    setTimeout(secondIntermediate, 500);
}

function finalFunction() {
    if (Doors[0] == 0)
        document.getElementById("door0").src = goatImg;
    else
        document.getElementById("door0").src = carImg;

    if (Doors[1] == 0)
        document.getElementById("door1").src = goatImg;
    else
        document.getElementById("door1").src = carImg;

    if (Doors[2] == 0)
        document.getElementById("door2").src = goatImg;
    else
        document.getElementById("door2").src = carImg;
}

function determineKeep(number) {
    document.getElementById("switchDoorsButton").setAttribute("hidden", "hidden");
    document.getElementById("keepDoorsButton").setAttribute("hidden", "hidden");
    if (number == 0)
        isKept = true;
    else
        isKept = false;

    stepTwo(isKept);
}

function determineKeepSimulation(number) {
    if (number == 0)
        isKept = true;
    else
        isKept = false;
    simulateGame();
}

function updateStats(x, isKept) {
    gamesPlayed++;
    if (isKept)
        switchDoorGames++;
    else
        keptDoorsGames++;

    if (x == carLocation) {
        gamesWon++;

        if (isKept)
            switchDoors++;
        else
            keptDoorWon++;
    } else {

        if (isKept)
            switchDoorLost++;
        else
            keptDoorLost++;

        gamesLost++;
    }

} //end of update stats

function preSimulate() {
    //hide old input and simulate runs
    document.getElementById("simulateRunButton").setAttribute("hidden", "hidden");
    document.getElementById("amountTimesToRun").setAttribute("hidden", "hidden");
    //reveal new input and continue
    document.getElementById("amountTimesToSwitch").removeAttribute("hidden");
    document.getElementById("continueSimulation").removeAttribute("hidden");
    document.getElementById("simulateInfo").innerHTML = "Enter in the textbox below how many times you would like to switch doors.";


}

function changeToHowToPlay(){
    document.getElementById("mainInfoSection").innerHTML = "Below there are <b>three doors</b>, and there are <b>two goats</b> and"
    +" <b>one car</b> hidden behind the doors.  <br> You select <b>one door</b> and then <b>a goat</b> is revealed. "+ 
    " You are then given an option to either <b>keep your current door</b> or <b>switch to the other unopened door</b>. "+
    " After which the door you choose is revealed. <br> The purpose of this game is to help educate you on probability.";

    document.getElementById("mainTitleSection").innerHTML = "<b>This is how you play our game.</b>";
    

    document.getElementById("buttonHowToPlay").setAttribute("hidden","hidden");

    document.getElementById("buttonHistory").removeAttribute("hidden");
}

function changeToHistory() {
    document.getElementById("mainInfoSection").innerHTML = "Monty Hall was a TV and radio host most famous for hosting the game "+
    "show Let's Make a Deal which he produced and hosted for many years.The Monty Hall Problem was named after him because of it " +
    "similarities with Let's Make a Deal.The problem was first posted and solved a letter by Steve Selvin to the American "+
    "Statistician in 1975. The original problem reading: Suppose you're on a game show, and you're given the choice of three"+
    " doors: Behind one door is a car; behind the others, goats.You pick a door, say No. 1, and the host, who knows what's behind "+
    "the doors, opens another door, say No. 3, which has a goat.He then says to you, Do you want to pick door No. 2? Is it to your"+
    " advantage to switch your choice ?";

    document.getElementById("mainTitleSection").innerHTML = "<b>The History of the Monty Hall Problem</b>";

    document.getElementById("buttonHistory").setAttribute("hidden","hidden");

    document.getElementById("buttonHowToPlay").removeAttribute("hidden");
}

function simulateGame() {
    var switchDoor;
    var timesPlayed = document.getElementById("amountTimesToRun").value;

    var timesSwitched = document.getElementById("amountTimesToSwitch").value;

    document.getElementById("simulateInfo").innerHTML = "Enter how many times would you like to simulate the game in the textbox below.";

    document.getElementById("amountTimesToSwitch").setAttribute("hidden", "hidden");
    document.getElementById("continueSimulation").setAttribute("hidden", "hidden");
    //reveal new input and continue
    document.getElementById("simulateRunButton").removeAttribute("hidden");
    document.getElementById("amountTimesToRun").removeAttribute("hidden");

    switchDoor = isKept;
    for (var i = 0; i < timesPlayed; i++) {
        //playAgain();
        carLocation = Math.floor(Math.random() * 3);
        var userChoice = Math.floor(Math.random() * 3);
        var revealGoat = carLocation;

        while (revealGoat == carLocation || revealGoat == userChoice) {
            revealGoat = Math.floor(Math.random() * 3);
        }

        if (i < timesSwitched) {

            // if (switchDoor == 1) {
            var remainderDoor = 5;
            remainderDoor = remainderDoor - (userChoice + 1);
            remainderDoor = remainderDoor - (revealGoat + 1);
            userChoice = remainderDoor;
            // }
            updateStats(userChoice, true);
        } else {
            updateStats(userChoice, false);
        }

        if (i == 0) {
            document.getElementById("door0").src = doorImg;
            document.getElementById("door1").src = doorImg;
            document.getElementById("door2").src = doorImg;
            document.getElementById("door0").removeAttribute("onclick");
            document.getElementById("door1").removeAttribute("onclick");
            document.getElementById("door2").removeAttribute("onclick");
        }

        if (i == timesPlayed - 1) {
            if (carLocation == 0)
                document.getElementById("door0").src = carImg;
            else
                document.getElementById("door0").src = goatImg;

            if (carLocation == 1)
                document.getElementById("door1").src = carImg;
            else
                document.getElementById("door1").src = goatImg;

            if (carLocation == 2)
                document.getElementById("door2").src = carImg;
            else
                document.getElementById("door2").src = goatImg;
        }
    }//end of for loop

    printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoorWon, keptDoorLost);
}//end of simulate game


function resetStats() {
    gamesPlayed = 0;
    gamesWon = 0;
    gamesLost = 0;
    keptDoorWon = 0;
    switchDoors = 0;
    switchDoorGames = 0;
    keptDoorsGames = 0;
    keptDoorLost = 0;
    switchDoorLost = 0;

    document.getElementById("door0").src = doorImg;
    document.getElementById("door1").src = doorImg;
    document.getElementById("door2").src = doorImg;

    playAgain();
    printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoorWon, keptDoorLost);

}

function printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoorWon, keptDoorLost) {

    document.getElementById("gamesPlayed").innerHTML = "Total Games Played: " + gamesPlayed;
    if (gamesWon != 0)
        document.getElementById("gamesWon").innerHTML = "Total Games Won: " + gamesWon + " (" + (((1.0 * gamesWon) / gamesPlayed) * 100).toFixed(2) + "%)";
    else
        document.getElementById("gamesWon").innerHTML = "Total Games Won: " + gamesWon + " (0%)";

    if (gamesLost != 0)
        document.getElementById("gamesLost").innerHTML = "Total Games Lost: " + gamesLost + " (" + (((1.0 * gamesLost) / gamesPlayed) * 100).toFixed(2) + "%)";
    else
        document.getElementById("gamesLost").innerHTML = "Total Games Lost: " + gamesLost + " (0%)";




    document.getElementById("switchDoorsGames").innerHTML = "Total games where switched door: " + switchDoorGames;

    if (switchDoors != 0)
        document.getElementById("switchDoorsWon").innerHTML = "Switched doors and won: " + switchDoors + " (" + (((1.0 * switchDoors) / switchDoorGames) * 100).toFixed(2) + "%)";
    else
        document.getElementById("switchDoorsWon").innerHTML = "Switched doors and won: " + switchDoors + " (0%)";

    if (switchDoorLost != 0)
        document.getElementById("switchDoorsLose").innerHTML = "Switched doors and lost: " + switchDoorLost + " (" + (((1.0 * switchDoorLost) / switchDoorGames) * 100).toFixed(2) + "%)";
    else
        document.getElementById("switchDoorsLose").innerHTML = "Switched doors and lost: " + switchDoorLost + " (0%)";




    document.getElementById("keptDoorsGames").innerHTML = "Total Games where kept door: " + keptDoorsGames;
    if (keptDoorWon != 0)
        document.getElementById("keptDoorsWon").innerHTML = "Kept doors and won: " + keptDoorWon + " (" + (((1.0 * keptDoorWon) / keptDoorsGames) * 100).toFixed(2) + "%)";
    else
        document.getElementById("keptDoorsWon").innerHTML = "Kept doors and won: " + keptDoorWon + " (0%)";

    if (keptDoorLost != 0)
        document.getElementById("keptDoorsLose").innerHTML = "Kept doors and lost: " + keptDoorLost + " (" + (((1.0 * keptDoorLost) / keptDoorsGames) * 100).toFixed(2) + "%)";
    else
        document.getElementById("keptDoorsLose").innerHTML = "Kept doors and lost: " + keptDoorLost + " (0%)";
}//end print stats
