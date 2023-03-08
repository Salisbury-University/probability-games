// TODO
// Add "Save Distributions" Button
// Add cards with +1,2,5 buttons
// Add clear cards button
// Move cards to bottom

const MINRUNS = 1;
const MAXRUNS = 1000000;

var gameLog = [];
var presets = [];

class SumOfDiceSimulation {
  constructor(confMap) {
    // make sure chip dist and numchips matches up
    this.chipDist = confMap.get("chipsPlaced");
    this.numRuns = confMap.get("numRuns");
    this.chipsPerRun = confMap.get("reqChips");
    this.rolls = new Array(this.numRuns);
    for (let i = 0; i < this.numRuns; i++) {
      this.rolls[i] = 0;
    }
    this.maxRolls = 0;
    this.minRolls = 0;
    this.totalRolls = 0;
    this.averageRolls = 0;
    this.medianRolls = 0;
    this.simulate();
  }

  simulate() {
    let die1, die2;

    // play the game numRuns times
    for (let gameNo = 0; gameNo < this.numRuns; gameNo++) {
      let chipsRemoved = 0;

      let tempDist = this.chipDist.slice();

      //  keep rolling the dice, and tracking the number of rolls, until the game is done
      while (chipsRemoved != this.chipsPerRun) {
        die1 = Math.floor(Math.random() * 6) + 1;
        die2 = Math.floor(Math.random() * 6) + 1;
        this.rolls[gameNo] += 1; // add a roll to the game

        if (tempDist[die1 + die2 - 2] > 0) {
          tempDist[die1 + die2 - 2] -= 1;
          chipsRemoved += 1;
        }
      }
      if (this.rolls[gameNo] > this.maxRolls) {
        this.maxRolls = this.rolls[gameNo];
      }
      if (this.rolls[gameNo] < this.minRolls || gameNo == 0) {
        this.minRolls = this.rolls[gameNo];
      }

      this.totalRolls += this.rolls[gameNo];
    }
    this.averageRolls = this.totalRolls / this.numRuns;
    // after the game is played, updated the numbe
  }

  getMaxRolls() {
    return this.maxRolls;
  }

  getMinRolls() {
    return this.minRolls;
  }
  getTotalRolls() {
    return this.totalRolls;
  }
  getAverageRolls() {
    return this.averageRolls;
  }
  getMedianRolls() {
    return this.medianRolls;
  }
}

// simulation configuration options stored in global map
const simConf = new Map();
simConf.set("chipsPlaced", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
simConf.set("totalChipsPlaced", 0);
simConf.set("reqChips", 10);
simConf.set("numRuns", 100);

function updateSimulateButton() {
  if (simConf.get("totalChipsPlaced") == simConf.get("reqChips")) {
    document.getElementById("simBtn").disabled = false;
    // updateDistChart();
  } else {
    document.getElementById("simBtn").disabled = true;
  }
}

function removeChips(ele) {
  let cardNo = Number(ele.parentElement.id.split("d")[1]) - 2;
  let numChips = Number(ele.innerHTML.split("-")[1]);

  currChips = simConf.get("chipsPlaced")[cardNo];
  if (currChips - numChips >= 0) {
    simConf.get("chipsPlaced")[cardNo] = currChips - numChips;

    tot = simConf.get("totalChipsPlaced");
    tot -= numChips;
    simConf.set("totalChipsPlaced", tot);

    document.getElementById(`card${cardNo + 2}label`).innerHTML =
      currChips - numChips;

    updateRemainingChips(
      simConf.get("reqChips") - simConf.get("totalChipsPlaced")
    );
    updateSimulateButton();
  }
}

function addChips(ele) {
  let cardNo = Number(ele.parentElement.id.split("d")[1]) - 2;
  let numChips = Number(ele.innerHTML.charAt(1));

  // update the card
  currChips = simConf.get("chipsPlaced")[cardNo];
  if (simConf.get("totalChipsPlaced") + numChips <= 10) {
    simConf.get("chipsPlaced")[cardNo] = currChips + numChips;

    // update the totals
    tot = simConf.get("totalChipsPlaced");
    tot += numChips;
    simConf.set("totalChipsPlaced", tot);

    document.getElementById(`card${cardNo + 2}label`).innerHTML =
      currChips + numChips;

    updateRemainingChips(
      simConf.get("reqChips") - simConf.get("totalChipsPlaced")
    );
    updateSimulateButton();
  }
}

// updates the remaining chips label
function updateRemainingChips(num) {
  document.getElementById(
    "RemainingChipsLabel"
  ).innerHTML = `Remaining Chips: ${num}`;
}

// update the number of runs
function updateRuns(ele) {
  let id = ele.id;
  let runs = Number(document.getElementById(id).value);
  if (runs >= MINRUNS && runs <= MAXRUNS) {
    simConf.set("numRuns", runs);
  }
}

// when simualte button is pressed
function simulate() {
  let button = document.getElementById("simBtn");
  button.disabled = true;
  // disable buttons

  // create a simulation object
  // alter "results section to say Simulating... with a loading thingy"
  document.getElementById("middle_heading").innerHTML = "Simulating...";
  sim = new SumOfDiceSimulation(simConf);
  updateLogs(
    sim.getMinRolls(),
    sim.getMaxRolls(),
    sim.getAverageRolls(),
    sim.getTotalRolls()
  );

  // after the game is simulated, alter corresponding HTML elements
  document.getElementById("mean_label").innerHTML =
    "Mean Rolls: " + sim.getAverageRolls();
  document.getElementById("max_label").innerHTML =
    "Max Rolls: " + sim.getMaxRolls();
  document.getElementById("min_label").innerHTML =
    "Min Rolls: " + sim.getMinRolls();
  document.getElementById("total_label").innerHTML =
    "Total Rolls: " + sim.getTotalRolls();
  document.getElementById("middle_heading").innerHTML = "Results";
  // delete the sim object
  delete sim;

  // re-enable all the html elments
  button.disabled = false;
}

function randomPlacement() {
  // clear chips
  for (let i = 2; i < 13; i++) {
    document.getElementById(`card${i}label`).innerHTML = "0";
    simConf.get("chipsPlaced")[i - 2] = 0;
  }

  //randomly place chips
  let chipsPlaced = 0;
  while (chipsPlaced < simConf.get("reqChips")) {
    // generate a random number of chips between 1 and reqChips - chipsPlaced (chip amount)
    let chipAmount = Math.ceil(
      Math.random() * (simConf.get("reqChips") - chipsPlaced / 2)
    );

    // generate a random number between 0 and 10 (card index)
    let card = Math.floor(Math.random() * 10) + 2;

    //check if newChips is too large, and adjust it to be exactly right
    if (chipsPlaced + chipAmount > simConf.get("reqChips")) {
      chipAmount = simConf.get("reqChips") - chipsPlaced;
    }

    // add chips if values already exist in that box
    document.getElementById(`card${card}label`).innerHTML =
      chipAmount +
      Number(document.getElementById(`card${card}label`).innerHTML);

    simConf.get("chipsPlaced")[card - 2] = Number(
      document.getElementById(`card${card}label`).innerHTML
    );

    //update number of chips placed
    chipsPlaced += chipAmount;
  }
  simConf.set("totalChipsPlaced", 10);
  updateRemainingChips(0);
  updateSimulateButton();
}

function updateLogs(min, max, avg, tot) {
  lastIdx = gameLog.length - 1;
  gameLog[lastIdx] = new Array(4);
  gameLog[lastIdx][0] = min;
  gameLog[lastIdx][1] = max;
  gameLog[lastIdx][2] = avg;
  gameLog[lastIdx][3] = tot;

  // for loop putting the distribution into a string
  let distStr = "";
  for (let i = 0; i < 11; i++) {
    distStr += simConf.get("chipsPlaced")[i];
    distStr += " ";
  }

  // content to add
  let newRowContent = `<td>${gameLog[lastIdx][0]}</td>\n
      <td>${gameLog[lastIdx][1]}</td>\n
      <td>${gameLog[lastIdx][2]}</td>\n
      <td>${gameLog[lastIdx][3]}</td>\n
      <td>${simConf.get("numRuns")}</td>\n
      <td>${distStr}</td>\n
  `;

  let tableRef = document
    .getElementById("rollDataTable")
    .getElementsByTagName("tbody")[0];

  let newRow = tableRef.insertRow(tableRef.rows.length);
  newRow.innerHTML = newRowContent;
}

function clearTable() {
  let table = document
    .getElementById("rollDataTable")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
}
