const MINRUNS = 1;
const MAXRUNS = 1000000;

function resizeScreen() {
  let oHeight = document.getElementById("mainBody").offsetHeight;
  let sHeight = document.body.scrollHeight;

  document.getElementById("mainBody").style.zoom = (oHeight / sHeight) * 0.9;
  document.getElementById("mainBody").style.zoom = (oHeight / sHeight) * 0.9;

  loadTheme();
}

function loadTheme() {
  let theme = sessionStorage.getItem("theme");
  if (theme == "dark") {
    document.getElementById("themeTypeSwitch").checked = true;
    changeTheme();
  }
}

var gameLog = [];

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

const distributions = new Map(); // array which holds the saved distributions
let chartedDistributions = []; // array which holds the distributions in the chart
var distCounter = 0;

const stats = new Map();
stats.set("averages", []);
stats.set("mins", []);
stats.set("maxes", []);

function updateSimulateButton() {
  if (
    simConf.get("totalChipsPlaced") == simConf.get("reqChips") &&
    data.includes(0)
  ) {
    document.getElementById("simBtn").disabled = false;
    document.getElementById("saveButton").disabled = false;
    document.getElementById("infoText").innerHTML = "Ready to Simulate!";
  } else {
    document.getElementById("simBtn").disabled = true;
    document.getElementById("saveButton").disabled = true;

    // which incomplete message to show them
    if (!data.includes(0)) {
      document.getElementById("infoText").innerHTML =
        "Table and chart are full! Clear stats to continue simulating.";
    } else {
      document.getElementById("infoText").innerHTML =
        "Finish Placing all 10 chips to run a simulation.";
    }
  }

  // also update card highlighting for cards that do/don't have chips on them
  updateCardColors();
}

function updateCardColors() {
  for (let i = 0; i < 11; i++) {
    if (simConf.get("chipsPlaced")[i] > 0) {
      document.getElementById(`card${i + 2}`).classList.remove("bg-secondary");
      document.getElementById(`card${i + 2}`).classList.add("bg-success");
    } else if (
      document.getElementById(`card${i + 2}`).classList.contains("bg-success")
    ) {
      document.getElementById(`card${i + 2}`).classList.remove("bg-success");
      document.getElementById(`card${i + 2}`).classList.add("bg-secondary");
    }
  }
}

function removeChips(ele) {
  let cardNo = Number(ele.parentElement.parentElement.id.split("d")[1]) - 2;
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
  let cardNo = Number(ele.parentElement.parentElement.id.split("d")[1]) - 2;
  let numChips = Number(ele.innerHTML.split("+")[1]);

  // update the card
  currChips = simConf.get("chipsPlaced")[cardNo];

  // if the total is still in range, add chips
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

function clearChips() {
  for (let i = 0; i < 10; i++) {
    document.getElementById(`card${i + 2}label`).innerHTML = "0";
    simConf.get("chipsPlaced")[i] = 0;
  }
  simConf.set("totalChipsPlaced", 0);
  updateRemainingChips(10);
  updateSimulateButton();
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
    document.getElementById("invRunsText").hidden = true;
  } else {
    document.getElementById("invRunsText").hidden = false;
    document.getElementById(
      "invRunsText"
    ).innerHTML = `Number must be between ${MINRUNS} and ${MAXRUNS}`;
  }
}

// when simualte button is pressed
var barCount = 0;
function simulate() {
  let button = document.getElementById("simBtn");
  button.disabled = true;
  // disable buttons

  // create a simulation object
  // alter "results section to say Simulating... with a loading thingy"
  sim = new SumOfDiceSimulation(simConf);
  updateLogs(
    sim.getMinRolls(),
    sim.getMaxRolls(),
    sim.getAverageRolls(),
    sim.getTotalRolls()
  );

  // append the stats based on the simulation
  data[barCount] = sim.getAverageRolls();
  barCount += 1;

  // delete the sim object
  sim = null;

  // update chart
  updateChart();

  //update array linked to each bar in the chart
  let temp = [];
  for (let i = 0; i < 11; i++) {
    temp[i] = simConf.get("chipsPlaced")[i];
  }

  // track distributions in the chart
  chartedDistributions.push(temp);

  // re-enable all the html elments
  button.disabled = false;
  updateSimulateButton();
}

function switchDistribution(ele) {
  let dropdown = document.getElementById("distDropdown");

  let originalDist = dropdown.innerHTML;
  let newDist = ele.innerHTML;

  dropdown.innerHTML = newDist;
  ele.innerHTML = originalDist;

  if (Number(newDist.split(" ")[1]) == 0) {
    document.getElementById("saveButton").innerHTML = "Save Distribution";
  } else {
    document.getElementById("saveButton").innerHTML = `Overwrite Distribution`;
  }

  loadDistribution(newDist);
}

// load a distribution from the distributions map, add it so that delete button updates
function loadDistribution(html) {
  let distNo = Number(html.split(" ")[1]);

  // don't load a new [undefined] distribution
  if (!isNaN(distNo)) {
    let dist = distributions.get(`Distribution${distNo}`);

    for (let i = 0; i < 11; i++) {
      // set the inner HTML for each card, then call the addChips function
      document.getElementById(`card${i + 2}label`).innerHTML = dist[i];

      // actually update the internal counter
      simConf.get("chipsPlaced")[i] = dist[i];
    }
    simConf.set("totalChipsPlaced", 10);
    updateRemainingChips(0);
    updateSimulateButton();
    document.getElementById("delButton").disabled = false;
  } else {
    document.getElementById("delButton").disabled = true;
    document.getElementById("saveButton").innerHTML = "Save New Distribution";
  }
}

// save a distribution to the distributions map
function saveDistribution() {
  let dropdown = document.getElementById("distDropdown");
  let distName = dropdown.innerHTML.replace(/\s/g, "");

  // if creating a new distribution
  if (distName == "DistributionSelection") {
    // save preset
    distName = `Distribution${distCounter + 1}`;

    // this line breaks things
    distributions.set(distName, new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

    for (let i = 0; i < 11; i++) {
      distributions.get(distName)[i] = simConf.get("chipsPlaced")[i];
    }

    // add html
    dropdownList = document.getElementById("dropdownList");

    // create new Distribution HTML with the stuff
    newDistribution = document.createElement("li");
    newDistribution.innerHTML = `<p class="dropdown-item" id="d${
      distCounter + 1
    }" onclick="switchDistribution(this);">Distribution ${
      distCounter + 1
    }</p> `;

    // add new distribution to the list
    dropdownList.appendChild(newDistribution);

    //update distribution counter
    distCounter += 1;
  } else {
    // overwrite an existing distribution
    let distNum = distName.split("t")[1];

    // reset the distribution
    for (let i = 0; i < 11; i++) {
      distributions.get(distName)[i] = simConf.get("chipsPlaced")[i];
    }
  }

  // add a message 'distribution saved as preset #'
}

// delete one of the saved distributions
function deleteDistribution() {
  // get current distribution
  distNo = Number(
    document.getElementById("distDropdown").innerHTML.split(" ")[1]
  );

  // remove it from array, and decrement counter
  if (distNo != 0) {
    document.getElementById(`d${distNo}`).remove();
    // update dropdown innerHTML
    document.getElementById("distDropdown").innerHTML =
      "Distribution Selection";
  }
  document.getElementById("delButton").disabled = true;
  document.getElementById("saveButton").innerHTML = "Save New Distribution";
  // disable delete button
}

// randomly place chips on the cards
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

// add simulation data to log table
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
  let newRowContent = `
      <td class="table-cell themeable">${barCount + 1}</td>\n
      <td class="table-cell themeable">${gameLog[lastIdx][0]}</td>\n
      <td class="table-cell themeable">${gameLog[lastIdx][1]}</td>\n
      <td class="table-cell themeable">${gameLog[lastIdx][2]}</td>\n
      <td class="table-cell themeable">${gameLog[lastIdx][3]}</td>\n
      <td class="table-cell themeable">${simConf.get("numRuns")}</td>\n
      <td class="table-cell themeable">${distStr}</td>\n
  `;

  let tableRef = document
    .getElementById("rollDataTable")
    .getElementsByTagName("tbody")[0];

  // 0 index is front, -1 is end
  let newRow = tableRef.insertRow(-1);
  newRow.innerHTML = newRowContent;

  if (document.getElementById("themeTypeSwitch").checked) {
    document
      .querySelectorAll("td")
      .forEach((ele) => ele.classList.add("text-white"));
  }
}

// clear table
function clearTable() {
  let table = document
    .getElementById("rollDataTable")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
}

var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// clear chart and underlying storage
function clearChart() {
  data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  barCount = 0;

  // clear array
  chartedDistributions = [];
  updateChart();
}

function clearStats() {
  clearTable();
  clearChart();
  updateSimulateButton();
}

// in order to update the chart, maintain the array in the order
// that you want the bars to appear, i.e. add new averges to the end
function updateChart() {
  // set the dimensions of the chart
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // select the SVG element
  const svg = d3.select("svg");

  // remove any existing chart elements
  svg.selectAll("*").remove();

  // create the chart container
  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create the X and Y scales
  const x = d3
    .scaleBand()
    .domain(data.map((d, i) => i + 1))
    .range([0, width])
    .padding(0.1);

  let ymax = d3.max(data);

  const y = d3
    .scaleLinear()
    .domain([0, ymax > 0 ? ymax : 1])
    .range([height, 0]);

  // create the X and Y axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  // add the X and Y axes to the chart
  chart.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
  chart.append("g").call(yAxis);

  // create the bars
  chart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => x(i + 1))
    .attr("y", (d) => y(d))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d))
    .attr("fill", "#6495ED")
    .on("mouseover", function () {
      d3.select(this).transition().duration("50").attr("opacity", ".85");
      let xIdx = Math.floor(d3.select(this).attr("x") / 43.5);
      let div = document.getElementById("hoverDistribution");

      // fill div with highlighted distribution
      div.hidden = false;
      document.getElementById("hoverLabel").hidden = false;

      let str = "[ ";

      // this is in the opposite order
      for (let i = 0; i < 11; i++) {
        str += `${chartedDistributions[xIdx][i]} `;
      }

      str += "]";

      div.innerHTML = str;
    })
    .on("click", function () {
      // clicking on a bar fills out the cards with that distribution
      let xIdx = Math.floor(d3.select(this).attr("x") / 43.5);

      // don't load a new [undefined] distribution
      if (chartedDistributions.length > 0) {
        for (let i = 0; i < 11; i++) {
          // set the inner HTML for each card, then call the addChips function
          document.getElementById(`card${i + 2}label`).innerHTML =
            chartedDistributions[xIdx][i];

          // actually update the internal counter
          simConf.get("chipsPlaced")[i] = chartedDistributions[xIdx][i];
        }
        simConf.set("totalChipsPlaced", 10);
        updateRemainingChips(0);
        updateSimulateButton();
      }
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration("50").attr("opacity", "1");
      let div = document.getElementById("hoverDistribution");

      // replace array with blank thingy
      let str = "[";
      for (let i = 0; i < 11; i++) {
        str += "- ";
      }
      str += "]";
      div.innerHTML = str;
      div.hidden = true;
      document.getElementById("hoverLabel").hidden = true;
    });

  // create the label
  chart
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .text("Simulation Number");
  chart
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 13)
    .attr("transform", `rotate(-90)`)
    .text("Average Rolls");

  if (!document.getElementById("themeTypeSwitch").checked) {
    chart.selectAll("text").attr("fill", "#000000");
  } else {
    chart.selectAll("text").attr("fill", "#ffffff");
  }
}

// add the local storage thingy to this, and add the onload function
function changeTheme() {
  if (!document.getElementById("themeTypeSwitch").checked) {
    document.body.style.backgroundColor = "#ffffff";
    document
      .querySelectorAll(".themeable")
      .forEach((el) => el.classList.remove("text-white"));
    document
      .querySelectorAll(".modal-content, .list-group-item")
      .forEach((el) => el.classList.remove("bg-dark"));
    updateChart();
    sessionStorage.setItem("theme", "light");

    // change to Dark Mode
  } else if (document.getElementById("themeTypeSwitch").checked) {
    document.body.style.backgroundColor = "#434445";
    document
      .querySelectorAll(".themeable")
      .forEach((el) => el.classList.add("text-white"));
    document
      .querySelectorAll(".modal-content, .list-group-item-action")
      .forEach((el) => el.classList.add("bg-dark"));
    updateChart();

    sessionStorage.setItem("theme", "dark");
  }
}
