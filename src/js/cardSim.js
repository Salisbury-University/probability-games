const MINRUNS = 1;
const MAXRUNS = 1000000;

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

function updateReqChips() {
  // get max chips
  let val = Number(document.getElementById("numChips").value);

  // check that max chips is a number
  if (!isNaN(val)) {
    // set global reqChips var
    simConf.set("reqChips", val);

    // update HTML elements
    updateRemainingChips(
      simConf.get("reqChips") - simConf.get("totalChipsPlaced")
    );
    updateSimulateButton();
  }
}

// update number of chips from chip distribution side
function updateChipsCount(ele) {
  // get card no
  let id = ele.id;
  let id_split = id.split("t"); // splits off number at end of id
  let cardNum = Number(id_split[1]); // gets number from split
  let tot = simConf.get("totalChipsPlaced");

  // get value from card
  let new_count = Number(document.getElementById(id).value);

  // make sure value is number
  if (!isNaN(new_count)) {
    // calculate new values
    tot -= simConf.get("chipsPlaced")[cardNum];
    tot += new_count;

    // update map value
    simConf.get("chipsPlaced")[cardNum] = new_count;
    simConf.set("totalChipsPlaced", tot);

    // update HTML elements
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
  ).innerHTML = `Reamining Chips: ${num}`;
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
  for (let i = 0; i < 11; i++) {
    document.getElementById(`count${i}`).disabled = true;
  }

  // create a simulation object
  // alter "results section to say Simulating... with a loading thingy"
  document.getElementById("middle_heading").innerHTML = "Simulating...";
  sim = new SumOfDiceSimulation(simConf);

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
  for (let i = 0; i < 11; i++) {
    document.getElementById(`count${i}`).disabled = false;
  }
  button.disabled = false;
}

function randomPlacement() {
  // clear chips
  for (let i = 0; i < 10; i++) {
    document.getElementById(`count${i}`).value = "";
    updateChipsCount(document.getElementById(`count${i}`));
  }

  //randomly place chips
  let chipsPlaced = 0;
  while (chipsPlaced < simConf.get("reqChips")) {
    // generate a random number of chips between 1 and reqChips - chipsPlaced (chip amount)
    let chipAmount = Math.ceil(
      Math.random() * (simConf.get("reqChips") - chipsPlaced)
    );

    // generate a random number between 0 and 10 (card index)
    let card = Math.floor(Math.random() * 10);

    //check if newChips is too large, and adjust it to be exactly right
    if (chipsPlaced + chipAmount > simConf.get("reqChips")) {
      chipAmount = simConf.get("reqChips") - chipsPlaced;
    }

    // add chips if values already exist in that box
    if (!isNaN(document.getElementById(`count${card}`).value)) {
      document.getElementById(`count${card}`).value =
        chipAmount + Number(document.getElementById(`count${card}`).value);
    } else {
      document.getElementById(`count${card}`).value = chipAmount;
    }

    updateChipsCount(document.getElementById(`count${card}`));

    //update number of chips placed
    chipsPlaced += chipAmount;
  }
}

// BROKEN
var drawn = false;
function updateDistChart() {
  anychart.onDocumentReady(function () {
    // set the data
    var data = {
      header: ["Name", "Number of Chips"],
      rows: [
        [2, simConf.get("chipsPlaced")[0]],
        [3, simConf.get("chipsPlaced")[1]],
        [4, simConf.get("chipsPlaced")[2]],
        [5, simConf.get("chipsPlaced")[3]],
        [6, simConf.get("chipsPlaced")[4]],
        [7, simConf.get("chipsPlaced")[5]],
        [8, simConf.get("chipsPlaced")[6]],
        [9, simConf.get("chipsPlaced")[7]],
        [10, simConf.get("chipsPlaced")[8]],
        [11, simConf.get("chipsPlaced")[9]],
        [12, simConf.get("chipsPlaced")[10]],
      ],
    };

    // create the chart
    var chart = anychart.column();

    // add the data
    chart.data(data);

    // draw
    if (drawn == false) {
      // set padding between column groups
      chart.barGroupsPadding(0);

      // set the chart title
      chart.title("Chip Distribution Across Cards");

      // specify container
      chart.container("chartContainer");

      // draw
      chart.draw();

      // raise flag
      drawn = true;
    }
  });
}
