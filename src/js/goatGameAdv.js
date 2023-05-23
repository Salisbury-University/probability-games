let carImg = "../images/iceCream.png";
let goatImg = "../images/aspargus.png";
let doorImg1 = "../images/doorImg1.png";
let doorImg2 = "../images/doorImg2.png";
let doorImg3 = "../images/doorImg3.png";
let doorImgPaths = ["../images/doorImg1.png", "../images/doorImg2.png", "../images/doorImg3.png"];

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
var doorOpenSound = new Audio('../sounds/dooropening.mp3');
var correctSound = new Audio('../sounds/yay.mp3');
var wrongSound = new Audio('../sounds/boo.mp3');
let prizeName = "Desert";
let trashName = "vegetables";

function changePrize(img) {
    //define objects and map img location,name to value being searched
    const prizes = {
        iceCream: ["../images/iceCream.png", "Ice Cream"],
        Toy: ["../images/toy.png", "Rubik's Cube"],
        Money: ["../images/nickelHead.png", "Coin"]
    };
    //asign carImg to first in array, and name to second
    [carImg, prizeName] = prizes[img];
    document.getElementById("prizeSelectorDropDown").innerHTML = prizeName;
    playAgain();
}

function changeTrash(img) {
    //define objects and map img location,name to value being searched
    const trashes = {
        vegetable: ["../images/aspargus.png", "Vegetables"],
        Trash: ["../images/trashBag.jpg", "Trash"],
        Chores: ["../images/chores.jpg", "Chores"]
    };
    //asign goatImg to first in array, and name to second
    [goatImg, trashName] = trashes[img];
    document.getElementById("trashSelectorDropDown").innerHTML = trashName;
    playAgain();
}


function resetStats() {
    const initialStats = {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        keptDoorWon: 0,
        switchDoors: 0,
        switchDoorGames: 0,
        keptDoorsGames: 0,
        keptDoorLost: 0,
        switchDoorLost: 0
    };

    for (let key in initialStats) {
        window[key] = initialStats[key];
    }

    document.getElementById("amountTimesToRun").value = "";
    document.getElementById("amountTimesToSwitch").value = "";
    playAgain();
    printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoorWon, keptDoorLost);
}

function playAgain() {
    Doors = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
        document.getElementById(`door${i}`).style.borderRadius = "0%";
        document.getElementById(`door${i}`).src = doorImgPaths[i];
        document.getElementById(`door${i}`).style.boxShadow = "none";
        document.getElementById(`doorWay${i}`).hidden = true;
    }

    carLocation = Math.floor(Math.random() * 3);
    Doors[carLocation] = 1;
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


    doorOpenSound.loop = false;
    doorOpenSound.play();
    document.getElementById("playAgainButton").removeAttribute("hidden");
}

function determineKeepSimulation(number) {
    if (number == 0)
        isKept = true;
    else
        isKept = false;
    simulateGame();
}

//do better comments
function updateStats(x, isKept) {
    gamesPlayed++;
    //adds 1 if x == carLocation otherwise add 0
    gamesWon += (x == carLocation) ? 1 : 0;
    gamesLost += (x != carLocation) ? 1 : 0;
    switchDoors += (x == carLocation && isKept) ? 1 : 0;
    keptDoorWon += (x == carLocation && !isKept) ? 1 : 0;
    switchDoorLost += (x != carLocation && isKept) ? 1 : 0;
    keptDoorLost += (x != carLocation && !isKept) ? 1 : 0;

    if (isKept)
        switchDoorGames++;
    else
        keptDoorsGames++;
} //end of update stats

function simulateGame() {
    var switchDoor;

    var timesPlayed = parseInt(document.getElementById("amountTimesToRun").value);

    var timesSwitched = parseInt(document.getElementById("amountTimesToSwitch").value);

    if (timesPlayed < timesSwitched) {
        alert("You cannot enter more times to switch then the total games played!");
    } else if (isNaN(timesPlayed)) {
        alert("You must enter a value greater then 0");
    } else if (timesPlayed < 10 || timesPlayed > 1000000) {
        alert("You must enter between 10 and 1,000,000 games.");
    } else {
        switchDoor = isKept;
        for (var i = 0; i < timesPlayed; i++) {
            carLocation = Math.floor(Math.random() * 3);
            var userChoice = Math.floor(Math.random() * 3);
            var revealGoat = carLocation;

            while (revealGoat == carLocation || revealGoat == userChoice) {
                revealGoat = Math.floor(Math.random() * 3);
            }

            if (i < timesSwitched) {
                var remainderDoor = 5;
                remainderDoor = remainderDoor - (userChoice + 1);
                remainderDoor = remainderDoor - (revealGoat + 1);
                userChoice = remainderDoor;
                updateStats(userChoice, true);
            } else {
                updateStats(userChoice, false);
            }
        }//end of for loop
        runVisualGame();
        printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoorWon, keptDoorLost);
    }
}//end of simulate game

function runVisualGame(iteration = 0) {
    document.getElementById("continueSimulation").disabled = true;
    if (iteration == 3) {
        document.getElementById("continueSimulation").disabled = false;
        return;
    }

    let nonWinningDoor = Math.floor(Math.random() * 3);

    while (Doors[nonWinningDoor] == 1) {
        nonWinningDoor = Math.floor(Math.random() * 3);
    }

    setTimeout(function () {
        document.getElementById(`door${nonWinningDoor}`).src = goatImg;
        document.getElementById(`doorWay${nonWinningDoor}`).hidden = false;
    }, 150);

    //take quarter break all doors results
    setTimeout(function () {
        for (let j = 0; j < 3; j++) {
            if (Doors[j] == 1) {
                document.getElementById(`door${j}`).src = carImg;
                document.getElementById(`doorWay${j}`).hidden = false;
            } else {
                document.getElementById(`door${j}`).src = goatImg;
                document.getElementById(`doorWay${j}`).hidden = false;
            }
        }
    }, 300);

    //take half break to reset doors
    setTimeout(function () {
        if (iteration != 2) {
            playAgain();
        }
        runVisualGame(iteration + 1);
    }, 500);
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

//change theme areas
function changeTheme() {
    if (document.getElementById("themeTypeSwitch").checked) {
        changeDarkTheme();
    } else {
        changeLightTheme();
    }
}

function changeDarkTheme() {
    //changes top section to dark and text to white
    let div = document.querySelectorAll("#sectionAforTheme");
    div.forEach(d => {
        d.style.backgroundColor = "#313b4b";
        d.style.color = "white";
    });

    let div2 = document.querySelectorAll("#sectionBforTheme");
    div2.forEach(d => {
        d.style.backgroundColor = "#262626";
        d.style.color = "white";
    });

    document.body.style.backgroundColor = "#313b4b";

    let menu = document.querySelectorAll(".menu");
    let text = document.querySelectorAll(".text");

    for (let i = 0; i < text.length; i++) {
        text[i].style.color = 'white';
    }
    for (let i = 0; i < menu.length; i++) {
        menu[i].style.backgroundColor = "#343a40";
    }

    sessionStorage.setItem("theme", "dark");
}

function changeLightTheme() {

    let div = document.querySelectorAll("#sectionAforTheme");
    div.forEach(d => {
        d.style.backgroundColor = "#FFEDC9";
        d.style.color = "black";
    });


    let div2 = document.querySelectorAll("#sectionBforTheme");
    div2.forEach(d => {
        d.style.backgroundColor = "#ffd789";
        d.style.color = "black";
    });

    document.body.style.backgroundColor = "#FFEDC9";

    let menu = document.querySelectorAll(".menu");
    let text = document.querySelectorAll(".text");

    for (let i = 0; i < text.length; i++) {
        text[i].style.color = 'black';
    }
    for (let i = 0; i < menu.length; i++) {
        menu[i].style.backgroundColor = "#ffffff";
    }

    sessionStorage.setItem("theme", "light");
}


//sound
wrongSound.volume = 0.5;
correctSound.volume = 0.5;
doorOpenSound.volume = 0.5;

window.onload = function () {
    let volume = document.getElementById("volume-control");
    let theme = sessionStorage.getItem("theme");
    if (theme == "dark") {
        document.getElementById("themeTypeSwitch").checked = true;
        changeDarkTheme();
    }
    volume.addEventListener("input", function (e) {
        wrongSound.volume = e.currentTarget.value / 100;
        correctSound.volume = e.currentTarget.value / 100;
        doorOpenSound.volume = e.currentTarget.value / 100;
    });
};


document.getElementById("disableSound").addEventListener("click", function () {
    if (this.checked) {
        wrongSound.muted = true;
        correctSound.muted = true;
        doorOpenSound.muted = true;
        // Do something when checkbox is checked
    } else {
        wrongSound.muted = false;
        correctSound.muted = true;
        doorOpenSound.muted = true;
        // Do something when checkbox is unchecked
    }
});