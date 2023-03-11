class ProbabilitySimulator {
  constructor() {
    this.stats = [];
    this.totalRolls = 0;
    for (let i = 0; i < 28; i++) {
      this.stats[i] = 0;
    }
  }

  simulate(userInput) {
    if (userInput == "") {
      return;
    }
    for (let i = 0; i < userInput; i++) {
      let total = 27;
      let rollValue = 0;
      while (total != 0) {
        rollValue = Math.floor(Math.random() * 6) + 1;
        let remainder = total % rollValue;
        total = total - remainder;
        this.stats[total]++;
        this.totalRolls++;
      }
    }
  }

  resetStats() {
    this.totalRolls = 0;
    for (let i = 0; i < 28; i++) {
      this.stats[i] = 0;
    }
  }

  displayStats() {
    document.getElementById("totalRolls").innerHTML = this.totalRolls;
    document.getElementById("totalGames").innerHTML = this.stats[0];
  }
}

let simulator = new ProbabilitySimulator();

function simulate() {
  let userInput = Number(document.getElementById("userInput").value);
  simulator.simulate(userInput);
  //simulator.displayStats();
  updateChart(simulator.stats);

}

function reset() {
  simulator.resetStats();
  //simulator.displayStats();
  updateChart(simulator.stats);

}

function updateChart(data) {
  // set the dimensions of the chart
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // select the SVG element
  const svg = d3.select("svg");

  // remove any existing chart elements
  svg.selectAll("*").remove();

  // create the chart container
  const chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create the X and Y scales
  const x = d3.scaleBand()
    .domain(data.map((d, i) => i))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

  // create the X and Y axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  // add the X and Y axes to the chart
  chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  chart.append("g")
    .call(yAxis);

  // create the bars
  chart.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d));
}