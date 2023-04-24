let carImg = "../images/iceCream.png";
let goatImg = "../images/aspargus.png";
let doorImg1 = "../images/ClosedDoor1.png";
let doorImg2 = "../images/ClosedDoor2.png";
let doorImg3 = "../images/ClosedDoor3.png";
let doorImgPaths = ["../images/ClosedDoor1.png", "../images/ClosedDoor2.png", "../images/ClosedDoor3.png"];

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
        Toy: ["../images/toy.jpg", "Legos"],
        Money: ["../images/nickelHead.png", "Money"]
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

    playAgain();
    printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoorWon, keptDoorLost);
}

function playAgain() {
    Doors = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
        document.getElementById(`door${i}`).style.borderRadius = "0%";
        //let d = `doorImg${i+1}`;
        document.getElementById(`door${i}`).src = doorImgPaths[i];
        // console.log(`doorImg${i+1}`);
        document.getElementById(`door${i}`).style.boxShadow = "none";
        document.getElementById(`door${i}`).setAttribute("onclick", `stepOne(${i})`);
    }

    carLocation = Math.floor(Math.random() * 3);
    Doors[carLocation] = 1;

    document.getElementById("titleSentence").innerHTML = "Welcome to Monty Hall's Problem!";
    document.getElementById("firstSentenceID").innerHTML = `There are <b>three</b> doors in front of you. There are <b>two</b> ${trashName}, and <b> one</b> ${prizeName} <br> Select A Door!`;
    document.getElementById("playAgainButton").setAttribute("hidden", "hidden");
}

function showStats() {
    document.getElementById("stageSectionID").setAttribute("hidden", "hidden");
    document.getElementById("statShow&Hide").removeAttribute("hidden");
    document.getElementById("showStatsButton").setAttribute("hidden", "hidden");
    document.getElementById("hideStatsButton").removeAttribute("hidden");
    document.getElementById("overlay").style.display = "block";
}

function hideStats() {
    document.getElementById("stageSectionID").removeAttribute("hidden");
    document.getElementById("statShow&Hide").setAttribute("hidden", "hidden");
    document.getElementById("hideStatsButton").setAttribute("hidden", "hidden");
    document.getElementById("showStatsButton").removeAttribute("hidden");
    document.getElementById("overlay").style.display = "none";
}

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
    var OGdoorChoice = "door" + doorChose;

    //document.getElementById(goatDoor).removeAttribute("onclick");
    document.getElementById(switchDoorLoc).removeAttribute("onclick");

    document.getElementById("door" + doorChose).style.boxShadow = "0 0 100px greenyellow";

    //please click door when goat is located
    document.getElementById("titleSentence").innerHTML = " You chose Door " + (globalDoorChose + 1) + " <br>One " + trashName + " is located at Door " + (revealGoat + 1) + "!"
    document.getElementById("firstSentenceID").innerHTML = "Can you click on Door " + (revealGoat + 1) + "?";
    document.getElementById(goatDoor).removeAttribute("onclick");
    document.getElementById(OGdoorChoice).removeAttribute("onclick");
    document.getElementById(goatDoor).setAttribute("onclick", "afterStepOne(" + revealGoat + ")");

}

function afterStepOne(revealGoat) {
    //doorOpenSound.loop = false;
    doorOpenSound.play();
    var go = "door" + revealGoat;
    var userDoor = "door" + globalDoorChose;

    document.getElementById(go).removeAttribute("onclick");
    document.getElementById(userDoor).removeAttribute("onclick");

    setTimeout(function () {

        document.getElementById(go).src = goatImg;

        if (revealGoat == 0)
            document.getElementById("door0").style.borderRadius = "99%";
        else if (revealGoat == 1)
            document.getElementById("door1").style.borderRadius = "99%";
        else
            document.getElementById("door2").style.borderRadius = "99%";

        document.getElementById("titleSentence").innerHTML = "Great Job! <br> Now Make a Choice!"
        document.getElementById("firstSentenceID").innerHTML = "There is now one " + trashName + " and one " + prizeName + " left! <br> If you want to keep the Door you chose, then click on <b>Door "
            + (globalDoorChose + 1) + ". </b><br> Otherwise click on <b>Door " + (doorChoice + 1) + " </b>to switch doors!";

        //remove onclick for other two doors
        let totalDoor = 5;
        totalDoor -= revealGoat + 1;
        totalDoor -= globalDoorChose + 1;

        var otherDoor = "door" + totalDoor;
        var userDoor = "door" + globalDoorChose;

        document.getElementById(otherDoor).setAttribute("onclick", "determineKeep(0)");
        document.getElementById(userDoor).setAttribute("onclick", "determineKeep(1)");
    }, 250);
}

function secondIntermediate() {
    document.getElementById("titleSentence").innerHTML = "";
    setTimeout(finalFunction, 800);
}

//downsize here
function midStepTwo(imgType, userDoorChoice) {
    if (imgType == 1) {
        correctSound.loop = false;
        correctSound.play();

        document.getElementById(userDoorChoice).src = carImg;
        if (userDoorChoice == "door0")
            document.getElementById("door0").style.borderRadius = "99%";
        else if (userDoorChoice == "door1")
            document.getElementById("door1").style.borderRadius = "99%";
        else
            document.getElementById("door2").style.borderRadius = "99%";


    } else {
        wrongSound.loop = false;
        wrongSound.play();

        document.getElementById(userDoorChoice).src = goatImg;

        if (userDoorChoice == "door0")
            document.getElementById("door0").style.borderRadius = "99%";
        else if (userDoorChoice == "door1")
            document.getElementById("door1").style.borderRadius = "99%";
        else
            document.getElementById("door2").style.borderRadius = "99%";
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
        setTimeout(midStepTwo, 700, 1, userDoorChoice);
    } else {
        setTimeout(midStepTwo, 700, 2, userDoorChoice);
    }
    ///wait

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

    setTimeout(secondIntermediate, 700);
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

    for (let i = 0; i < 3; i++){
        document.getElementById(`door${i}`).style.borderRadius = "99%";
    }
    

    doorOpenSound.loop = false;
    doorOpenSound.play();
    document.getElementById("playAgainButton").removeAttribute("hidden");
}

function determineKeep(number) {
    if (number == 0)
        isKept = true;
    else
        isKept = false;

    stepTwo(isKept);
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



//these functions good -- rework simulateGame later
function changeToHowToPlay() {
    document.getElementById("mainInfoSection").innerHTML = "Below there are <b>three doors</b>, and there are <b>two vegetables</b> and"
        + " <b>one dessert</b> hidden behind the doors.  <br> You select <b>one door</b> and then <b>a vegetable</b> is revealed. " +
        " You are then given an option to either <b>keep your current door</b> or <b>switch to the other unopened door</b>. " +
        " After which the door you choose is revealed. <br> The purpose of this game is to help educate you on probability.";

    document.getElementById("mainTitleSection").innerHTML = "<b>This is how you play our game.</b>";


    document.getElementById("buttonHowToPlay").setAttribute("hidden", "hidden");

    document.getElementById("buttonHistory").removeAttribute("hidden");
}

function changeToHistory() {
    document.getElementById("mainInfoSection").innerHTML = "Monty Hall was a TV and radio host most famous for hosting the game " +
        "show Let's Make a Deal which he produced and hosted for many years.The Monty Hall Problem was named after him because of it " +
        "similarities with Let's Make a Deal.The problem was first posted and solved a letter by Steve Selvin to the American " +
        "Statistician in 1975. The original problem reading: Suppose you're on a game show, and you're given the choice of three" +
        " doors: Behind one door is a car; behind the others, goats.You pick a door, say No. 1, and the host, who knows what's behind " +
        "the doors, opens another door, say No. 3, which has a goat.He then says to you, Do you want to pick door No. 2? Is it to your" +
        " advantage to switch your choice ?";

    document.getElementById("mainTitleSection").innerHTML = "<b>The History of the Monty Hall Problem</b>";

    document.getElementById("buttonHistory").setAttribute("hidden", "hidden");

    document.getElementById("buttonHowToPlay").removeAttribute("hidden");
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
        console.log("called dark");
    } else {
        changeLightTheme();
        console.log("called light");
    }
}

function changeDarkTheme() {
    //changes top section to dark and text to white
    // document.getElementById("topPageSection").style.backgroundColor = "#313b4b";
    let div = document.querySelectorAll("#sectionAforTheme");
    div.forEach(d => {
        d.style.backgroundColor = "#313b4b";
        d.style.color = "white";
    });
    //document.getElementById("titleSection").style.color = "white";

    let div2 = document.querySelectorAll("#sectionBforTheme");
    div2.forEach(d => {
        d.style.backgroundColor = "#262626";
        d.style.color = "white";
    });
    //document.getElementById("bottomSection").style.backgroundColor = "#313b4b";
    //document.getElementById("bottomSection").style.color = "white";
    //document.body.style.backgroundColor = "#262626";

    document.body.style.backgroundColor = "#262626";
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

    document.body.style.backgroundColor = "#ffd789";
}


//sound
wrongSound.volume = 0.5;
correctSound.volume = 0.5;
doorOpenSound.volume = 0.5;

window.onload = function () {
    let volume = document.getElementById("volume-control");
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